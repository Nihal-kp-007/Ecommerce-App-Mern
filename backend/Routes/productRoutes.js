import express from "express";
import {
  createProducts,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
} from "../controllers/poductControllers.js";
import { admin, protect } from "../middlewares/authMiddlewares.js";
import { productReview } from "../controllers/reviewControllers.js";

const router = express.Router();
router.route("/").get(getProducts).post(protect, admin, createProducts);
router.route("/:id").get(getProductById).put(protect, admin, updateProduct).delete(protect,admin,deleteProduct)
router.route("/:id/review").put(protect,productReview)

export default router;
