import create from 'zustand';
import axios from 'axios';
import Baseurl from '../../Api/BaseUrl';

const SpStore = create((set) => ({
 
  SPFilter:[],
  setSPFilter: async () => {
    try {
      const data = await axios.get(`${Baseurl}sp/get-SP-all-filter`, {
          headers: {
              "Content-Type": "application/json",
              Authorization: localStorage.getItem("token"),
          }
      });
      set({ SPFilter: data.data});
    } catch (error) {
      console.error(error);
    }
  },

}));

export default SpStore;
