import create from 'zustand';

const EditDetailSPModal = create(set => ({
   data: null,
   setData: (newData) => set(state => ({ data: newData })),
   // Anda bisa menambahkan state dan action lainnya di sini
}));
export default EditDetailSPModal;