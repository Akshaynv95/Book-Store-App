const express = require("express");
const router = express.Router();
const { getReviews, addReview } = require("../controllers/reviewController");
const verifyToken = require("../middlewares/authMiddleware");

router.get("/", getReviews); // public access
router.post("/", verifyToken, addReview); // only logged-in users

module.exports = router;
