const Book = require("../models/bookModel");

// GET /books - All books with pagination
const getBooks = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const books = await Book.find().skip(skip).limit(limit);
        const total = await Book.countDocuments();

        res.status(200).json({
            total,
            page,
            totalPages: Math.ceil(total / limit),
            books
        });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};

// GET /books/:id - Get book by ID
const getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) return res.status(404).json({ message: "Book not found" });
        res.status(200).json(book);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};

// POST /books - Add new book (Admin only)
const addBook = async (req, res) => {
    try {
        const { title, author, description, genre, publishedYear, coverImage } = req.body;
        const newBook = new Book({ title, author, description, genre, publishedYear, coverImage });
        await newBook.save();
        res.status(201).json({ message: "Book added successfully", book: newBook });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = {
    getBooks,
    getBookById,
    addBook,
};
