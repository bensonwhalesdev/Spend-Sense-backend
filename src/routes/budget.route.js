const express = require('express');
const {saveUserBudget, getUserBudget} = require('../controller/budget.controller');
const router = express.Router();


router.get('/:userId', getUserBudget);
router.post('/:userId', saveUserBudget);

module.exports = router;