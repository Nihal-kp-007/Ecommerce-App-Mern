import express from "express";
import {
  authUser,
  logout,
  registerUser,
  updateUserProfile,
} from "../controllers/userControllers.js";
import { protect } from "../middlewares/authMiddlewares.js";

const router = express.Router();
router.route("/").post(registerUser);
router.route("/auth").post(authUser);
router.route("/profile").put(protect,updateUserProfile);
router.route("/logout").post(logout);

export default router;
