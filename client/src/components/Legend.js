import React from 'react';

const Legend = () => {
  return (
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
  );
};

export default Legend;