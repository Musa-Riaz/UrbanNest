const express= require("express");
const router = express.Router();
const {userSignUpController} = require("../controllers/authController");

router.post("/signup", userSignUpController);



module.exports = router;