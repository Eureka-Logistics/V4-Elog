import { create } from "zustand";
import { BaseUrlRace } from "../../../../../Api/BaseUrl";
import axios from "axios";

export const ListVehicleZustand = create((set, get) => ({
    keyword: "",
    ListVehicle: "",
    FetchDriver: async () => {
        try {
            const keyword = get().keyword; 
            console.log(`Keyword saat ini:`, keyword); 

            const response = await axios.get(`${BaseUrlRace}kendaraan/get-vehicle?limit=10&page=1&keyword=${keyword.pencarian == undefined ? "" : keyword.pencarian}&jenisKepemilikan=${keyword.kepemilikan == undefined ? "" : keyword.kepemilikan}&status=${keyword.status == undefined ? "" : keyword.status}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: localStorage.getItem("token"),
                },
            });

            console.log(`Data diterima dari API:`, response.data.data);
            set({ ListVehicle: response.data.data });
        } catch (error) {
            console.error('Error saat request API:', error);
        }
    }
}));
