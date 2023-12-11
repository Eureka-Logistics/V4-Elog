import create from 'zustand';

const ModalState = create(set => ({
    EditAlamat: false,
    setEditAlamat: (newData) => set({ EditAlamat: newData }), // Use camelCase for function names
    // Anda bisa menambahkan state dan action lainnya di sini
}));
 export default ModalState