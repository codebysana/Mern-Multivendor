const express = require("express");
const path = require("path");
const { upload } = require("../multer");
const ErrorHandler = require("../utils/errorHandler");
const User = require("../models/userModel");
const router = express.Router();
const fs = require("fs");
const jwt = require("jsonwebtoken");
const sendMail = require("../utils/sendMail");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const { isAuthenticated } = require("../middleware/auth");

// router.post("/create-user", upload.single("file"), async (req, res, next) => {
//   try {
//     const { name, email, password } = req.body;
//     const userEmail = await User.findOne({ email });
//     if (userEmail) {
//       const filename = req.file.filename;
//       // const filePath = `uploads/${filename}`;
//       fs.unlink(filePath, (err) => {
//         if (err) {
//           console.log(err);
//           res.status(500).json({ message: "Error deleting file" });
//         }
//       });
//       // if (userEmail) {
//       //   // Delete uploaded file if user already exists
//       //   if (req.file) {
//       //     const filePath = path.join(
//       //       __dirname,
//       //       "..",
//       //       "uploads",
//       //       req.file.filename
//       //     );
//       //     fs.unlink(filePath, (err) => {
//       //       if (err) console.log("Failed to delete file:", err);
//       //     });
//       //   }
//       //   return next(new ErrorHandler("User already exists", 400));
//       // }
//       const fileUrl = `/uploads/${req.file.filename}`;

//       const user = new User({
//         name,
//         email,
//         password,
//         avatar: fileUrl,
//       });

//       const activationToken = createActivationToken(user);
//       const activationUrl = `http://localhost:3000/activation/${activationToken}`;

//       try {
//         await sendMail({
//           email: user.email,
//           subject: "Activate your account",
//           message: `Hello ${user.name}, please click on the link o activate your account: ${activationUrl}`,
//         });
//         res.status(201).json({
//           success: true,
//           message: `Please check your email:- ${user.email} to activate your account`,
//         });
//       } catch (mailError) {
//         return next(new ErrorHandler(mailError.message, 500));
//       }
//     }
//   } catch (error) {
//     return next(new ErrorHandler(error.message, 400));
//   }
// });

// create activation token

// create activation token

router.post("/create-user", upload.single("file"), async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const userEmail = await User.findOne({ email });

    if (userEmail) {
      // Delete uploaded file if user already exists
      if (req.file) {
        const filePath = path.join(
          __dirname,
          "..",
          "uploads",
          req.file.filename
        );
        fs.unlink(filePath, (err) => {
          if (err) {
            console.log("Error deleting file:", err);
          }
        });
      }
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    if (!req.file) {
      return next(new ErrorHandler("Avatar is required", 400));
    }

    const fileUrl = `/uploads/${req.file.filename}`;
    const user = new User({
      name,
      email,
      password,
      avatar: fileUrl,
    });

    const activationToken = createActivationToken(user);
    const activationUrl = `http://localhost:3000/activation/${activationToken}`;

    try {
      await sendMail({
        email: user.email,
        subject: "Activate your account",
        message: `Hello ${user.name}, please click on the link to activate your account: ${activationUrl}`,
      });

      return res.status(201).json({
        success: true,
        message: `Please check your email: ${user.email} to activate your account`,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

// create a jwt token

const createActivationToken = (user) => {
  return jwt.sign(user, process.env.ACTIVATION_SECRET, { expiresIn: "5m" });
};

// activate user
router.post(
  "/activation",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { activationToken } = req.body;
      const newUser = jwt.verify(
        activationToken,
        process.env.ACTIVATION_SECRET
      );

      if (!newUser) {
        return next(new ErrorHandler("Invalid Token", 400));
      }
      const { name, email, password, avatar } = newUser;
      let existingUser = await User.findOne({ email });
      if (existingUser) {
        return next(new ErrorHandler("User already exists", 400));
      }
      const savedUser = await User.create({
        name,
        email,
        avatar,
        password,
      });
      console.log("✅ User saved:", savedUser);
      sendToken(savedUser, 201, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// login user
router.post(
  "/login-user",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return next(new ErrorHandler("Please provide the all fields", 400));
      }
      const user = await User.findOne({ email }).select("+password");

      if (user) {
        return next(new ErrorHandler("User doesn't exists", 400));
      }
      const isPasswordValid = await user.comparePassword(password);
      if (!isPasswordValid) {
        return next(
          new ErrorHandler("Please provide the correct password", 400)
        );
      }
      sendToken(user, 201, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// load user
router.get(
  "/get-user",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const user = await User.findById(req.user.id);

      if (!user) {
        return next(new ErrorHandler("User doesn't exists", 400));
      }
      res.status(200).json({
        success: true,
        user,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// logout
router.get(
  "/logout",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
      });
      res.status(201).json({
        success: true,
        message: "Logout Successfully",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// update user info
router.put(
  "/update-user-info",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { name, email, password, phoneNumber } = req.body;
      const user = await User.findOne({ email }).select("+password");
      if (!user) {
        return next(new ErrorHandler("User not found", 400));
      }
      const isPasswordValid = await user.comparePassword(password);

      if (!isPasswordValid) {
        return next(
          new ErrorHandler("Please provide the correct information", 400)
        );
      }
      user.name = name;
      user.email = email;
      user.phoneNumber = phoneNumber;

      await user.save();

      res.status(201).json({
        success: true,
        user,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// update user avatar
router.put(
  "/update-avatar",
  isAuthenticated,
  upload.single("image"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const userExists = await User.findById(req.user.id);
      const avatarPathExist = `uploads/${userExists.avatar}`;
      fs.unlinkSync(avatarPathExist);
      const fileUrl = path.join(req.file.filename);
      const user = await User.findByIdAndUpdate(req.user.id, {
        avatar: fileUrl,
      });
      res.status(200).json({
        success: true,
        user,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = router;
