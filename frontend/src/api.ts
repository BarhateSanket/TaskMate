import axios from "axios";

const BASE = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

export const API = axios.create({
  baseURL: BASE,
  headers: { "Content-Type": "application/json" }
});
