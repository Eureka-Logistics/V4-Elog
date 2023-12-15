// store.js
import create from 'zustand';

const JarakWaktuStore = create(set => ({
    JarakWaktu: [],
    setJarakWaktu: (data) => set(state => ({ JarakWaktu: data })),
}));
export default JarakWaktuStore;
