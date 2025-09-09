const express = require("express");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/errorHandler");
const Shop = require("../models/shopModel");
const { isSellerAuthenticated } = require("../middleware/auth");
const Coupon = require("../models/couponModel");
const router = express.Router();

// create coupon code
router.post(
  "/create-coupon-code",
  isSellerAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const isCouponExists = await Coupon.find({ name: req.body.name });
      if (isCouponExists) {
        return next(new ErrorHandler("Coupon code already exists!", 400));
      }
      const coupon = await Coupon.create(req.body);
      res.status(201).json({
        success: true,
        coupon,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// get all coupons code of a shop
router.get("/get-coupon/:id", async (req, res, next) => {
  try {
    const couponCode = await Coupon.find({ id: req.params.id });
    res.status(201).json({
      success: true,
      couponCode,
    });
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
});

// get coupon code value bu its name
router.get(
  "/get-coupon-value/:name",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const couponCode = await Coupon.findOne({ name: req.params.name });
      req.status(200).json({
        success: true,
        couponCode,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

module.exports = router;
