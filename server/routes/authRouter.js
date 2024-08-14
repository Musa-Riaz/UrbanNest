const express= require("express");
const router = express.Router();
const {userSignUpController, userSignInController} = require("../controllers/authController");

router.post("/signup", userSignUpController);

router.post("/signin", userSignInController);


module.exports = router;