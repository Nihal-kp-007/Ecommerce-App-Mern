import express from "express";
import connectDb from "./config/db.js";
import productRoutes from "./Routes/productRoutes.js"
import userRoutes from "./Routes/userRoutes.js"
import { errorHandler, notFound } from "./middlewares/errorHandler.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

dotenv.config();

connectDb();
const app = express();

app.use(express.json()); //middleware
app.use(cookieParser()); //middleware

const port = process.env.PORT;

app.get("/", (req, res) => {
  res.send("Ecommerce App");
}); 

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Ecommerce app listening on port ${port}`);
});
