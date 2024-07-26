const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    categories: { type: [String], required: true },
    imageUrl: {
      type: String,
      required: true,
      default: "https://via.placeholder.com/150",
    },
    stock: { type: Number, required: true },
  },
  { timestamps: true }
);

const ProductModel = mongoose.model("Product", ProductSchema);
module.exports = ProductModel;
