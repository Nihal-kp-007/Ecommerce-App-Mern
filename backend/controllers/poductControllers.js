import asyncHandler from "../middlewares/asyncHandler.js";
import Product from "../models/productModel.js";

const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

const createProducts = asyncHandler(async (req, res) => {
  const product = new Product({
    name: "Sample Name",
    price: 0,
    user: req.user._id,
    image: "/uploads/sample.jpg",
    brand: "sample Brand",
    category: "sample Category",
    countInStock: 0,
    numReviews: 0,
    description: "Sample Description",
    rating: 0,
  });
  const createProduct = await product.save();
  res.status(201).json(createProduct);
});

const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    user,
    image,
    brand,
    category,
    countInStock,
    numReviews,
    description,
    rating,
  } = req.body;
  const product = await Product.findById(req.params.id);
  if (product) {
    product.name = name || product.name;
    product.user = req.user._id;
    product.price = price || product.price;
    product.image = image || product.image;
    product.brand = brand || product.brand;
    product.category = category || product.category;
    product.countInStock = countInStock || product.countInStock;
    product.numReviews = numReviews || product.numReviews;
    product.description = description || product.description;
    product.rating = rating || product.rating;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

export { getProducts, createProducts, getProductById, updateProduct };
