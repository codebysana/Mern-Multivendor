const express = require("express");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/errorHandler");
const router = express.Router();
const Conversation = require("../models/conversationModel");

// create a new conversation
router.post(
  "/create-new-conversation",
  catchAsyncErrors(async (req, resizeBy, next) => {
    try {
      const { groupTitle, userId, sellerId } = req.body;
      const isConversationExists = await Conversation.findOne({ groupTitle });
      if (isConversationExists) {
        const conversation = isConversationExists;
        res.status(201).json({
          success: true,
          conversation,
        });
      } else {
        const conversation = await Conversation.create({
          members: [userId, sellerId],
          groupTitle: groupTitle,
        });
        res.status(201).json({
          success: true,
          conversation,
        });
      }
    } catch (error) {
      return next(new ErrorHandler(error.response.message, 500));
    }
  })
);

// get seller conversation
router.get(
  "/get-all-seller-conversation/:id",
  isSellerAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const conversations = await Conversation.find({
        members: {
          $in: [req.params.id],
        },
      }).sort({ updatedAt: -1, createdAt: -1 });

      res.status(201).json({
        success: true,
        conversations,
      });
    } catch (error) {
      return next(new ErrorHandler(error.response.message, 500));
    }
  })
);

module.exports = router;
