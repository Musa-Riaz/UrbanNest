const express= require("express");
const router = express.Router();
const {userSignUpController, userSignInController, userGoogleController} = require("../controllers/authController");

router.post("/signup", userSignUpController);

router.post("/signin", userSignInController);

router.post("/google", userGoogleController);
module.exports = router;