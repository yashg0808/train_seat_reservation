const Seat = require("../models/seatModel");
const mongoose = require("mongoose");

// Helper to group seats by row
const groupSeatsByRow = (seats) => {
  const rows = {};
  seats.forEach((seat) => {
    if (!rows[seat.row]) {
      rows[seat.row] = [];
    }
    rows[seat.row].push(seat);
  });
  return rows;
};

// Get all seats
const getAllSeats = async (req, res) => {
  try {
    const seats = await Seat.find();
    res.json(seats);
  } catch (error) {
    res.status(500).json({ message: "Error fetching seats", error });
  }
};

// Book seats with transactions
const bookSeats = async (req, res) => {
  const { numSeats } = req.body;

  if (numSeats > 7) {
    return res.status(400).json({ message: "You cannot book more than 7 seats at once" });
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Find unbooked seats and group them by row
    const availableSeats = await Seat.find({ isBooked: false }).session(session);
    const rows = groupSeatsByRow(availableSeats);

    let bookedSeats = [];

    // Try to book all seats in a single row
    for (const row in rows) {
      if (rows[row].length >= numSeats) {
        bookedSeats = rows[row].slice(0, numSeats);
        break;
      }
    }

    // If no single row has enough seats, book nearby seats (spread across rows)
    if (bookedSeats.length === 0) {
      bookedSeats = availableSeats.slice(0, numSeats);
    }

    // Update seat booking status and save using the session
    await Promise.all(
      bookedSeats.map(async (seat) => {
        seat.isBooked = true;
        await seat.save({ session });
      })
    );

    // Fetch the full updated seat map after booking
    const updatedSeats = await Seat.find().session(session);

    // Commit the transaction
    await session.commitTransaction();
    session.endSession();

    return res.json({ bookedSeats, allSeats: updatedSeats });
  } catch (error) {
    // Abort transaction in case of error
    await session.abortTransaction();
    session.endSession();
    return res.status(500).json({ message: "Error booking seats", error });
  }
};

module.exports = { getAllSeats, bookSeats };
