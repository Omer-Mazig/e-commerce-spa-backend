const Product = require("../models/Product");

// Get all products
async function getProducts(req, res) {
  const { query } = req;
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (err) {
    console.log(
      "product.controller, getProducts. Error while getting products",
      err
    );
    res.status(500).json({ message: "Server error while getting products" });
  }
}

// Get a single product
async function getProductById(req, res) {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (err) {
    if (err.name === "CastError") {
      console.log(
        `product.controller, getProductById. CastError! product not found with id: ${id}`
      );
      return res.status(404).json({ message: "product not found" });
    }
    console.log(
      `product.controller, getProductById. Error while getting product with id: ${id}`,
      err
    );
    res.status(500).json({ message: "Server error while getting product" });
  }
}

module.exports = {
  getProducts,
  getProductById,
};
