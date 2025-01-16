import asyncHandler from "../middlewares/asyncHandler.js";
import Product from "../models/productModel.js";

const productReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;
  const product = await Product.findById(req.params.id);

  const alreadyReviewed = product.reviews.find((review) =>
    review.user.toString() === req.user._id.toString()
  );
  if (alreadyReviewed) {
    res.status(400);
    throw new Error("You have already reviewed this product.");
  }else{
    const review = {
        name: req.user.name,
        user: req.user._id,
        rating: Number(rating),
        comment,
      };
      product.reviews.push(review);
      product.numReviews = product.reviews.length;
      product.rating =
        product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        product.reviews.length;
    
      const updateReview = await product.save();
    
      res.status(201).json(updateReview);
  }
  
});

export { productReview };
