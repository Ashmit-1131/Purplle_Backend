const jwt = require("jsonwebtoken");
require("dotenv").config();

async function cartNorderValidator(req, res, next) {
  let token = req.headers.authorization;
  jwt.verify(token, process.env.SecretKey, async function (err, decoded) {
    if (err) {
      res.send({
        message: "Something went wrong: " + err,
        status: 0,
        error: true,
      });
    }

    if (decoded) {
      if (Array.isArray(req.body)) {
        req.body.forEach((el) => {
          el.user = decoded.userId;
          console.log(req.body);
        });
      } else {
        req.body.user = decoded.userId;
        console.log(req.body);
      }

      next();
    } else {
      res.send({
        message: "Invalid token, please login",
        status: 2,
        error: true,
      });
    }
  });
}

module.exports = {
  cartNorderValidator,
};