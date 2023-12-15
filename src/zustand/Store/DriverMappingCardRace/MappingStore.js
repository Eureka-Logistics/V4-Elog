// store.js
import create from 'zustand';

const CardMappingStoreRace = create(set => ({
   
    
    selectedData: [],
    gabunganData: [],
    addData: (data) => set(state => ({ selectedData: [...state.selectedData, data] })),
    removeData: (sp) => set(state => ({ selectedData: state.selectedData.filter(data => data.sp !== sp) })),
}));

export default CardMappingStoreRace;
