const express = require('express');
const { createUser, 
        getAllUsers, 
        updateUser, 
        getSingleUser, 
        deleteUser, 
        loginUser } = require('../controller/user.controller');
const validate = require('../middleware/validate.middleware');
const userSchema = require('../schema/user.schema')


const router = express.Router();

router.get('/', getAllUsers);
router.get('/:id', getSingleUser);
router.post('/', validate(userSchema), createUser);
router.post("/login", loginUser);
router.patch('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;