import express from "express";
import {
  authUser,
  deleteUser,
  getAllUsers,
  getUser,
  logout,
  registerUser,
  updateUser,
  updateUserProfile,
} from "../controllers/userControllers.js";
import { admin, protect } from "../middlewares/authMiddlewares.js";

const router = express.Router();
router.route("/").post(registerUser).get(protect, admin, getAllUsers);
router.route("/auth").post(authUser);
router.route("/profile").put(protect, updateUserProfile);
router.route("/logout").post(logout);
router.route("/:id").put(protect, admin, updateUser).get(protect,admin,getUser).delete(protect,admin,deleteUser)

export default router;
