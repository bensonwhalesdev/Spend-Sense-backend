const express = require("express");
const { getBudget, saveBudget } = require("../controller/monthlybudget.controller");

const router = express.Router();

router.post("/", saveBudget);
router.get("/:userId/:month", getBudget);

module.exports = router;
