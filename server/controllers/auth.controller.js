const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Allowed roles
const ALLOWED_ROLES = ["guest", "host"];

// REGISTER
const register = async (req, res) => {
  try {
    const { fullName, username, email, password, phone, role } = req.body;

    if (!fullName || !username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Validate role
    const userRole = role && ALLOWED_ROLES.includes(role) ? role : "guest";

    const existingUser = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (existingUser) {
      return res
        .status(409)
        .json({ message: "Username or email already in use" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      username,
      email,
      phone,
      password: hashedPassword,
      role: userRole,
    });

    await newUser.save();

    const userToSend = { ...newUser._doc };
    delete userToSend.password;

    res
      .status(201)
      .json({ message: "User registered successfully", user: userToSend });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// LOGIN
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const payload = {
      id: existingUser._id,
      role: existingUser.role,
      username: existingUser.username,
      fullName: existingUser.fullName,
      email: existingUser.email,
      phone: existingUser.phone,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).json({
      message: "Login successful",
      token,
      user: payload,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// GET LOGGED-IN USER
const getUserById = async (req, res) => {
  try {
    const userId = req.user;
    const existingUser = await User.findById(userId)
      .select("-password")
      .populate("bookings hotels reviews wishlist");
    if (!existingUser)
      return res.status(404).json({ message: "User not found" });

    res.status(200).json(existingUser);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// GET ALL USERS (admin only)
const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// UPDATE USER PROFILE
const update = async (req, res) => {
  try {
    const userId = req.user;
    const { fullName, username, password, phone } = req.body;

    const existingUser = await User.findById(userId);
    if (!existingUser)
      return res.status(404).json({ message: "User not found" });

    if (fullName) existingUser.fullName = fullName;
    if (username) existingUser.username = username;
    if (phone) existingUser.phone = phone;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      existingUser.password = hashedPassword;
    }

    await existingUser.save();

    const userToSend = { ...existingUser._doc };
    delete userToSend.password;

    res
      .status(200)
      .json({ message: "User updated successfully", user: userToSend });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { register, login, getUserById, getUsers, update };
