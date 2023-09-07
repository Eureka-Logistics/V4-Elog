// store.js
import create from 'zustand';

const RefreshMitra123 = create((set) => ({
    RefreshMitra123: null,
    SetRefreshMitra123: (data) => set({ RefreshMitra123: data }),
}));

export default RefreshMitra123;
