# YouthNet

YouthNet is a backend application built using Node.js and Express, designed to provide server-side functionalities with integrations for cloud storage, authentication, database management, and serverless deployment.

## 🚀 Features
- REST API built with **Express.js**
- **JWT authentication** for secure user access
- **MySQL database** integration with **Sequelize ORM**
- **Cloud storage support** (Azure & Firebase)
- **PDF generation** using `pdf-lib`
- **QR code generation** with `qrcode`
- **Serverless deployment** using `serverless`

## 📂 Project Structure
```sh
.
├── server.js      # Main entry point
├── config/        # Configuration files (e.g., database, cloud storage)
├── routes/        # API route handlers
├── controllers/   # Business logic for APIs
├── models/        # Sequelize models
├── middlewares/   # Authentication & validation middleware
└── utils/         # Utility functions (e.g., PDF, QR code generation)
```

## 🛠️ Tech Stack
- **Backend**: Node.js, Express.js
- **Database**: MySQL with Sequelize ORM
- **Authentication**: JWT
- **Cloud Services**: Azure Storage, Firebase Functions
- **Deployment**: Serverless Framework
- **Validation**: Joi
- **Other Libraries**: Axios, PDF-lib, QRCode, Canvas

## 📦 Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/YOUR_GITHUB_USERNAME/youthnet.git
   cd youthnet
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Configure environment variables:
   Create a `.env` file and add your configuration keys (e.g., database, cloud storage, JWT secrets).

## 🚀 Usage
- **Start Development Server:**
  ```sh
  npm run dev
  ```
- **Start Production Server:**
  ```sh
  npm start
  ```
- **Deploy to Serverless Platform:**
  ```sh
  npm run deploy
  ```

## 📜 API Documentation
### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Other Features
- `GET /api/users` - Fetch all users
- `POST /api/generate-pdf` - Generate PDF
- `POST /api/generate-qrcode` - Generate QR Code

## 📌 Dependencies
```json
{
  "@azure/storage-blob": "^12.16.0",
  "@google-cloud/functions-framework": "^3.3.0",
  "axios": "^1.4.0",
  "canvas": "^2.11.2",
  "dotenv": "^16.3.1",
  "express": "^4.18.2",
  "firebase-functions": "^4.4.1",
  "joi": "^17.9.2",
  "jsonwebtoken": "^9.0.1",
  "mysql2": "^3.4.1",
  "pdf-lib": "^1.17.1",
  "qrcode": "^1.5.3",
  "sequelize": "^6.32.1",
  "serverless": "^3.33.0",
  "serverless-http": "^3.2.0"
}
```

## 📜 License
This project is licensed under the **ISC License**.

