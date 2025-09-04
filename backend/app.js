const express = require("express");
const ErrorHandler = require("./middleware/catchAsyncErrors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const user = require("./controllers/userController");
const shop = require("./controllers/shopController");
const product = require("./controllers/productController");
const event = require("./controllers/eventController");
const coupon = require("./controllers/couponController");
const payment = require("./controllers/paymentController");
const order = require("./controllers/orderController");
const conversation = require("./controllers/conversationController");


const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000", // your frontend
    credentials: true,
  })
);
app.use("/", express.static("uploads"));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

// config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: "backend/config/.env",
  });
}

// import routes
app.use("/api/v2/user", user);
app.use("/api/v2/order", order);
app.use("/api/v2/shop", shop);
app.use("/api/v2/product", product);
app.use("/api/v2/event", event);
app.use("/api/v2/coupon", coupon);
app.use("/api/v2/payment", payment);
app.use("/api/v2/conversation", conversation);

app.get("/ping", (req, res) => res.send("pong"));

// it's for errorHandler
app.use(ErrorHandler);

module.exports = app;
