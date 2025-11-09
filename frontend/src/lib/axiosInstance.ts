import axios from "axios";
import { authLogoutHandler } from "./authLogoutHandler";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

// Intercept all responses
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Automatically logout on unauthorized
      authLogoutHandler(); // we’ll define this next
    }
    return Promise.reject(error);
  }
);

export default API;
