import create from 'zustand';

const SPlistLamaState = create(set => ({
   dataapprove: null,
   setdataapprove: (newData) => set(state => ({ setdataapprove: newData })),
   // Anda bisa menambahkan state dan action lainnya di sini
}));
export default SPlistLamaState;