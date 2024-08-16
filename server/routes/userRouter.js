const express = require('express');
const router = express.Router();
const {updateUserController} = require('../controllers/userController');
const { verifyUser } = require('../middlewares/verifyUser');

router.post("/update/:id",verifyUser ,updateUserController);

module.exports = router;