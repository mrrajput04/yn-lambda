const jwt = require("jsonwebtoken");
const {
  JWT_TOKEN_SECRET,
  Azure_ContainerName,
  Azure_AccountName,
  Azure_AccountKey,
} = require("../config/env.config");
const {
  Certificate,
  CourseAssessment,
  courseEnrolled,
  User,
  Courses,
  Course_language,
} = require("../utils/db");
const { Op } = require("sequelize");
const { sequelize } = require("../models");

const QRCode = require("qrcode");
const { BlobServiceClient } = require("@azure/storage-blob");
const { PDFDocument, rgb, decodeFromBase64DataUri } = require("pdf-lib");
const fs = require("fs");

exports.certificateController = {
  async checkCertificate(req, res) {
    try {
      if (!req.headers.authorization)
        return res
          .status(500)
          .json({ status: false, message: "auth token required" });
      let token = req.headers.authorization.replace("Bearer ", "");
      let decoded = jwt.verify(token, JWT_TOKEN_SECRET);

      let enrollmentNo = req.body.enrollment_no;
      let courseId = req.body.course_id;

      let certificate = await Certificate.findOne({
        where: { user_id: enrollmentNo, course_id: courseId },
        attributes: ["cert_link", "date_created"],
      });

      if (certificate)
        return res.status(200).json({ status: true, certificate });
      else
        return res
          .status(404)
          .json({ status: true, message: "Certificate is not generated yet" });
    } catch (error) {
      return res.status(500).json({ status: false, message: error.message });
    }
  },

  async createCertificate(req, res) {
    try {
      if (!req.headers.authorization)
        return res
          .status(500)
          .json({ status: false, message: "auth token required" });
      let token = req.headers.authorization.replace("Bearer ", "");
      jwt.verify(token, JWT_TOKEN_SECRET);

      let enrollmentNo = req.body.enrollment_no;
      let courseId = req.body.course_id;
      let bs_id = req.body.bs_id;

      let certificate = await Certificate.findOne({
        where: {
          user_id: enrollmentNo,
          course_id: courseId,
          bs_id,
          portal: "New",
        },
        attributes: ["cert_link", "date_created"],
      });

      if (certificate) {
        return res
          .status(403)
          .json({ status: false, message: "Certificate already exists" });
      }

      let Course_Assessment = await CourseAssessment.findOne({
        where: { course_enrollment_id: bs_id, user_id: enrollmentNo },
        attributes: ["percentage", "paper_id"],
        order: [["paper_id", "DESC"]],
      });

      if (Course_Assessment.percentage >= 40) {
        let preExam = await Course_language.findOne({
          where: {
            [Op.or]: [
              { preexam1_id: Course_Assessment.paper_id },
              { preexam2_id: Course_Assessment.paper_id },
              { preexam3_id: Course_Assessment.paper_id },
            ],
          },
          attributes: ["id"],
        });

        if (!preExam) {
          let user = await User.findOne({
            where: { id: enrollmentNo },
            attributes: ["first_name", "last_name"],
          });

          let course = await Courses.findOne({
            where: { course_id: courseId },
            attributes: ["course_name"],
          });

          let courseEnroll = await courseEnrolled.findOne({
            where: { id: bs_id, course_id: courseId, user_id: enrollmentNo },
            attributes: ["course_month", "course_year"],
          });

          let maxSerial = await Certificate.findOne({
            attributes: [
              [sequelize.fn("MAX", sequelize.col("serial_no")), "serial_no"],
            ],
          });

          let serial_no = (maxSerial.serial_no || 0) + 1;
          let cert_no = serial_no.toString().padStart(7, "0");

          let certificateData = {
            serial_no: serial_no,
            cert_no: cert_no,
            user_id: enrollmentNo,
            user_name: user.first_name + " " + user.last_name,
            bs_id: bs_id,
            cert_type: "Completion",
            course_id: courseId,
            course_name: course.course_name,
            course_month: `${courseEnroll.course_month}, ${courseEnroll.course_year}`,
            cert_link: "",
            status: "PENDING",
            date_created: new Date(),
            date_updated: new Date(),
            portal: "New",
            is_deleted: false,
          };
          let cert = await Certificate.create(certificateData);

          const certNo = cert.cert_no || "0018320";
          const qr_url = `https://staging.prathamyouthnet.org/certificate/verify.php?cert_no=${certNo}`;

          QRCode.toDataURL(
            qr_url,
            { errorCorrectionLevel: "H" },
            async (err, qrDataURL) => {
              if (err) {
                console.error("Error generating QR code:", err);
                res
                  .status(500)
                  .json({ status: false, message: "Internal Server Error" });
                return;
              }

              const pdfDoc = await PDFDocument.create();
              const page = pdfDoc.addPage([1755, 1241]);
              const { width, height } = page.getSize();

              const imageBg = fs.readFileSync("bg.jpg");
              const bgImage = await pdfDoc.embedJpg(imageBg);

              // const qrCodeFilePath = "qr_code.png";
              // fs.writeFile(
              //   qrCodeFilePath,
              //   qrDataURL.split(",")[1],
              //   "base64",
              //   (err) => {
              //     if (err) console.log(err);
              //     else {
              //       console.log("File written successfully\n");
              //     }
              //   }
              // );

              const qrImageScale = 1;
              const qrImageBytes = Buffer.from(
                qrDataURL.split(",")[1],
                "base64"
              );
              const qrImage = await pdfDoc.embedPng(qrImageBytes);

              page.drawImage(bgImage, {
                x: 0,
                y: 0,
                width: width,
                height: height,
              });

              page.drawImage(qrImage, {
                x: 130.39,
                y: height - 1100,
                width: qrImage.width * qrImageScale,
                height: qrImage.height * qrImageScale,
              });

              const user_name = cert.user_name;
              const line1 = `has participated in the Online Course under the YouthNet Program in September 2023.`;
              const line2 = `We wish them all the very best in their future endeavors.`;

              page.drawText(user_name, {
                x: 150.39,
                y: height - 498.02,
                size: 33,
                color: rgb(0, 0, 0),
              });
              page.drawText(line1, {
                x: 150.39,
                y: height - 628.02,
                size: 21,
                color: rgb(0, 0, 0),
              });
              page.drawText(line2, {
                x: 150.39,
                y: height - 680.02,
                size: 21,
                color: rgb(0, 0, 0),
              });

              const pdfBytes = await pdfDoc.save();

              // async function savePdfToLocal(pdfBytes, outputPath) {
              //   try {
              //     await fs.promises.writeFile(outputPath, pdfBytes);
              //     console.log(`PDF saved to ${outputPath}`);
              //   } catch (error) {
              //     console.error("Error saving PDF:", error);
              //   }
              // }
              // const outputPath = "output.pdf";
              // savePdfToLocal(pdfBytes, outputPath);

              const blobServiceClient = BlobServiceClient.fromConnectionString(
                `DefaultEndpointsProtocol=https;AccountName=${Azure_AccountName};AccountKey=${Azure_AccountKey};EndpointSuffix=core.windows.net`
              );

              const containerName = Azure_ContainerName;
              const blobName = `${cert_no}.pdf`;

              const containerClient =
                blobServiceClient.getContainerClient(containerName);
              const blockBlobClient =
                containerClient.getBlockBlobClient(blobName);

              try {
                await blockBlobClient.upload(pdfBytes, pdfBytes.length);
                const blobUrl = blockBlobClient.url;

                cert.cert_link = blobUrl;
                await cert.save();

                return res.status(200).json({
                  status: true,
                  cert_url: cert.cert_link,
                  date_generated: cert.date_created,
                });
              } catch (err) {
                console.error(
                  "Error uploading PDF to Azure Blob Storage:",
                  err
                );
                res
                  .status(500)
                  .json({ status: false, message: "Internal Server Error" });
              }
            }
          );
        } else {
          return res
            .status(200)
            .json({ status: true, message: "this is pre-assessment paper" });
        }
      } else {
        return res.status(200).json({
          status: true,
          message: "User is not eligible for a certificate",
        });
      }
    } catch (error) {
      return res.status(500).json({ status: false, message: error.message });
    }
  },
};
