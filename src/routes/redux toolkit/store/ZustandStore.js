import create from "zustand";

const mobil = create((set, get) => ({
  jobdesk: "",
  setJobdesk: (jobdesk) => set({ jobdesk }),
  isidetail: [],
  setSpDetail: (isidetail) => set({ isidetail }),

  isiduit: [],
  setDuit: (isiduit) => set({ isiduit }),

  isicombinedData: [],
  setisiCombinedData: (isicombinedData) => set({ isicombinedData }),

  memo: [],
  SetisiMemo: (memo) => set({ memo }),

  custumer: [],
  setCustumer: (custumer) => set({ custumer }),
  
  jenisBarang: [],
  setjenisBarang: (jenisBarang) => set({ jenisBarang }),

  orderdate : [],
  setOrderdate: (orderdate) => set({ orderdate }),
  
  asuransi : [],
  setAsuransi: (asuransi) => set({ asuransi }),


}));

export default mobil;