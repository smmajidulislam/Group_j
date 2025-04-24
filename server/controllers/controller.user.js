const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const handleUserRegistration = async (req, res) => {
  try {
    const { name, email, password, phone, role, country } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      email,
      password: hashedPassword,
      phone,
      role,
      country,
      blance: findUserBalance[0]._id,
    });
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const handleUserLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: { $eq: email } });
    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid password" });
    }
    // JWT Token তৈরি করা (role সহ)
    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
        role: user.role, // এখানে role ইনক্লুড করলাম
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    // Cookie তে token সেট করলাম
    res.cookie("token", token, {
      httpOnly: true, // client-side JS access করতে পারবে না
      secure: false, // HTTPS ইউজ করলে true করো
      sameSite: "Lax", // cross-site request issue এড়াতে
      maxAge: 7 * 24 * 60 * 60 * 1000, // ৭ দিন
    });
    // ইউজারের ID ও role ফ্রন্টএন্ডে পাঠানো
    res.status(200).json({
      message: "Login successful",
      userId: user._id,
      role: user.role,
      expire: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const handleGetSingleUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const handleLogOutUser = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  handleUserRegistration,
  handleUserLogin,
  handleGetSingleUser,
  handleLogOutUser,
};
