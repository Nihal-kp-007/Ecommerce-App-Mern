import express from "express";
import {
  createProducts,
  getProductById,
  getProducts,
} from "../controllers/poductControllers.js";
import { protect } from "../middlewares/authMiddlewares.js";

const router = express.Router();
router.route("/").get(getProducts).post(createProducts);
router.route("/:id").get(getProductById)

export default router;
