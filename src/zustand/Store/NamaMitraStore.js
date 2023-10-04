import create from 'zustand';
import axios from 'axios';
import Baseurl from '../../Api/BaseUrl';

const ZustandStore = create((set) => ({
  NamaMitra: [],
  setNamaMitra: async () => {
    try {
      const data = await axios.get(`${Baseurl}mitra/get-select-mitraPic`, {
          headers: {
              "Content-Type": "application/json",
              Authorization: localStorage.getItem("token"),
          }
      });
      set({ NamaMitra: data?.data?.mitra});
    } catch (error) {
      console.error(error);
    }
  },
}));

export default ZustandStore;
