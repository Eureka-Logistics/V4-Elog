import axios from "axios";
import { create } from "zustand";
import { BaseUrlRace } from "../../../../../Api/BaseUrl";
import { notification } from "antd";

export const UangJalanZustand = create((set, get) => ({
    isifetchuangjalan: "",
    isiinputanuangjalan: "",
    isibbm: null,
    perhitunganParkirstate: null,
    uangjalanstatezustand: null,
    close: false,
    FetchUangJalan: async () => {
        try {
            const data = await axios(`${BaseUrlRace}sp/get-uang-jalan?page=1&limit=10&Driver=&tgl=`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: localStorage.getItem('token'),
                    },
                }
            )
            console.log(`data`, data.data.data);
            set({ isifetchuangjalan: data.data.data })
        } catch (error) {

        }
    },
    postuangjalan: async (isiinputanuangjalan, tutup) => {
        const perhitunganParkirstate = get().perhitunganParkirstate
        const isibbm = get().isibbm
        const uangjalanstatezustand = get().uangjalanstatezustand
        const FetchUangJalan = get().FetchUangJalan
        const close = get().close
        const body = {
            "id_driver": isiinputanuangjalan.idDriver,
            // "tgl_kirim": isiinputanuangjalan.tgl_kirim,
            "id_unit": 1,
            "no_rek_driver": "12312412412",
            "nama_bbm": "",
            "provinsi": "",
            "jarak": isiinputanuangjalan.jarak,
            "bbm": isibbm,
            "makan": 50000,
            "parkir": perhitunganParkirstate,
            "tol": isiinputanuangjalan?.tol,
            "amount": uangjalanstatezustand
        }
        try {
            const data = await axios.post(`${BaseUrlRace}sp/save-uang-jalan`, body,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: localStorage.getItem('token'),
                    },
                }
            )
            console.log(`data`, data.data.status.message);
            notification.success({
                message: data.data.status.message
            })
            tutup()

        } catch (error) {
            notification.error({
                message: error?.response?.data?.status?.message
            })
        }
        FetchUangJalan()
    },
    addisiinputanuangjalan: (data) => set(state => ({ isibbm: data }))

}))