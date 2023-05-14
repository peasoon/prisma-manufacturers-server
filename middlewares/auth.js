const { prisma } = require("../prisma/prisma-client");
var jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  console.log(token);
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWTSECRET);
      req.body.id = decoded.id;
      next();
    } catch (err) {
      return res.status(401).json({ message: "Неудачная авторизация" });
    }
  } else {
    return res.status(401).json({ message: "Неудачная авторизация" });
  }
};

module.exports = auth;
