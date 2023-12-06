import create from 'zustand';
import axios from 'axios';
import { BaseUrlRace } from '../../../../../Api/BaseUrl';
import { notification } from 'antd';

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
    BuatVehicle: async (DetailVehicle) => {
        let formData = new FormData();
        formData.append("cover", DetailVehicle?.driverIDName);
        formData.append("nama", DetailVehicle?.driverName);
        formData.append("divisi", DetailVehicle?.kode_kendaraan);
        formData.append("no_ktp", DetailVehicle?.driverKtp);
        formData.append("no_sim", DetailVehicle?.numberSim);
        formData.append("vehicle_type", DetailVehicle?.vehicleType);
        formData.append("jenis_sim", DetailVehicle?.simType);
        formData.append("alamat", DetailVehicle?.driverAddress);
        formData.append("tgl_lahir", DetailVehicle?.dateBirth);
        formData.append("tgl_sim", DetailVehicle?.simDate);
        formData.append("agama", DetailVehicle?.driverReligion);
        formData.append("notelp", DetailVehicle?.noTelp1);
        formData.append("no_telp2", DetailVehicle?.noTelp2);
        formData.append("tgl_masuk", DetailVehicle?.bpkbNumber);
        formData.append("nik", DetailVehicle?.nik);
        formData.append("email", DetailVehicle?.driverEmail);
        formData.append("jenis_kepemilikan", DetailVehicle?.jenisKepemilikan);
        try {
            const response = await axios.post(`${BaseUrlRace}driver/create-driver`, formData, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: localStorage.getItem("token"),
                },
            });
            notification.success({
                message: "Sukses",
                description: response?.data.status.message
            })
            console.log(`Data diterima dari API:`, response?.data.status.message);
        } catch (error) {
            notification.error({
                message: "Error",
                description: error.response.data.status.message
            })
        }
    },
    EditVehicle: async (DriverID, DetailDriver) => {
        const getList = get().FetchDriver
        const body = {
            cover: DetailDriver?.driverIDName,
            nama: DetailDriver?.driverName,
            divisi: DetailDriver?.kode_kendaraan,
            no_ktp: DetailDriver?.driverKtp,
            no_sim: DetailDriver?.numberSim,
            vehicle_type: DetailDriver?.vehicleType,
            jenis_sim: DetailDriver?.simType,
            alamat: DetailDriver?.driverAddress,
            tgl_lahir: DetailDriver?.dateBirth,
            tgl_sim: DetailDriver?.simDate,
            agama: DetailDriver?.driverReligion,
            notelp: DetailDriver?.noTelp1,
            no_telp2: DetailDriver?.noTelp2,
            tgl_masuk: DetailDriver?.bpkbNumber,
            nik: DetailDriver?.nik,
            email: DetailDriver?.driverEmail,
            jenis_kepemilikan: DetailDriver?.jenisKepemilikan,
            id: DriverID
        };
        try {
            const response = await axios.post(`${BaseUrlRace}driver/update-driver`, body, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: localStorage.getItem("token"),
                },
            });
            notification.success({
                message: "Sukses",
                description: response?.data.status.message
            })
            console.log(`Data diterima dari API:`, response?.data.status.message);
        } catch (error) {
            notification.error({
                message: "Error",
                description: error.response.data.status.message
            })
        }
        getList()
    }
}));

export default ListDriverZustand;
