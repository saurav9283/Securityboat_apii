import axios from "axios";

const API_URL = `${process.env.REACT_APP_API_URL}/movie`;
export const createMovieService = (data) => axios.post(`${API_URL}`, data, {withCredentials: true});
export const getMoviesService = () => axios.get(`${API_URL}`, {withCredentials: true});
export const deleteMovieService = (id) => axios.delete(`${API_URL}/${id}`, {withCredentials: true});