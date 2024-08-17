const express = require("express");
const router = express.Router();
const {
  userSignUpController,
  userSignInController,
  userGoogleController,
  userSignOutController,
} = require("../controllers/authController");

router.post("/signup", userSignUpController);

router.post("/signin", userSignInController);

router.post("/signout", userSignOutController);

router.post("/google", userGoogleController);
module.exports = router;
