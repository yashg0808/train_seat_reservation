// src/components/SeatMap.js
import React from "react";
const SeatMap = ({ seats }) => {
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

  const rows = groupSeatsByRow(seats);

  return (
    <div className="seat-map">
      {Object.keys(rows).map((row) => (
        <div key={row} className="seat-row">
          {rows[row].map((seat) => (
            <div
              key={seat.seatNumber}
              className={`seat ${seat.isBooked ? "booked" : "available"}`}
            >
              {seat.seatNumber}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default SeatMap;
