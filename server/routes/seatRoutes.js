
const express = require("express");
const { getAllSeats, bookSeats } = require("../controllers/seatController");

const router = express.Router();

// Route to get all seats
router.get("/seats", getAllSeats);

// Route to book seats
router.post("/book-seats", bookSeats);

module.exports = router;