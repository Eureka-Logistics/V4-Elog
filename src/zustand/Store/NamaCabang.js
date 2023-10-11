import create from 'zustand';

const NamaCabangStore = create((set) => ({
    get NamaCabang() {
        return localStorage.getItem('cabang');
    },
    setNamaCabang: (status) => {
        console.log(`test`)
        localStorage.setItem('cabang', status);
        set({ NamaCabang: status });
    },
}));

export default NamaCabangStore;
