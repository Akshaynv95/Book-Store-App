const Review = require("../models/reviewModel");

// GET /reviews?bookId=xyz
const getReviews = async (req, res) => {
    try {
        const { bookId } = req.query;
        if (!bookId) return res.status(400).json({ message: "bookId is required" });

        const reviews = await Review.find({ bookId }).populate("userId", "name");
        res.status(200).json(reviews);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};

// POST /reviews
const addReview = async (req, res) => {
    try {
        const { bookId, rating, comment } = req.body;

        if (!bookId || !rating || !comment) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newReview = new Review({
            bookId,
            userId: req.user.id,
            rating,
            comment,
        });

        await newReview.save();
        res.status(201).json({ message: "Review added", review: newReview });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = {
    getReviews,
    addReview,
};
