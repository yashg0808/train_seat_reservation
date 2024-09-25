import axios from "axios";

const API_BASE_URL = "https://train-seat-reservation-backend.vercel.app/api";

// Get all seats from the backend
export const getSeats = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/seats`);
    return response.data;
  } catch (error) {
    console.error("Error fetching seat data:", error);
    throw error;
  }
};

// Book seats by sending number of seats to the backend
export const bookSeats = async (numSeats) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/book-seats`, { numSeats });
    return response.data.bookedSeats;
  } catch (error) {
    if (error.response && error.response.data.message) {
      throw new Error(error.response.data.message);
    } else {
      console.error("Error booking seats:", error);
      throw error;
    }
  }
};
