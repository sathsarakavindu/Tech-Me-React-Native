import axios from "axios";
import { domain } from "./domain_endpoints";

const apiClient = axios.create({
  baseURL: domain,
  headers: {
    "Content-Type": "application/json"
  }
});

export default apiClient;
