const mongoose = require('mongoose');

const budgetItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  amount: { type: Number, default: 0 }
});

const budgetCategorySchema = new mongoose.Schema({
  group: { type: String, required: true },
  items: [budgetItemSchema]
});

const userBudgetSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  categories: [budgetCategorySchema]
});

const UserBudget = mongoose.model('UserBudget', userBudgetSchema);

module.exports = UserBudget;
