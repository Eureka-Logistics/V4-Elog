import axios from "axios";
import Baseurl from "./BaseUrl"
export const httpClient = axios.create({
<<<<<<< HEAD
  baseURL: `https://stagingapi.eurekalogistics.co.id`,
=======
  baseURL: Baseurl,
>>>>>>> c98e5f268340fad4c135fe18eb67859edac4f90d
  headers: {
    "Content-Type": "application/json",
    Authorization: localStorage.getItem("token"),
  },
});
