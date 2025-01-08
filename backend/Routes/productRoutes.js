import express from "express";
import {
  createProducts,
  getProductById,
  getProducts,
} from "../controllers/poductControllers.js";
import { protect } from "../middlewares/authMiddlewares.js";

const router = express.Router();
router.route("/").get(protect,getProducts).post(protect,createProducts);
router.route("/:id").get(protect,getProductById)

export default router;
