import React, { useEffect, useState, useCallback } from "react";
import "./AppStyles.css";
import { getSeats, bookSeats } from "./services/seatService";
import BookingForm from "./components/BookingForm";
import BookedSeats from "./components/BookedSeats";
import SeatMap from "./components/SeatMap";
import Legend from "./components/Legend";
import ThemeToggle from "./components/ThemeToggle";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const App = () => {
  const [seats, setSeats] = useState([]);
  const [numSeats, setNumSeats] = useState(1);
  const [bookedSeats, setBookedSeats] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(true);

  const fetchSeats = useCallback(() => {
    setIsLoading(true);
    getSeats()
      .then((data) => {
        setSeats(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching seat data:", error);
        setErrorMessage("Failed to fetch seat data. Please try again.");
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    fetchSeats();
  }, [fetchSeats]);

  useEffect(() => {
    document.body.className = isDarkTheme ? "dark-theme" : "light-theme";
  }, [isDarkTheme]);

  const handleBooking = () => {
    if (numSeats > 7) {
      setErrorMessage("You can reserve up to 7 seats at a time.");
      return;
    }
    if (numSeats < 1) {
      setErrorMessage("Enter a number greater than 0.");
      return;
    }

    setIsLoading(true);
    bookSeats(numSeats)
      .then((booked) => {
        setBookedSeats(booked);
        setErrorMessage("");

        // Optimistically update the local seat map
        setSeats((prevSeats) => {
          const updatedSeats = [...prevSeats];
          booked.forEach((seatNumber) => {
            const seatIndex = updatedSeats.findIndex(
              (seat) => seat.number === seatNumber
            );
            if (seatIndex !== -1) {
              updatedSeats[seatIndex] = {
                ...updatedSeats[seatIndex],
                isBooked: true,
              };
            }
          });
          return updatedSeats;
        });

        // Fetch the updated seat map from the server
        return getSeats();
      })
      .then((latestSeats) => {
        setSeats(latestSeats);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error during booking process:", error);
        setErrorMessage("An error occurred during booking. Please try again.");
        setIsLoading(false);
        // Revert the optimistic update
        fetchSeats();
      });
  };

  const toggleTheme = () => {
    setIsDarkTheme((prevTheme) => !prevTheme);
  };

  return (
    <div className={`${isDarkTheme ? "dark-theme" : "light-theme"}`}>
      <div className={`app-container`}>
        <header className="app-header">
          <h1>Train Seat Reservation System</h1>
          <ThemeToggle isDarkTheme={isDarkTheme} toggleTheme={toggleTheme} />
        </header>

        <div className="app-content">
          <div className="left-column">
            <BookingForm
              numSeats={numSeats}
              setNumSeats={setNumSeats}
              handleBooking={handleBooking}
              isLoading={isLoading}
            />

            {errorMessage && (
              <div className="error-message">{errorMessage}</div>
            )}

            {bookedSeats.length > 0 && (
              <BookedSeats bookedSeats={bookedSeats} />
            )}
          </div>

          <div className="right-column">
            <div className="seat-map-container">
              <SeatMap seats={seats} />
              <Legend />
            </div>
          </div>
        </div>

        {isLoading && (
          <div className="loading-overlay">
            <div className="loading-spinner"></div>
          </div>
        )}

        {/* Submissions Section */}
        <header className="app-header">
          <h1>Submissions</h1>
        </header>
        <div className="app-content">
          <div className="left-column">
            <h2>Database Structure:</h2>
            <p>
              The application uses <b>MongoDB</b> for storing seat information.
              The database structure is as follows:
            </p>
            <pre>{`
              {
                seatNumber: String,  // e.g., "S1", "S2"
                row: Number,         // Row number (1 to 11)
                isBooked: Boolean    // Booking status (true or false)
              }
              `}</pre>

            <p>Example of how the seats will be structured in MongoDB:</p>
            <pre>{`
              [
                { "_id": "64f7b31c2b123456789abcd", "seatNumber": "S1", "row": 1, "isBooked": false },
                { "_id": "64f7b31c2b123456789abce", "seatNumber": "S2", "row": 1, "isBooked": false },
                { "_id": "64f7b31c2b123456789abcf", "seatNumber": "S3", "row": 1, "isBooked": false },
                { "_id": "64f7b31c2b123456789abcg", "seatNumber": "S4", "row": 1, "isBooked": true },
                ...
                { "_id": "64f7b31c2b123456789abcn", "seatNumber": "S80", "row": 11, "isBooked": false }
              ]
              `}</pre>
          </div>
          <div className="right-column">
            <br />
            <h2>Links:</h2>
            <ul>
              <li>
                <a href="https://github.com/yashg0808/train_seat_reservation">GitHub Repository</a>
              </li>
              <br />
              <li>
                <a href="https://train-seat-reservation-delta.vercel.app/">Live Link</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* Footer with Contact Details */}
      <footer className="app-footer">
        <p>
          <a href="mailto:yash.gupta.ug21@nsut.ac.in">
            yash.gupta.ug21@nsut.ac.in
          </a>{" "}
          &nbsp;&nbsp;| &nbsp;&nbsp;{" "}
          <a href="mailto:yash.gupta0808@gmail.com">yash.gupta0808@gmail.com</a>
        </p>
        <p>
      
          <a
            href="https://github.com/yashg0808"
            target="_blank"
            rel="noopener noreferrer"
          > <FaGithub size={24} />
          </a> &nbsp;&nbsp;&nbsp;&nbsp;
          <a
            href="https://linkedin.com/in/yash-gupta-01ba41232"
            target="_blank"
            rel="noopener noreferrer"
          ><FaLinkedin size={24} />
          </a>
        </p>
      </footer>
    </div>
  );
};

export default App;
