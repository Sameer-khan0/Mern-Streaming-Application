const User = require('../modals/user.modal');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Secret key for JWT
const SECRET_KEY = process.env.JWT_SECRET;

// Register Controller
const registerController = async (req, res) => {
    try {
        const { username, email, password, fullName } = req.body;
        
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "User already exists" });

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            fullName
        });

        await newUser.save();

        // Generate a JWT token
        const token = jwt.sign({ id: newUser._id, email: newUser.email }, SECRET_KEY, { expiresIn: '1h' });

        res.status(201).json({ message: "User registered successfully", token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Login Controller
const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });

        // Check if the password is correct
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        // Generate a JWT token
        const token = jwt.sign({ id: user._id, email: user.email }, SECRET_KEY, { expiresIn: '1h' });

        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Logout Controller
const logoutController = (req, res) => {
    // Clear the token from the client side
    res.status(200).json({ message: "User logged out successfully" });
};

// Update Controller
const updateController = async (req, res) => {
    try {
        const userId = req.user;
        console.log(userId)
        const updates = req.body;

        const updatedUser = await User.findByIdAndUpdate(userId, updates, { new: true });

        if (!updatedUser) return res.status(404).json({ message: "User not found" });

        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Profile Controller
const profileController = async (req, res) => {
    try {
        const userId = req.user;
        const user = await User.findById(userId).select('-password');
        if (!user) return res.status(404).json({ message: "User not found" });

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    registerController,
    loginController,
    logoutController,
    updateController,
    profileController
};
