import jwt from "jsonwebtoken";

const generateToken = (res, userId) => {
  let token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
    expiresIn: "1d",
  });
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: false,
    sameSite: "strict", //prevent csrf attack
    maxage: 60 * 60 * 1000, //1 day in millisecond
  });
};

export default generateToken;
