const MonthlyBudget = require('../models/monthlybudget.model');

const saveBudget = async (req, res) => {
  const { userId, month, categories, totalAssigned } = req.body;

  try {
    const existing = await MonthlyBudget.findOne({ userId, month });

    if (existing) {
      existing.categories = categories;
      existing.totalAssigned = totalAssigned;
      await existing.save();
      return res.status(200).json(existing);
    }

    const newBudget = new MonthlyBudget({ userId, month, categories, totalAssigned });
    await newBudget.save();
    res.status(201).json(newBudget);
  } catch (err) {
    res.status(500).json({ error: "Failed to save budget", details: err.message });
  }
};

const getBudget = async (req, res) => {
  const { userId, month } = req.params;

  try {
    const budget = await MonthlyBudget.findOne({ userId, month });

    if (!budget) return res.status(404).json({ message: "Budget not found" });

    res.status(200).json(budget);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch budget", details: err.message });
  }
};

module.exports = { saveBudget, getBudget };