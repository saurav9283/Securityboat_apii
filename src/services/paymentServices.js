import axios from "axios";
const token = localStorage.getItem("token");
const headers = {
  'Authorization': `Bearer ${token}`
};

const API_URL = `${process.env.REACT_APP_API_URL}`;
export const getPaymentsKeyService = () => axios.get(`${API_URL}/payment/key`, { headers });
export const createBookingService = (data) => axios.post(`${API_URL}/booking`, data, { headers });
