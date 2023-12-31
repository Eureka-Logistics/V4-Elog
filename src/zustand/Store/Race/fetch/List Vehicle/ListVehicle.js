import { create } from "zustand";
import { BaseUrlRace } from "../../../../../Api/BaseUrl";
import axios from "axios";
import { notification } from "antd";

export const ListVehicleZustand = create((set, get) => ({
    keyword: "",
    loading: false,
    ListVehicle: "",
    DetailVehicle: "",
    OptionsSelectType: "",
    selectGetSelect: "",
    codeVehicle: "",
    vehicleId: null,
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

            // console.log(`Data diterima dari API:`, response.data.data);
            set({ ListVehicle: response.data.data });
        } catch (error) {
            console.error('Error saat request API:', error);
        }
    },
    VehicleDetail: async (id) => {
        try {
            const keyword = get().keyword;
            console.log(`Keyword saat ini:`, keyword);

            const response = await axios.get(`${BaseUrlRace}kendaraan/get-vehicle-detail?id=${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: localStorage.getItem("token"),
                },
            });
            set({ DetailVehicle: response.data.data?.[0] })
            console.log(`Data diterima dari API:`, response.data.data[0]);
        } catch (error) {
            console.error('Error saat request API:', error);
        }
    },
    VehicleType: async (id) => {
        try {
            const keyword = get().keyword;
            console.log(`Keyword saat ini:`, keyword);

            const response = await axios.get(`${BaseUrlRace}kendaraan/get-type?keyword=`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: localStorage.getItem("token"),
                },
            });
            set({ OptionsSelectType: response.data?.data?.order });
        } catch (error) {
            console.error('Error saat request API:', error);
        }
    },
    GetSelect: async (id) => {
        try {

            const response = await axios.get(`${BaseUrlRace}kendaraan/get-select?vehicleType=${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: localStorage.getItem("token"),
                },
            });
            console.log(response.data.data);
            set({ codeVehicle: response.data.data.code, selectGetSelect: response.data?.data })
        } catch (error) {
            console.error('Error saat request API:', error);
        }
    },
    EditDriver: async (id, DetailVehicle) => {
        set({ loading: true })
        const update = get().FetchDriver
        const uploadgambar = get().UploadFoto
        const body = {
            "id": id,
            "kode_kendaraan": DetailVehicle?.kode_kendaraan,
            "no_polisi": DetailVehicle?.policeNumber,
            "vendor": DetailVehicle?.vendor,
            "jenis_kendaraan": DetailVehicle?.vehicleType,
            "jenis_kepemilikan": DetailVehicle?.jenisKepemilikan,
            "merk_mobil": DetailVehicle?.vehicleMerk,
            "tahun_mobil": DetailVehicle?.vehicleYear,
            "warna_plat": DetailVehicle?.platColor,
            "tgl_beli": DetailVehicle?.buyDate,
            "tgl_kir": DetailVehicle?.stnkDate,
            "tgl_plat_nomor": DetailVehicle?.expiredPlat,
            "panjang": DetailVehicle?.vehicleLength,
            "lebar": DetailVehicle?.vehicleWidth,
            "tinggi": DetailVehicle?.vehicleHeight,
            "no_bpkb": DetailVehicle?.bpkbNumber,
            "stnk": DetailVehicle?.expiredPlat,
            "tgl_stnk": DetailVehicle?.stnkDate,
            "kapasitas": DetailVehicle?.capacity,
            "kapasitas_maks": DetailVehicle?.maxCapacity,
            "kubikasi": DetailVehicle?.vehicleCubication,
    


        }
        try {
            uploadgambar(id, DetailVehicle)
            const response = await axios.post(`${BaseUrlRace}kendaraan/edit-vehicle`, body, {
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
        update()
        set({ loading: false })
    },
    UploadFoto: async (id, DetailVehicle) => {
        let formData = new FormData();
        formData.append("id", id);
        formData.append("cover", DetailVehicle?.naruhgambar);


        try {
            const response = await axios.post(`${BaseUrlRace}kendaraan/upload-vehicle-photo`, formData, {
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
    BuatDriver: async (DetailVehicle) => {
        if (!DetailVehicle.cabang) {
            notification.error({
                message: "Cabang Harus Diisi"
            })
        }
        set({ loading: true })
        const update = get().FetchDriver
        let formData = new FormData();
        formData.append("cover", DetailVehicle?.naruhgambar);
        formData.append("id_driver", DetailVehicle?.driverIDName);
        formData.append("id_bu_brench", DetailVehicle?.cabang);
        formData.append("kode_kendaraan", DetailVehicle?.kode_kendaraan);
        formData.append("no_polisi", DetailVehicle?.policeNumber);
        formData.append("vendor", DetailVehicle?.vendor);
        formData.append("jenis_kendaraan", DetailVehicle?.vehicleType);
        formData.append("merk_mobil", DetailVehicle?.vehicleMerk);
        formData.append("tahun_mobil", DetailVehicle?.vehicleYear);
        formData.append("warna_plat", DetailVehicle?.platColor);
        formData.append("tgl_beli", DetailVehicle?.buyDate);
        formData.append("panjang", DetailVehicle?.vehicleLength);
        formData.append("lebar", DetailVehicle?.vehicleWidth);
        formData.append("tinggi", DetailVehicle?.vehicleHeight);
        formData.append("no_bpkb", DetailVehicle?.bpkbNumber);
        formData.append("stnk", DetailVehicle?.expiredPlat);
        formData.append("tgl_stnk", DetailVehicle?.stnkDate);
        formData.append("tgl_kir", DetailVehicle?.stnkDate);
        formData.append("tgl_plat_nomor", DetailVehicle?.expiredPlat);
        formData.append("jenis_kepemilikan", DetailVehicle?.jenisKepemilikan);
        formData.append("kapasitas", DetailVehicle?.capacity);
        formData.append("kapasitas_maks", DetailVehicle?.maxCapacity);
        formData.append("kubikasi", DetailVehicle?.vehicleLength || 1 * DetailVehicle?.vehicleWidth || 1 * DetailVehicle?.vehicleHeight || 1);
        formData.append("location", DetailVehicle?.location);
        formData.append("id_mitra", DetailVehicle?.id_mitra);
        try {
            const response = await axios.post(`${BaseUrlRace}kendaraan/create-vehicle`, formData, {
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
        update()
    }
}));
