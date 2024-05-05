import axios from "axios";
const API_URL = `${process.env.REACT_APP_API_URL}/screen`;
export const createScreenService = (data)=> axios.post(`${API_URL}`,data, {withCredentials: true});
export const getScreenService = ()=> axios.get(`${API_URL}`, {withCredentials: true});