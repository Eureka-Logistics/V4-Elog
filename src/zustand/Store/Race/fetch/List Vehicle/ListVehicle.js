import { create } from "zustand";
import { BaseUrlRace } from "../../../../../Api/BaseUrl";
import axios from "axios";

export const ListVehicleZustand = create((set) => ({

    ListVehicle: "",
    FetchDriver: async () => {
        try {
            const data = await axios.get(`${BaseUrlRace}kendaraan/get-vehicle?limit=10&page=1&keyword=&jenisKepemilikan=&status=`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: localStorage.getItem("token"),
                    },
                }
            );
            console.log(`ini dari zustand`,data?.data?.data);
            set({ ListVehicle: data?.data?.data });
        } catch (error) {
            console.error(error);
        }
    }
}
))