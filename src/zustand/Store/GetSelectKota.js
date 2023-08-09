import create from 'zustand';
import axios from 'axios';
import Baseurl from '../../Api/BaseUrl';

const ZustandStore = create((set) => ({
  TipeKendaraan: [],
  NamaKotaGlobal: [],
  FetchTipeKendaraan: async () => {
    try {
      const data = await axios.get(`${Baseurl}driver/get-select`, {
          headers: {
              "Content-Type": "application/json",
              Authorization: localStorage.getItem("token"),
          }
      });
      set({ TipeKendaraan: data.data.data });
      console.log(`ini`,data.data.data);
    } catch (error) {
      console.error(error);
    }
  },

  setNamaKotaGlobal: async () => {
    try {
      const data = await axios.get(`${Baseurl}tarif/get-select?idMuat=&idBogkar=&idJenisKendaraan=&service_type=`, {
          headers: {
              "Content-Type": "application/json",
              Authorization: localStorage.getItem("token"),
          }
      });
      set({ NamaKotaGlobal: data.data });
      console.log(`muatKota`,data.data);
    } catch (error) {
      console.error(error);
    }
  },
  

}));

export default ZustandStore;
