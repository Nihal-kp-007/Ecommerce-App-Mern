import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

const protect = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = await User.findById(decoded.userId).select("-password");
        next();
      } catch (err) {
        res.status(401);
        throw new Error("Invalid token");
      }
    } else {
      res.status(401);
      throw new Error("Unauthorized");
    }
  } catch (err) {
    next(err);
  }
};

export { protect };
