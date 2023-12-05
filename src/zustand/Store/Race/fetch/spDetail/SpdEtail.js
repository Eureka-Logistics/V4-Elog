import axios from "axios";
import { create } from "zustand";
import { BaseUrlRace } from "../../../../../Api/BaseUrl";

export const SpDetailRaceZustand = create((set, get) => ({
    DataSemuaDarizustand: "",
    FetcSPDetail: async (idMp) => {
        try {
            const data = await axios.get(`${BaseUrlRace}sp/get-sp-detail?id_mp=${idMp}`)
            set({ DataSemuaDarizustand: data?.data?.data?.[0] })
        } catch (error) {

        }
    },
}))