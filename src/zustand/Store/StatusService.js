import create from 'zustand';

const useServiceStatusStore = create((set) => ({
  serviceStatus: null,
  setServiceStatus: (status) => set({ serviceStatus: status }),
}));

export default useServiceStatusStore;
