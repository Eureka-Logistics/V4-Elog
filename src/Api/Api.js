import axios from "axios";
import Baseurl from "./BaseUrl"
export const httpClient = axios.create({
  baseURL: Baseurl,
  headers: {
    "Content-Type": "application/json",
    Authorization: localStorage.getItem("token"),
  },
});
