const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

const getAllUsers = async (req, res) => {
    try {
        const response = await User.find();
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createUser = async (req, res) => {
  try {
    const { firstname, lastname, email, password } = req.body;

    if (!firstname || !lastname || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      firstname,
      lastname,
      email,
      password: hashedPassword,
      signupDate: new Date(),
    });

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET_KEY, { expiresIn: "30d" });

    // ✅ Set token in HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: true, // set to true in production with HTTPS
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });

    res.status(201).json({
      message: "User created successfully",
      user: {
        _id: newUser._id,
        firstname: newUser.firstname,
        email: newUser.email
      }
    });

  } catch (error) {
    console.error("Signup error:", error.message);
    res.status(500).json({ error: error.message });
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

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "something went wrong" });
        }
        const id = user._id;
        const token = jwt.sign({ id }, process.env.JWT_SECRET_KEY, { expiresIn: "30d" });
    
         res.status(200).json({message: "Login successful",token,
        user: {
        _id: user._id,
        firstname: user.firstname,
        email: user.email,
      },
    });

  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({ errot: error.message });
  }
};

module.exports = {
    getAllUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    loginUser,
};