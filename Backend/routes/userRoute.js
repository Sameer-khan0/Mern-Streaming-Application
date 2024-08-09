const express = require('express');
const router = express.Router();
const { registerController, loginController, logoutController, updateController, profileController } = require('../controllers/user.controller');
const verifyingToken = require('../middleware/varifyingToken');

router.post('/register', registerController);
router.post('/login', loginController);
router.post('/logout', verifyingToken, logoutController);
router.post('/update', verifyingToken, updateController);
router.get('/profile', verifyingToken, profileController);

module.exports = router;
