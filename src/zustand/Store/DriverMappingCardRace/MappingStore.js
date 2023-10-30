// store.js
import create from 'zustand';

const CardMappingStoreRace = create(set => ({
   
    drivers: [
        {
            "name": "Budiawan Suprapto",
            "id": "P1239100",
            "licenseType": "B2 UMUM",
            "image": "path_to_driver_image",
            "selectedData": [ /* Anda dapat memasukkan data spesifik yang terpilih di sini */]
        },
        {
            "name": "Siti Aminah",
            "id": "P1239101",
            "licenseType": "B2 UMUM",
            "image": "path_to_driver_image_2",
            "selectedData": [ /* Anda dapat memasukkan data spesifik yang terpilih di sini */]
        },
        {
            "name": "John Doe",
            "id": "P1239102",
            "licenseType": "B2 UMUM",
            "image": "path_to_driver_image_3",
            "selectedData": [ /* Anda dapat memasukkan data spesifik yang terpilih di sini */]
        },
        // {
        //     "name": "John Doe",
        //     "id": "P1239402",
        //     "licenseType": "B2 UMUM",
        //     "image": "path_to_driver_image_3",
        //     "selectedData": [ /* Anda dapat memasukkan data spesifik yang terpilih di sini */]
        // }
    ],
    selectedData: [],
    gabunganData: [],
    addData: (data) => set(state => ({ selectedData: [...state.selectedData, data] })),
    removeData: (sp) => set(state => ({ selectedData: state.selectedData.filter(data => data.sp !== sp) })),
    setGabunganData: (newData) => set(state => ({ gabunganData: newData })),
}));

export default CardMappingStoreRace;
