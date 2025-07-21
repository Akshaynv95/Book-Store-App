const express = require("express");
const router = express.Router();
const { getBooks, getBookById, addBook } = require("../controllers/bookController");
const verifyToken = require("../middlewares/authMiddleware");
const authorizeRoles = require("../middlewares/roleMiddleware");

router.get("/", getBooks);
router.get("/:id", getBookById);
router.post("/", verifyToken, authorizeRoles("admin"), addBook);

module.exports = router;
