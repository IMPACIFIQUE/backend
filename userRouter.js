const express = require('express');
const userController = require('./userController');

const router = express.Router();

router.get('/', userController.getAllUsers);
router.post('/', userController.addUser);

module.exports = router;