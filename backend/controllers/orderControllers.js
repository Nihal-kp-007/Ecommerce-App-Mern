import asyncHandler from "../middlewares/asyncHandler.js";
import Order from "../models/orderModel.js";

// @desc create new order
// @route POST /api/orders
// @access Private
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    cartItems,
    shipping,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;
  if (cartItems && cartItems.length === 0) {
    res.status(400);
    throw new Error("No Order Items");
  } else {
    const order = new Order({
      orderItems: cartItems.map((x) => ({
        ...x,
        product: x._id,
        _id: undefined,
      })),
      user: req.user._id,
      shipping,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });
    const createOrder = await order.save();
    res.status(200).json(createOrder);
  }
});
// @desc get logged in users orders
// @route GET /api/orders/myorders
// @access Private
const getMyOrder = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.json(orders);
});
// @desc get order by ID
// @route GET /api/orders/:id
// @access Private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );
  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  } else {
    res.json(order);
  }
});
// @desc update to paid
// @route PUT /api/orders/:id
// @access Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  res.send("updateOrderToPaid ");
});
// @desc update order to delivered
// @route PUT /api/orders/:id/deliver
// @access Private/admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  res.send("updateOrderToDelivered ");
});
// @desc get all orders
// @route GET /api/orders
// @access Private/admin
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find().populate("user", "name email");
  res.json(orders);
});

export {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrder,
  getOrders,
};
