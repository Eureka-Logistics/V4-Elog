import create from 'zustand';
import axios from 'axios';
import Baseurl from '../../Api/BaseUrl';

const AnotherDriverZustand = create((set) => ({
  NamaAnotherZustand: [],
  SetnamaAnotherZustand: async () => {
    try {
      const data = await axios.get(`${Baseurl}sp/another-driver`, {
          headers: {
              "Content-Type": "application/json",
              Authorization: localStorage.getItem("token"),
          }
      });
      set({ NamaAnotherZustand: data.data.data });
    } catch (error) {
      console.error(error);
    }
  },
}));

export default AnotherDriverZustand;
