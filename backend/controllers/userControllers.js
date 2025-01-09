import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import asyncHandler from "../middlewares/asyncHandler.js";

const registerUser = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body; //take the name,email,password from request body

  const userExists = await User.findOne({ email }); //checking is the user is already exists using findOne method
  if (userExists) {
    res.status(400);
    throw new Error("User Already Exists");
  }
  const salt = await bcrypt.genSalt(10);
  const encryptedPassowrd = await bcrypt.hash(password, salt);

  //if user is not exists then create a new user using create method
  const user = await User.create({
    name,
    email,
    password: encryptedPassowrd,
  });
  if (user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error("Invalid User data");
  }
});
const authUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    let token = jwt.sign({ userId: user._id },process.env.JWT_SECRET_KEY, { expiresIn: "1d" });
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict", //prevent csrf attack
      maxage: 60 * 60 * 1000, //1 day in millisecond
    });
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error("Invalid Email or Password");
  }
});

const logout = (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expiresIn: new Date(0),
  });
  res.status(200).json({ message: "Logged out successfully" });
};
const getUserProfile = () => {};

export { registerUser, authUser, logout, getUserProfile };
