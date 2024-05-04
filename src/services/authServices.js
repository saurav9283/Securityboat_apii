import axios from "axios";
const API_URL = `${process.env.REACT_APP_API_URL}/auth`;
export const registerService = (data)=> axios.post(`${API_URL}/register`,data);
export const loginService = (data)=> axios.post(`${API_URL}/login`,data);