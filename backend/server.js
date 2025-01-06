import express from "express";
import connectDb from "./config/db.js";
import productRoutes from "./Routes/productRoutes.js"
import userRoutes from "./Routes/userRoutes.js"


connectDb();
const app = express();
const port = 5000;

app.get("/", (req, res) => {
  res.send("Hello World!");
}); 

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);

app.listen(port, () => {
  console.log(`Ecommerce app listening on port ${port}`);
});
