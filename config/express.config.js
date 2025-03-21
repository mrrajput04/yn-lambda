const { PORT } = require("./env.config");

exports.listen = function () {
  console.log("Server is up and  running on ", PORT);
};

exports.logger = (req, res, next) => {
  console.log(`Requesting url ${req.url}`);
  return next();
};
