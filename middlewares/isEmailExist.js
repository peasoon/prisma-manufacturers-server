const { prisma } = require("../prisma/prisma-client");

const isEmailExist = async (req, res, next) => {
  const email = req.body.email;
  if (email) {
    const isExist = await prisma.user.findFirst({
      where: {
        email,
      },
    });
    if(isExist) return res.status(400).json({message:'Пользователь c данным email уже существует'})
  }
  next();
};

module.exports = isEmailExist;
