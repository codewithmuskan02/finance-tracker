 

const User = require("../models/User");

// POST /api/users/register
exports.registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if user already exists by email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create new user
    const user = new User({ username, email, password });
    await user.save();

    // Return user details including _id
    res.status(201).json({
      message: "User registered successfully",
      user: {
        _id: user._id,
        username: user.username,
        email: user.email
      }
    });
  } catch (err) {
    res.status(500).json({ message: "Error registering user" });
  }
};

// POST /api/users/login
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Check password (plain text for now, later use bcrypt)
    if (user.password !== password) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Return user details including _id
    res.json({
      message: "Login successful",
      user: {
        _id: user._id,
        username: user.username,
        email: user.email
      }
    });
  } catch (err) {
    res.status(500).json({ message: "Error logging in" });
  }
};


 