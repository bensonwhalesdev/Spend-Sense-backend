const UserBudget = require('../models/budget.model');

const getUserBudget = async (req, res) => {
    const { userId } = req.params;
    try {
        const budget = await UserBudget.find({ userId });
        res.status(200).json(budget);
    } catch (error) {
        res.status(500).json({ message: 'Error getting budget', error });
    }
  
};

const saveUserBudget = async (req, res) => {
  const { userId } = req.params;
  const { categories } = req.body;

  if (!categories) {
    return res.status(400).json({ message: 'Categories data is required' });
  }

  try {
    let budget = await UserBudget.findOne({ userId });
    if (budget) {
      budget.categories = categories;
    } else {
      budget = new UserBudget({ userId, categories });
    }

    await budget.save();
    res.status(200).json({ message: 'Budget saved successfully', budget });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error saving budget' });
  }
};

module.exports = {
    saveUserBudget,
    getUserBudget,
};
