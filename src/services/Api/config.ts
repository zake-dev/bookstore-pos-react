import axios from "axios";
import { API_CONFIG } from "config";

export default axios.create({
  baseURL: API_CONFIG.URL,
  headers: {
    Authorization: API_CONFIG.AUTHORIZATION,
  },
});
