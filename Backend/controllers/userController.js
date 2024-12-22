const User = require("../models/User");

exports.signup = async (req, res) => {
  const { username, password } = req.body;
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: "Username already exists" });
    }
    const newUser = new User({ username, password });
    await newUser.save();
    res.json({ message: "User signed up!", user: newUser });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username, password });
    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }
    res.json({ message: "User logged in!", user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
