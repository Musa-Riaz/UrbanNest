const express = require('express');
const router = express.Router();
const {updateUserController, deleteUserController, userListingController, getListingController, getUserController} = require('../controllers/userController');
const { verifyUser } = require('../middlewares/verifyUser');

router.post("/update/:id",verifyUser ,updateUserController);

router.delete("/delete/:id", verifyUser, deleteUserController);

router.get("/get-user/:id", verifyUser, getUserController);

router.get("/listing/:id", verifyUser, userListingController);

router.get("/single-listing/:id", getListingController)

module.exports = router;