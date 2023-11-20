import create from 'zustand';

const OptionsCabangState = create(set => ({
   OptionsStateZustand: null,
   setOptionsStateZustand: (newData) => set(state => ({ setOptionsStateZustand: newData })),
   // Anda bisa menambahkan state dan action lainnya di sini
}));
export default OptionsCabangState;