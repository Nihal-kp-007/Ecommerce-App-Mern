import express from "express";
import connectDb from "./config/db.js";
import productRoutes from "./Routes/productRoutes.js"
import userRoutes from "./Routes/userRoutes.js"
import { errorHandler, notFound } from "./middlewares/errorHandler.js";


connectDb();
const app = express();

app.use(express.json()); //middleware

const port = 5000;

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
