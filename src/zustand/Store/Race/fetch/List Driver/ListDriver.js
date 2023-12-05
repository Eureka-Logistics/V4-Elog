import create from 'zustand';
import axios from 'axios';
import { BaseUrlRace } from '../../../../../Api/BaseUrl';

const ListDriverZustand = create((set, get) => ({
    keyword: "",
    Driver: "",
    ListDriver: "",
    DetailDriver: "",
    filteroptionsjenisKepemilikanDanStatus: "",
    DriverID: null,
    FetchDriver: async () => {
        const keyword = get().keyword;
        try {
            const data = await axios.get(`${BaseUrlRace}driver/get-driver?limit=10&page=1&keyword=${keyword.pencarian == undefined ? "" : keyword.pencarian}&jenisKepemilikan=${keyword.jenis == undefined ? "" : keyword.jenis}&status=${keyword.status == undefined ? "" : keyword.status}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: localStorage.getItem("token"),
                    },
                }
            );
            set({ ListDriver: data?.data?.data });
            console.log(`keydari zustand`, keyword);
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
    getFilterOptions: async (id) => {
        try {
            const data = await axios.get(`${BaseUrlRace}driver/get-filter`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: localStorage.getItem("token"),
                    },
                }
            );
            console.log(`filter`, data.data);
            set({ filteroptionsjenisKepemilikanDanStatus: data.data })
        } catch (error) {
            console.error(error);
        }
    },

}));

export default ListDriverZustand;
