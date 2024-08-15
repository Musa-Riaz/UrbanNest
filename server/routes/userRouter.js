const express = require('express');
const router = express.Router();
const {updateUserController} = require('../controllers/userController');

router.post("/update", updateUserController);

module.exports = router;