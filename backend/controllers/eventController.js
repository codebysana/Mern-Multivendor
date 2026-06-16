const express = require("express");
const Event = require("../models/eventModel");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/errorHandler");
const Shop = require("../models/shopModel");
const {
  isSellerAuthenticated,
  isAdmin,
  isAuthenticated,
} = require("../middleware/auth");
const { upload } = require("../multer");
const fs = require("fs");
const router = express.Router();
const mongoose = require("mongoose");
const cloudinary = require("cloudinary");

// create event
// create event
router.post(
  "/create-event",
  isSellerAuthenticated,
  upload.array("images"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const shopId = req.seller._id;
      const shop = await Shop.findById(shopId);
      if (!shop) {
        return next(new ErrorHandler("Invalid Shop Id!", 400));
      }

      // collect images from multipart files and/or request body
      let imagesFromBody = [];
      if (req.body && req.body.images) {
        try {
          imagesFromBody = typeof req.body.images === "string" ? JSON.parse(req.body.images) : req.body.images;
        } catch (e) {
          imagesFromBody = req.body.images;
        }
      }

      const files = req.files || [];

      const imagesLinks = [];

      // handle files uploaded via multipart/form-data
      if (files && files.length) {
        for (const file of files) {
          try {
            const result = await cloudinary.uploader.upload(file.path, { folder: "products" });
            imagesLinks.push({ public_id: result.public_id, url: result.secure_url });
          } catch (uploadErr) {
            console.error("Cloudinary upload failed for file:", uploadErr.message || uploadErr);
          } finally {
            try {
              fs.unlinkSync(file.path);
            } catch (e) {
              // ignore
            }
          }
        }
      }

      // handle images sent in the request body (base64 strings, urls, or already-uploaded objects)
      if (imagesFromBody && Array.isArray(imagesFromBody)) {
        for (const img of imagesFromBody) {
          try {
            if (!img) continue;
            if (typeof img === "object" && img.public_id && img.url) {
              imagesLinks.push({ public_id: img.public_id, url: img.url });
              continue;
            }
            if (typeof img === "string") {
              const result = await cloudinary.uploader.upload(img, { folder: "products" });
              imagesLinks.push({ public_id: result.public_id, url: result.secure_url });
              continue;
            }
            // skip invalid entries
            console.warn("Skipping invalid image entry for event:", img);
          } catch (uploadErr) {
            console.error("Cloudinary upload failed for image:", uploadErr.message || uploadErr);
          }
        }
      }

      const eventData = {
        ...req.body,
        shopId: shop._id,
        shop: shop,
        images: imagesLinks,
      };

      const event = await Event.create(eventData);
      res.status(201).json({
        success: true,
        event,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// debug
router.get("/debug-events", async (req, res) => {
  const events = await Event.find({});
  console.log("TOTAL EVENTS:", events.length);
  console.log("SAMPLE EVENT:", events[0]);

  res.json({ events });
});

// get all events
router.get("/get-all-events", async (req, res, next) => {
  try {
    const events = await Event.find();
    console.log("ALL EVENTS:", events);
    res.status(200).json({
      success: true,
      events,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// get all events of a shop
router.get(
  "/get-all-events/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const events = await Event.find({ shopId: req.params.id });
      console.log("SHOP EVENTS:", events);
      res.status(200).json({
        success: true,
        events,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// delete event of a shop
router.delete(
  "/delete-shop-event/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const eventId = req.params.id;
      // Validate ID
      if (!eventId || !mongoose.Types.ObjectId.isValid(eventId)) {
        return next(new ErrorHandler("Invalid or missing event ID", 404));
      }

      const eventData = await Event.findById(eventId);
      if (!eventData) {
        return next(new ErrorHandler("Event not found", 404));
      }

      // delete images safely
      for (const img of eventData.images) {
        try {
          await cloudinary.uploader.destroy(img.public_id);
        } catch (err) {
          console.warn(" Failed to delete image:", img.public_id);
        }
      }

      const event = await Event.findByIdAndDelete(eventId);

      if (!event) {
        return next(new ErrorHandler("Event not found with this id", 500));
      }

      res.status(200).json({
        success: true,
        message: "Event deleted successfully",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// all events -- admin
router.get(
  "/admin-all-events",
  isAuthenticated,
  isAdmin("admin"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const events = await Event.find().sort({
        createdAt: -1,
      });
      res.status(200).json({
        success: true,
        events,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = router;
