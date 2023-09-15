import create from 'zustand';

const isiDatamasterMitraDetailZustand = create(set => ({
   data: null,
   setData: (newData) => set(state => ({ data: newData })),
   // Anda bisa menambahkan state dan action lainnya di sini
}));
export default isiDatamasterMitraDetailZustand;