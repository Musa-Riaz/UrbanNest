const { catchAsync } = require("../middlewares/catchAsync");
const userModel = require("../models/userModel");
const { ErrorHandler } = require("../middlewares/errorMiddleware");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const listingModel = require("../models/listingModel");
//Need to fix the updateController when the user logs in with oauth
//The token stored in cookie is different from the one stored in the local storage

exports.updateUserController = catchAsync(async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    console.log(req.user.id);

    return next(
      new ErrorHandler("You are not allowed to update this user", 403)
    );
  }

  if (req.body.password) {
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);
  }

  try {
    const user = await userModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },
      { new: true }
    );

    res.status(200).json({
      success: "true",
      message: "User updated successfully",
      user,
    });
  } catch (err) {
    console.log(err);
    return next(new ErrorHandler(err.message, 500));
  }
});

exports.deleteUserController = catchAsync(async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(
      new ErrorHandler("You are not allowed to delete this user", 403)
    );
  }

  try {
    await userModel.findByIdAndDelete(req.params.id);
    res.clearCookie("access_token", {
      httpOnly: true,
    });
    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (err) {
    console.log(err);
  }
});

exports.userListingController = catchAsync(async (req, res, next) => {
  try {
    console.log(req.user.id);
    if (req.user.id !== req.params.id) {
      return next(new ErrorHandler("You can only view your own listings", 401));
    }

    const listing = await listingModel.find({ userId: req.params.id });
    if (listing) {
      res.status(200).json({
        success: true,
        message: "User listings fetched",
        listing,
      });
    } else {
      return next(new ErrorHandler("The listing wasn't found"));
    }
  } catch (err) {
    console.log(err);
  }
});

exports.getListingController = catchAsync(async (req, res, next) => {
  try {
    const listing = await listingModel.findById( req.params.id );
    if (listing) {
      res.status(200).json({
        success: true,
        message: "Listing found",
        listing,
      });
    } else {
      return next(new ErrorHandler("The listing could not be found", 400));
    }
  } catch (err) {
    console.log(err);
  }
});
