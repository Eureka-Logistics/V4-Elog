import create from 'zustand';
import axios from 'axios';
import { BaseUrlRace } from '../../../../../Api/BaseUrl';
import {
    Button,
    Card,
    Col,
    DatePicker,
    Input,
    Popconfirm,
    Row,
    Select,
    Table,
    Tag,
    notification,
} from "antd";
const ListReportKirimanZustand = create((set, get) => ({
    data: {
        GetData: [],
        total: 0,
        currentPage: 1,
        limit: 10,
    },
    KeyPencarianApi: "",
    tanggal: "",
    updatePagination: (newPage, newLimit) => {
        set(state => ({
            data: {
                ...state.data,
                currentPage: newPage,
                limit: newLimit || state.data.limit
            }
        }));
    },
    // Method to fetch data
    fetchData: async () => {
        const { currentPage, limit } = get().data;
        const KeyPencarianApi = get().KeyPencarianApi
        const tanggal = get().tanggal
        try {
            const respons = await axios.get(
                `${BaseUrlRace}sp/get-monitoring?page=${currentPage}&limit=${limit}&sekolahTujuan=${KeyPencarianApi}&tgl=${tanggal}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: localStorage.getItem("token"),
                    },
                }
            );
            console.log("responsedata", respons.data.data.totalData);
            set(state => ({
                data: {
                    ...state.data,
                    GetData: respons.data.data.order,
                    total: respons.data.data.totalData
                }
            }));
        } catch (error) {
            // Handle error
        }
    },
    functionUploadFoto: async (record, gambar) => {
        const fetchData = get().fetchData
        const DataForm = new FormData()
        DataForm.append('cover', gambar)
        DataForm.append('id', record?.idKendaraanStatus)
        try {
            const data = await axios.post(`${BaseUrlRace}sp/Approved-photo`, DataForm, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: localStorage.getItem("token"),
                },
            })
            notification.success({
                message: data.data.status.message
            })
            console.log(`data uploadfoto race`, data);
        } catch (error) {

        }
        await fetchData()
    },
    OptionStatus: async () => {
        const data = await axios.get(`${BaseUrlRace}sp/get-option-status`,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: localStorage.getItem("token"),
                },
            })
        console.log(data.data.data);
    },
    StatusDriverAcc: async (a, b) => {
        console.log(`log dari klik untuk post`, a);
        console.log(`log dari klik untuk post b `, b);
        get().OptionStatus();
        const body = {
            "id_kendaraan": a.idkendaraan,
            "no_polisi": a.nopol,
            "id_pengemudi": a.driverId,
            "nama_driver": a.driver,
            "id_msm": a.idMsm,
            "action": b.statusId, //id status
            "empty_load": b.status,// status nya apa
            "keterangan": b.keterangan,// keterangan status
            "customer": a.customer,
            "posisi": "",// sring kosong
            "longitude": "106.821810",
            "latitude": "-6.193125",
            "tujuan": a.destination
        }
        const data = await axios.post(`${BaseUrlRace}sp/add-status-driver`, body,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: localStorage.getItem("token"),
                },
            })
        notification.success({
            message: "Sukses",
            description: data.data.status.message,
        })
        console.log(data.data.status.message);
        get().fetchData()
    },

}));

export default ListReportKirimanZustand;
