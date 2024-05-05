import axios from "axios";
const token = localStorage.getItem("token");
const headers = {
  'Authorization': `Bearer ${token}`
};
const API_URL = `${process.env.REACT_APP_API_URL}/movie`;
export const createMovieService = (data) => axios.post(`${API_URL}`, data, {headers});
export const getMoviesService = () => axios.get(`${API_URL}`, {headers});
export const deleteMovieService = (id) => axios.delete(`${API_URL}/${id}`, {headers});