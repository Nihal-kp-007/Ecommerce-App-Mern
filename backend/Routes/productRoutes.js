import express from "express";
import {
  createProducts,
  getProducts,
} from "../controllers/poductControllers.js";

const router = express.Router();
router.route("/").get(getProducts).post(createProducts);

export default router;
