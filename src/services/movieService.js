import axios from "axios";

const API_URL = `${process.env.REACT_APP_API_URL}/movie`;
export const createMovieService = (data) => axios.post(`${API_URL}`, data);
export const getMoviesService = () => axios.get(`${API_URL}`);
