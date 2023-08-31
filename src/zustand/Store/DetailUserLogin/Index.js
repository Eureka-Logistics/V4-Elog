// store.js
import create from 'zustand';
import Baseurl from '../../../Api/BaseUrl';
import axios from 'axios';

const DetailUserLoginZustand = create((set) => ({
    DetailUserLoginZustandState: "",
    setDetailUserLoginZustand: async () => {
        try {
          const data = await axios.get(`${Baseurl}auth/get-profile`, {
              headers: {
                  "Content-Type": "application/json",
                  Authorization: localStorage.getItem("token"),
              }
          });
          set({ DetailUserLoginZustandState: data.data.data});
        } catch (error) {
          console.error(error);
        }
      },
    
    }));

export default DetailUserLoginZustand;
