import create from 'zustand';
import axios from 'axios';
import { BaseUrlRace } from '../../../../../Api/BaseUrl';

const ListDriverZustand = create((set) => ({

    Driver: "",
    ListDriver: "",
    DetailDriver: "",
    DriverID: null,
    FetchDriver: async () => {
        try {
            const data = await axios.get(`${BaseUrlRace}driver/get-driver?limit=10&page=1&keyword=&jenisKepemilikan=&status=`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: localStorage.getItem("token"),
                    },
                }
            );
            set({ ListDriver: data?.data?.data });
        } catch (error) {
            console.error(error);
        }
    },
    FetchDetailDriver: async (id) => {
        try {
            const data = await axios.get(`${BaseUrlRace}driver/get-driver-detail?id=${id}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: localStorage.getItem("token"),
                    },
                }
            ); set({ DetailDriver: data?.data?.data?.[0] })
        } catch (error) {
            console.error(error);
        }
    },

}));

export default ListDriverZustand;
