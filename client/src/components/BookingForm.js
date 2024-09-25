import React from 'react';

const BookingForm = ({ numSeats, setNumSeats, handleBooking, isLoading }) => {
  return (
    <div className="booking-form">
      <h2>Book Your Seats</h2>
      <div className="form-group">
        <label htmlFor="numSeats">Number of Seats:</label>
        <input
          type="number"
          id="numSeats"
          value={numSeats}
          onChange={(e) => setNumSeats(parseInt(e.target.value))}
          min="1"
          max="7"
        />
      </div>
      <button onClick={handleBooking} disabled={isLoading}>
        {isLoading ? 'Booking...' : 'Book Seats'}
      </button>
    </div>
  );
};

export default BookingForm;