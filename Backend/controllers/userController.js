const User = require("../models/userModel");

// GET /users/:id - Get user profile
const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select("-password");
        if (!user) return res.status(404).json({ message: "User not found" });
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};

// PUT /users/:id - Update user profile
const updateUserProfile = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: "User not found" });

        if (req.user.id !== user._id.toString()) {
            return res.status(403).json({ message: "Access denied" });
        }

        if (name) user.name = name;
        if (email) user.email = email;
        if (password) {
            const bcrypt = require("bcrypt");
            user.password = await bcrypt.hash(password, 10);
        }

        await user.save();
        res.status(200).json({ message: "Profile updated", user });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = {
    getUserProfile,
    updateUserProfile,
};
