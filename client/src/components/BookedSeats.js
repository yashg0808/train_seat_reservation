import React from "react";

const BookedSeats = ({ bookedSeats }) => {
  return (
    <div className="booked-seats">
      <h2>Booked Seats:</h2>
      <ul>
        {bookedSeats.map((seat) => (
          <li key={seat.seatNumber}>{seat.seatNumber}</li>
        ))}
      </ul>
    </div>
  );
};

export default BookedSeats;
