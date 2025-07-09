const express = require('express');
const { signUp, loginUser, verifyUser } = require('../controller/auth.controller');
const validate = require('../middleware/validate.middleware');
const userSchema = require('../schema/user.schema');
const authenticateUser = require('../middleware/auth.middleware');


const router = express.Router();



router.post('/', validate(userSchema), signUp);
router.get('/me', authenticateUser, verifyUser);
router.post("/login", loginUser);

module.exports = router;