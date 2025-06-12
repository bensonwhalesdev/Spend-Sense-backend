const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: String,
  amount: Number,
});

const groupSchema = new mongoose.Schema({
  group: String,
  items: [itemSchema],
});

const budgetSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  month: {
    type: String,
    required: true, // Format: "2025-06"
  },
  categories: [groupSchema],
  totalAssigned: {
    type: Number,
    default: 0,
  },
}, { timestamps: true });

const MonthlyBudget = mongoose.model("MonthlyBudget", budgetSchema);

module.exports = MonthlyBudget;
