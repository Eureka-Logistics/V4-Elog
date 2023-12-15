import axios from "axios";
import { create } from "zustand";
import { BaseUrlRace } from "../../../../../Api/BaseUrl";
import { notification } from "antd";



export const SpDetailRaceZustand = create((set, get) => ({
    error: false,
    FetcSPDetail: async (idMp) => {
        try {
            const data = await axios.get(`${BaseUrlRace}sp/get-sp-detail?id_mp=${idMp}`)
            set({ DataSemuaDarizustand: data?.data?.data?.[0] })
            set({ error: false })
        } catch (error) {
            set({ error: true })
            notification.error({
                message: error.response.data.status.message
            })
            console.log(error.response.data.status.message);
        }
    },
}))