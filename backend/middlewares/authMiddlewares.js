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
        throw new Error("Not Authorised, token failed");
      }
    } else {
      res.status(401);
      throw new Error("Not Authorised, no token");
    }
  } catch (err) {
    next(err);
  }
};

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("Not Authorised as an admin");
  }
};

export { protect, admin };
