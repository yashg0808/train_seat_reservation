// server/seed.js

require("dotenv").config();
const mongoose = require("mongoose");
const Seat = require("./models/seatModel"); // Import the Seat model

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected for Seeding"))
  .catch((err) => console.log(err));

// Create 80 seats (11 rows, 7 seats per row except last row which has 3 seats)
const seats = [];
let seatNumber = 1;

for (let row = 1; row <= 10; row++) {
  for (let i = 0; i < 7; i++) {
    seats.push({ seatNumber: `S${seatNumber}`, row, isBooked: false });
    seatNumber++;
  }
}

// Last row has only 3 seats
for (let i = 0; i < 3; i++) {
  seats.push({ seatNumber: `S${seatNumber}`, row: 11, isBooked: false });
  seatNumber++;
}

// Insert the seats into the database
Seat.insertMany(seats)
  .then(() => {
    console.log("Seats have been seeded");
    mongoose.connection.close(); // Close the connection after seeding
  })
  .catch((err) => {
    console.error("Seeding error:", err);
  });
