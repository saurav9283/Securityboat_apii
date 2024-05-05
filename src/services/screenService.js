import axios from "axios";
const token = localStorage.getItem("token");
const headers = {
  'Authorization': `Bearer ${token}`
};
const API_URL = `${process.env.REACT_APP_API_URL}/screen`;
export const createScreenService = (data)=> axios.post(`${API_URL}`,data, {headers});
export const getScreenService = ()=> axios.get(`${API_URL}`, {headers});