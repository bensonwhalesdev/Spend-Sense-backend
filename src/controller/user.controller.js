const User = require('../models/user.model');
const bcrypt = require('bcryptjs');

const getAllUsers = async (req, res) => {
    try {
        const response = await User.find();
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createUser = async (req, res) => {
     const { firstname, lastname, email, password, age } = req.body;

     if (!firstname || !lastname || !email || !password || !age) {
        return res.status(400).json({ message: 'All fields are required' });
     }
    try {
        const salt = await bcrypt.genSalt(10);
       const hashedPassword = await bcrypt.hash(password, salt);
        const response = await User.create({ firstname, lastname, email, password: hashedPassword, age});
        res.status(201).json(response);
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
};

const updateUser = async (req, res) => {
    try {
         const { id } = req.params;
        const { firstname, lastname, email, password, age, role } = req.body;
        const response = await User.findByIdAndUpdate(id, { firstname, lastname, email, password, age, role }, { new: true });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getSingleUser = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await User.findById(id);
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        await User.findByIdAndDelete(id);
        res.status(200).json({
            message: "User deleted successfully"
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const loginUser = async (req, res) => {
  try {
    console.log(req.body);
    
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password." });
    }

    if (user.password !== password) {
      return res.status(400).json({ message: "Invalid email or password." });
    }
    res.status(200).json(user);

  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
    getAllUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    loginUser  
};