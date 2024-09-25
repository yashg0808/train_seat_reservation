const mongoose = require("mongoose");

const SeatSchema = new mongoose.Schema({
  seatNumber: { type: String, required: true },
  row: { type: Number, required: true },
  isBooked: { type: Boolean, default: false },
});

const Seat = mongoose.model("Seat", SeatSchema);

module.exports = Seat;
