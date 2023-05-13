const bcrypt = require("bcrypt");
const { prisma } = require("../prisma/prisma-client");
var jwt = require('jsonwebtoken');

const getAllUsers = async (req, res) => {
  const users = await prisma.user.findMany();
  if (users.length) {
    return res.json(users);
  } else res.send("nothing");
};

const getSingleUser = async (req, res) => {
  const id = req.params.id;
  const user = await prisma.user.findUnique({
    where: {
      id: Number(id),
    },
  });
  if (user) {
    return res.json(user);
  } else res.send("nothing");
};

const registerUser = async (req, res) => {
  console.log(req.body);
  const email = req.body.email;
  const name = req.body.name;
  const password = req.body.password;

  if (email && name && password) {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const user = await prisma.user.create({
        data: { email, name, password: hashedPassword },
      });
      const token = jwt.sign({id:user.id,email:user.email},process.env.JWTSECRET,{ expiresIn: '1h' })
      console.log(token)
      return res.status(201).json({id:user.id,email:user.email,name,token:token});
    } catch (err) {
      console.log(err.message);
      return res.status(400).json({ message: "Ошибка" });
    }
  } else {
    return res.status(400).json({ message: "Заполните обязательные поля" });
  }
};

module.exports = {
  getAllUsers,
  getSingleUser,
  registerUser,
};
