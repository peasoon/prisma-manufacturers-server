const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

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
    return res.status(201).json({ email, name, password });
  } else {
    return res.status(400).json({ message: "Заполните обязательные поля" });
  }
};

module.exports = {
  getAllUsers,
  getSingleUser,
  registerUser,
};
