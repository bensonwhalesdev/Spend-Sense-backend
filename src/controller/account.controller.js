const Account = require('../models/account.model')

createAccount = async (req, res) => {
  const { userId, name, balance } = req.body;

  if (!userId || !name) {
    return res.status(400).json({ error: "userId and name are required" });
  }

  try {
    const account = new Account({ userId, name, balance });
    await account.save();
    res.status(201).json(account);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

getUserAccounts = async (req, res) => {
  const { userId } = req.params;

  try {
    const accounts = await Account.find({ userId });
    res.status(200).json(accounts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

updateAccount = async (req, res) => {
    const { accountId } = req.params;
    const { name, balance } = req.body;

    try {
        const account = await Account.findByIdAndUpdate(accountId, { name, balance }, { new: true });
        res.status(200).json(account);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
};

deleteAccount = async (req, res) => {
  const { accountId } = req.params;

  try {
    await Account.findByIdAndDelete(accountId);
    res.status(200).json({ message: "Account deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
    createAccount,
    getUserAccounts,
    updateAccount,
    deleteAccount,
};