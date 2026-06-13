const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const Shop = require("../models/shopModel");

const isAuthenticated = catchAsyncErrors(async (req, res, next) => {
  // accept token from cookie or Authorization header
  let token = null;
  if (req.cookies && req.cookies.token) token = req.cookies.token;
  if (!token && req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return next(new ErrorHandler("Please login to continue", 401));
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  req.user = await User.findById(decoded.id);
  next();
});

const isSellerAuthenticated = catchAsyncErrors(async (req, res, next) => {
  // accept seller token from cookie or Authorization header
  let token = null;
  if (req.cookies && req.cookies.seller_token) token = req.cookies.seller_token;
  if (!token && req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token && req.body && req.body.token) token = req.body.token;
  if (!token) {
    return next(new ErrorHandler("Please login to continue", 401));
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  req.seller = await Shop.findById(decoded.id);
  next();
});

const isAdmin = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(`${req.user.role} can't access this resources`)
      );
    }
    next();
  };
};

module.exports = { isAuthenticated, isSellerAuthenticated, isAdmin };
