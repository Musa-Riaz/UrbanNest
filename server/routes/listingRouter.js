const express = require("express");
const router = express.Router();
const { verifyUser } = require("../middlewares/verifyUser");
const { createLisitingController } = require("../controllers/listingController");  


router.post("/create", verifyUser ,createLisitingController);

module.exports = router;