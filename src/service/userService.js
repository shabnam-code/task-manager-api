const User = require("../../Model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "SHAB7888";

// Controller for user signup
exports.signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!email || !username || !password) {
      return res.status(400).send("Please Enter required fields");
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).send("Email already exists");
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      email,
      username,
      password: hashPassword,
    });
    await newUser.save();
    const token = jwt.sign({ email, id: newUser._id }, SECRET_KEY, {
      expiresIn: "1h",
    });
    res.json({ message: "Signup successful", token, newUser });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).send("Server error. Please try again later.");
  }
};

// Controller for user signin
exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send("Please enter required fields");
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send("User not found");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send("Invalid password");
    }
    const token = jwt.sign(
      { email, id: user._id, username: user.username },
      SECRET_KEY,
      { expiresIn: "1h" }
    );
    res.json({ message: "Login successful", token, user });
  } catch (error) {
    console.error("Signin error:", error);
    res.status(500).send("Server error");
  }
};
