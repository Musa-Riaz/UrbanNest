const express = require("express");
const router = express.Router();
const { verifyUser } = require("../middlewares/verifyUser");
const { createLisitingController, deleteListingController, updateListingController } = require("../controllers/listingController");  


router.post("/create", verifyUser ,createLisitingController);

router.delete("/delete/:id",  deleteListingController);

router.post("/update/:id",  updateListingController)

module.exports = router;