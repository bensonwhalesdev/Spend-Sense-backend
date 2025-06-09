const express = require("express");
const { createAccount, getUserAccounts, deleteAccount, updateAccount } = require("../controller/account.controller");
const router = express.Router();


router.post("/", createAccount);
router.get("/:userId", getUserAccounts);
router.patch("/:accountId", updateAccount)
router.delete("/:accountId", deleteAccount);

module.exports = router;
