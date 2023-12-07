import create from 'zustand';
import axios from 'axios';
import { BaseUrlRace } from '../../../../../Api/BaseUrl';
import { notification } from 'antd';

const ListDriverZustand = create((set, get) => ({
    loading: false,
    keyword: "",
    Driver: "",
    ListDriver: "",
    DetailDriver: "",
    filteroptionsjenisKepemilikanDanStatus: "",
    DriverID: null,
    OptionsGetSelect: "",
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
    FetchGetSelect: async (id) => {
        try {
            const data = await axios.get(`${BaseUrlRace}driver/get-select`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: localStorage.getItem("token"),
                    },
                }
            );
            set({ OptionsGetSelect: data.data })
            console.log(`data select`, data.data);
            // set({ DetailDriver: data?.data?.data?.[0] })
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
    BuatVehicle: async (DetailDriver) => {
        let formData = new FormData();
        formData.append("cover", DetailDriver?.naruhgambar);
        formData.append("nama", DetailDriver?.driverName);
        formData.append("divisi", DetailDriver?.kode_kendaraan);
        formData.append("no_ktp", DetailDriver?.driverKtp);
        formData.append("no_sim", DetailDriver?.numberSim);
        formData.append("vehicle_type", DetailDriver?.vehicleType);
        formData.append("jenis_sim", DetailDriver?.simType);
        formData.append("alamat", DetailDriver?.driverAddress);
        formData.append("tgl_lahir", DetailDriver?.dateBirth);
        formData.append("tgl_sim", DetailDriver?.simDate);
        formData.append("agama", DetailDriver?.driverReligion);
        formData.append("notelp", DetailDriver?.noTelp1);
        formData.append("no_telp2", DetailDriver?.noTelp2);
        formData.append("tgl_masuk", DetailDriver?.bpkbNumber);
        formData.append("nik", DetailDriver?.nik);
        formData.append("id_mitra", DetailDriver?.perusahaan);
        formData.append("email", DetailDriver?.driverEmail);
        formData.append("jenis_kepemilikan", DetailDriver?.jenisKepemilikan);
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
    UploadFoto: async (id, DetailDriver) => {
        let formData = new FormData();
        formData.append("id", id);
        formData.append("cover", DetailDriver?.naruhgambar);


        try {
            const response = await axios.post(`${BaseUrlRace}driver/upload-driver-photo`, formData, {
                headers: {
                    Authorization: localStorage.getItem("token"),
                },
            });

            console.log(response);
            // notification.success({
            //     message: "Sukses",
            //     description: response?.data.status.message
            // })
            // console.log(`Data diterima dari API:`, response?.data.status.message);
        } catch (error) {
            console.error("Upload error:", error.response?.data || error);
            // Add more error handling as needed
        }

    },
    EditVehicle: async (DriverID, DetailDriver) => {
        set({ loading: true })
        const getList = get().FetchDriver
        const UploadFoto = get().UploadFoto
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
            UploadFoto(DriverID, DetailDriver)
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
        set({ loading: false })
        getList()
    }
}));

export default ListDriverZustand;
