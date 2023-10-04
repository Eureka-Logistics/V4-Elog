// store.js
import create from 'zustand';

const PrintZustand = create((set) => ({
  DataKodeMitraZustand: "",
  setDataKodeMitraZustand: (kodeMitra) => set({ DataKodeMitraZustand: kodeMitra }),
}));

export default PrintZustand;
