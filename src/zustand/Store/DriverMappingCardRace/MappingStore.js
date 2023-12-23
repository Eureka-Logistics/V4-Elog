// store.js
import axios from 'axios';
import create from 'zustand';
import { BaseUrlRace } from '../../../Api/BaseUrl';

const CardMappingStoreRace = create(set => ({


    selectedData: [],
    gabunganData: [],
    isidaridrivermapping: "",
    FetchDriverMapping: async () => {
        try {
            const data = await axios.get(`${BaseUrlRace}sp/get-driver-kendaraan`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: localStorage.getItem('token'),
                    },
                }
            )
            set({ isidaridrivermapping: data })
        } catch (error) {

        }
    },

    addData: (data) => set(state => ({ selectedData: [...state.selectedData, data] })),
    removeData: (sp) => set(state => ({ selectedData: state.selectedData.filter(data => data.sp !== sp) })),
}));

export default CardMappingStoreRace;
