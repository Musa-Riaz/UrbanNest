const express= require("express");
const router = express.Router();
const {userSignInController, userSignUpController} = require("../controllers/userController");

router.post("/signup", userSignUpController);

router.post("/signin", userSignInController);

module.exports = router;