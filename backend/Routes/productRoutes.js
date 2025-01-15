import express from "express";
import {
  createProducts,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
} from "../controllers/poductControllers.js";
import { admin, protect } from "../middlewares/authMiddlewares.js";

const router = express.Router();
router.route("/").get(getProducts).post(protect, admin, createProducts);
router.route("/:id").get(getProductById).put(protect, admin, updateProduct).delete(protect,admin,deleteProduct)

export default router;
