import React from "react";

const Legend = () => {
  return (
    <div>
      <div className="legend">
        <div className="legend-item">
          <div className="seat available"></div>
          <span>Available</span>
        </div>
        <div className="legend-item">
          <div className="seat booked"></div>
          <span>Booked</span>
        </div>
      </div>
      <div className="legend">
      <h3>How booking works:</h3>
      <p>One person can reserve up to 7 seats at a time.</p>
      <p>
        If a person is reserving seats, the priority will be to book them in one
        row
      </p>
      <p>
        If seats are not available in one row then the booking will be done in
        such a way that the nearby seats are booked.
      </p>
      </div>
    </div>
  );
};

export default Legend;
