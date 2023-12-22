import axios from "axios"
import { BaseUrlRace } from "../../../../../Api/BaseUrl"
import { create } from "zustand"

const AlamatCustomerZustand = create((set) => ({
    DetailAlamatHistory: null,
    passwordvalidasi:null,
    fetchHistoryAlamat: async () => {
        const getApi = await axios.get(`${BaseUrlRace}sp/history_update_alamat?page=1&limit=10`,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: localStorage.getItem("token"),
                },
            }
        )
        console.log(getApi?.data.data);
        set({DetailAlamatHistory : getApi?.data?.data})
    }


}))
export default AlamatCustomerZustand