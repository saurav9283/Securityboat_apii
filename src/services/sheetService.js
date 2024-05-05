import axios from "axios";

const token = localStorage.getItem("token");
// console.log(token)
const headers = {
  'Authorization': `Bearer ${token}`
};

const API_URL = `${process.env.REACT_APP_API_URL}/seat`;

export const getSheetsService = (movieId, screenId) => 
  axios.get(`${API_URL}?movie=${movieId}&screen=${screenId}`, { headers });

export const createSeatService = (data) => 
  axios.post(`${API_URL}`, data, { headers });