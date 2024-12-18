import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

export default api;
