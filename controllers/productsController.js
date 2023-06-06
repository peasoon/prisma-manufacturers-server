const { prisma } = require("../prisma/prisma-client");

const createProduct = async (req, res) => {
  const { id, title } = req.body;
  if (!id || !title) {
    res.status(400).json({ message: "Заполнены не все поля" });
  } else {
    // const product = await prisma.user.update({
    //   where: {
    //     id: id,
    //   },
    //   data: {
    //     products: {
    //       create: { title },
    //     },
    //   },
    // });

    const createdProduct = await prisma.product.create({
      data: {
        title: title,
        manufacturer: {
          connect: {
            id: id,
          },
        },
      },
    });

    res.status(201).json(createdProduct);
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany();
    return res.status(200).json(products);
  } catch (err) {
    return res.status(500).json({ message: "Ошибка базы данных" });
  }
};

const getUserProducts = async (req, res, next) => {
  const { user: userId } = req.query;
  if (userId) {
    const userProducts = await prisma.user.findUnique({
      where: {
        id: Number(userId),
      },
      include: { products: true },
    });
    return res
      .status(200)
      .json(
        userProducts ? userProducts : { message: "Пользователь не найден" }
      );
  } else {
    next();
  }
};

const getSingleProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await prisma.product.findUnique({
      where: {
        id:Number(id),
      },
    });
    if (product) {
      return res.status(200).json(product);
    } else {
      return res.status(404).json({ message: "Not found" });
    }
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: "Error" });
  }
};

module.exports = {
  createProduct,
  getUserProducts,
  getAllProducts,
  getSingleProduct,
};
