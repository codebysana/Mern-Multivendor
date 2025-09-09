const express = require("express");
const router = express.Router();
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const {
  isAuthenticated,
  isSellerAuthenticated,
  isAdmin,
} = require("../middleware/auth");
const Order = require("../models/orderModel");
const Product = require("../models/productModel");

// create a order
router.post(
  "/create-order",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { cart, shippingAddress, user, totalPrice, paymentInfo } = req.body;
      // group cart items by shopId
      const shopItemMap = new Map();
      for (const item of cart) {
        const shopId = item.shopId;
        if (!shopItemMap.has(shopId)) {
          shopItemMap.set(shopId, []);
        }
        shopItemMap.get(shopId).push(item);
      }
      // create an order for each shop
      const orders = [];
      for (const [shopId, items] of shopItemMap) {
        const order = await Order.create({
          cart: items,
          shippingAddress,
          user,
          totalPrice,
          paymentInfo,
        });
        orders.push(order);
      }
      res.status(201).json({
        success: true,
        orders,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);

// get all orders of user
router.get(
  "/get-all-orders/:userId",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const orders = await Order.find({ "user._id": req.params.userId }).sort({
        createdAt: -1,
      });
      res.status(200).json({
        success: true,
        orders,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// get all orders of seller
router.get(
  "/get-seller-all-orders/:shopId",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const orders = await Order.find({
        "cart.shopId": req.params.shopId,
      }).sort({
        createdAt: -1,
      });
      res.status(200).json({ success: true, orders });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// user update order status -- seller
router.put(
  "/update-order-status/:id",
  isSellerAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const order = await Order.findById(req.params.id);
      if (!order) {
        return next(new ErrorHandler("Order not found with this id", 400));
      }
      if (req.body.status === "Transferred to delivery partner") {
        order.cart.forEach(async (e) => {
          await updateOrder(e._id, e.qty);
        });
      }

      order.status = req.body.status;
      if (req.body.status === "Delivered") {
        order.deliveredAt = Date.now();
        order.paymentInfo.status = "Succeeded";
      }
      await order.save({ validateBeforeSave: false });
      res.status(200).json({
        success: true,
        order,
      });
      async function updateOrder(id, qty) {
        const product = await Product.findById(id);
        product.stock -= qty;
        product.soldOut += qty;

        await product.save({ validateBeforeSave: false });
      }
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// give a refund -- user
router.put(
  "/order-refund/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const order = await Order.findById(req.params.id);
      if (!order) {
        return next(new ErrorHandler("Order not found with this id", 400));
      }

      order.status = req.body.status;

      await order.save({ validateBeforeSave: false });

      res.status(200).json({
        success: true,
        order,
        message: "Order refund request successfully submitted!",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// accept the refund --- seller
router.put(
  "/order-refund-success/:id",
  isSellerAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const order = await Order.findById(req.params.id);
      if (!order) {
        return next(new ErrorHandler("Order not found with this id", 400));
      }
      order.status = req.body.status;

      await order.save();
      res.status().json({
        success: true,
        message: "Order refund successfully!",
      });

      if (req.body.status === "Redund Success") {
        order.cart.forEach(async (e) => {
          await updateOrder(e._id, e.qty);
        });
      }

      async function updateOrder(id, qty) {
        const product = await Product.findById(id);

        product.stock += qty;
        product.soldOut -= qty;

        await product.save({ validateBeforeSave: false });
      }
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// all orders -- for admins
router.get(
  "/admin-all-orders",
  isAuthenticated,
  isAdmin("admin"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const orders = await Order.find().sort({
        deliveredAt: -1,
        createdAt: -1,
      });
      res.status(201).json({
        success: true,
        orders,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = router;
