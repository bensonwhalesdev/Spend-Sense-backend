const express = require('express');
const { getUser } = require('../controller/existing-user.controller');
const verifyToken = require('../middleware/verify-token.middleware');
const router = express.Router();


router.get('/verify', verifyToken, getUser);

module.exports = router;