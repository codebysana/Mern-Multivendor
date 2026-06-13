const express = require("express");
const router = express.Router();
const Product = require("../models/productModel");
const Order = require("../models/orderModel");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/errorHandler");
const Shop = require("../models/shopModel");
const cloudinary = require("cloudinary");
const { upload } = require("../multer");
const fs = require("fs");
const {
  isAuthenticated,
  isAdmin,
  isSellerAuthenticated,
} = require("../middleware/auth.js");

// create product
router.post(
  "/create-product",
  upload.array("images"),
  catchAsyncErrors(async (req, res, next) => {
    console.log("Incoming product data:", req.body);

    try {
      const {
        name,
        description,
        category,
        tags,
        originalPrice,
        discountPrice,
        stock,
        shopId,
      } = req.body;

      // collect images from multipart files and/or request body
      let imagesFromBody = [];
      if (req.body.images) {
        try {
          imagesFromBody = typeof req.body.images === "string" ? JSON.parse(req.body.images) : req.body.images;
        } catch (e) {
          imagesFromBody = req.body.images;
        }
      }

      const files = req.files || [];

      const shop = await Shop.findById(shopId);
      if (!shop) {
        return next(new ErrorHandler("Invalid Shop Id!", 400));
      }

      // Normalize and ensure images have { public_id, url }
      const imagesLinks = [];

      // First, handle files uploaded via multipart/form-data
      if (files && files.length) {
        for (const file of files) {
          try {
            const result = await cloudinary.uploader.upload(file.path, { folder: "products" });
            imagesLinks.push({ public_id: result.public_id, url: result.secure_url });
          } catch (uploadErr) {
            console.error("Cloudinary upload failed for file:", uploadErr.message || uploadErr);
          } finally {
            // remove temp file
            try {
              fs.unlinkSync(file.path);
            } catch (e) {
              // ignore
            }
          }
        }
      }

      // Next, handle images coming in the request body
      if (imagesFromBody && Array.isArray(imagesFromBody)) {
        for (const img of imagesFromBody) {
          try {
            if (!img) continue;
            // If already in correct format
            if (typeof img === "object" && img.public_id && img.url) {
              imagesLinks.push({ public_id: img.public_id, url: img.url });
              continue;
            }

            // If string (could be base64 or remote url), upload to cloudinary
            if (typeof img === "string") {
              const result = await cloudinary.uploader.upload(img, {
                folder: "products",
              });
              imagesLinks.push({ public_id: result.public_id, url: result.secure_url });
              continue;
            }

            // If img looks like an uploaded file descriptor (e.g., contains data or path), attempt upload
            if (typeof img === "object") {
              // try common properties
              const possible = img.data || img.path || img.buffer || img.file || img.uri;
              if (possible) {
                const result = await cloudinary.uploader.upload(possible, { folder: "products" });
                imagesLinks.push({ public_id: result.public_id, url: result.secure_url });
                continue;
              }
            }

            // otherwise skip invalid entry
            console.warn("Skipping invalid image entry for product:", img);
          } catch (uploadErr) {
            console.error("Cloudinary upload failed for image:", uploadErr.message || uploadErr);
            // continue processing other images
          }
        }
      }

      const productData = {
        name,
        description,
        category,
        tags,
        originalPrice,
        discountPrice,
        stock,
        images: imagesLinks,
        shop,
        shopId,
      };

      const product = await Product.create(productData);
      console.log("Saved product:", product);
      res.status(201).json({
        success: true,
        product,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// get all products of a shop
router.get(
  "/get-all-products-shop/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      console.log("GET all-products-shop for shopId:", req.params.id);
      const products = await Product.find({ shopId: req.params.id });
      console.log("Products found for shopId", req.params.id, ":", products.length);
      res.status(200).json({
        success: true,
        products,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// delete product of a shop
router.delete(
  "/delete-shop-products/:id",
  isSellerAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const productId = req.params.id;
      const product = await Product.findById(productId);

      if (!product) {
        return res
          .status(404)
          .json({ success: false, message: "Product not found" });
      }

      for (const image of product.images) {
        await cloudinary.uploader.destroy(image.public_id);
      }

      await Product.deleteOne({ _id: req.params.id });

      res.status(200).json({
        success: true,
        message: "Product deleted successfully",
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// get a product by id
router.get(
  "/get-product/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const product = await Product.findById(req.params.id);
      if (!product) {
        return next(new ErrorHandler("Product not found", 404));
      }

      res.status(200).json({
        success: true,
        product,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// get all products
router.get(
  "/get-all-products",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const products = await Product.find().sort({ createdAt: -1 });
      console.log("Products found:", products);

      res.status(200).json({
        success: true,
        products,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// review of a product
router.put(
  "/create-new-review",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { user, rating, comment, productId, orderId } = req.body;
      const product = await Product.findById(productId);
      const review = {
        user,
        rating,
        comment,
        productId,
      };
      const isReviewed = product.reviews.find(
        (rev) => rev.user._id === req.user._id
      );
      if (isReviewed) {
        product.reviews.forEach((rev) => {
          if (rev.user._id === req.user._id) {
            (rev.rating = rating), (rev.comment = comment), (rev.user = user);
          }
        });
      } else {
        product.reviews.push(review);
      }

      let avg = 0;
      product.reviews.forEach((rev) => {
        avg += rev.rating;
      });
      product.ratings = avg / product.reviews.length;

      await product.save({ validateBeforeSave: false });

      await Order.findByIdAndUpdate(
        orderId,
        {
          $set: { "cart.$[elem].isReviewed": true },
        },
        { arrayFilters: [{ "elem._id": productId }], new: true }
      );
      res.status(200).json({
        success: true,
        message: "Reviewed Successfully",
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// all products -- admin
router.get(
  "/admin-all-products",
  isAuthenticated,
  isAdmin("admin"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const products = await Product.find().sort({
        createdAt: -1,
      });
      res.status(200).json({
        success: true,
        products,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = router;
