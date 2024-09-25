const Seat = require("../models/seatModel");

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

// Book seats
const bookSeats = async (req, res) => {
  const { numSeats } = req.body;

  if (numSeats > 7) {
    return res.status(400).json({ message: "You cannot book more than 7 seats at once" });
  }

  try {
    // Find unbooked seats
    const availableSeats = await Seat.find({ isBooked: false });

    // Group seats by row
    const rows = groupSeatsByRow(availableSeats);

    // Try to find seats in one row
    for (const row in rows) {
      if (rows[row].length >= numSeats) {
        // Book all seats in this row
        const bookedSeats = rows[row].slice(0, numSeats);
        bookedSeats.forEach(async (seat) => {
          seat.isBooked = true;
          await seat.save();
        });
        return res.json({ bookedSeats });
      }
    }

    // If no single row has enough seats, book nearby seats (spread across rows)
    const bookedSeats = availableSeats.slice(0, numSeats);
    bookedSeats.forEach(async (seat) => {
      seat.isBooked = true;
      await seat.save();
    });

    res.json({ bookedSeats });
  } catch (error) {
    res.status(500).json({ message: "Error booking seats", error });
  }
};

module.exports = { getAllSeats, bookSeats };