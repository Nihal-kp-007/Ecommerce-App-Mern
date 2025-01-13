import express from "express";
import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrder,
  getOrders,
} from "../controllers/orderControllers.js";
import { protect, admin } from "../middlewares/authMiddlewares.js";

const router = express.Router();

router.route("/").post(protect, addOrderItems).get(protect, admin, getOrders);
router.route("/myorders").get(protect, getMyOrder);
router.route("/:id").get(protect, getOrderById);
router.route("/:id/pay").put(protect, updateOrderToPaid); 
router.route("/:id/deliver").put(protect, admin, updateOrderToDelivered);

export default router;
