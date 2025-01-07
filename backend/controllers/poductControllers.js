import asyncHandler from "../middlewares/asyncHandler.js";
import Product from "../models/productModel.js";

const getProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

const createProducts = () => {};

const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

export { getProducts, createProducts, getProductById };
