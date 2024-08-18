const express = require('express');
const router = express.Router();
const {updateUserController, deleteUserController} = require('../controllers/userController');
const { verifyUser } = require('../middlewares/verifyUser');

router.post("/update/:id",verifyUser ,updateUserController);

router.delete("/delete/:id", verifyUser, deleteUserController);

module.exports = router;