const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

const { JWT_SECRET } = process.env;

const SALT_ROUNDS = 10; // Number of rounds to generate salt. 10 is recommended value

async function register(req, res) {
  try {
    const { email, password, ...rest } = req.body;

    const existingUser = await User.findOne({ email }); // Use findOne to check if the user exists
    if (existingUser) {
      console.log("User already exists");
      return res.status(400).json({ error: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS); // Hash password
    const user = new User({
      ...rest,
      email,
      password: hashedPassword,
    }); // Create new user object
    await user.save(); // Save user to database

    // Generate JWT token containing user id
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: "1h",
    });

    // Send token in response to the client
    res.status(201).json({ message: "User registered successfully", token });
  } catch (error) {
    console.log("Error while registering user", error);
    res.status(500).json({ error: "Registration failed" });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      console.log("User not found");
      return res.status(401).json({ error: "Authentication failed" });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      console.log("Password does not match");
      return res.status(401).json({ error: "Authentication failed" });
    }

    // Generate JWT token containing user id
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: "1h",
    });

    // Send token in response to the client, not the user object!
    res.status(200).json({ token });
  } catch (error) {
    console.log("Error while logging in user", error);
    res.status(500).json({ error: "Login failed" });
  }
}

async function getLoggedInUser(req, res) {
  const { userId } = req;
  try {
    const user = await User.findById(userId);
    if (!user) {
      console.log("User not found");
      return res.status(404).json({ message: "User not found" });
    }

    // Remove password from the user object before sending the response
    const { password, ...userWithoutPassword } = user.toObject();

    res.json(userWithoutPassword);
  } catch (err) {
    console.log("Error while getting logged in user", err);
    res.status(500).json({ message: err.message });
  }
}

module.exports = { register, login, getLoggedInUser };
