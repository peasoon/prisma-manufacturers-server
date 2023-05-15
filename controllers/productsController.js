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
        // create the new Post for this User
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

module.exports = {
  createProduct,
};
