import create from 'zustand';
import axios from 'axios'; // <-- Jangan lupa untuk mengimpor axios
import Baseurl from '../../../Api/BaseUrl';

const MapsDetailSM = create((set) => ({
    dataapi: null,
    setData: async (id) => {
        try {
            const data = await axios.get(`${Baseurl}sm/get-sm-detail?id_mpd=&id_msm=${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: localStorage.getItem("token"),
                },
            });
            set({ dataapi: data.data.data?.[0] });
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    },
}));

export default MapsDetailSM;
