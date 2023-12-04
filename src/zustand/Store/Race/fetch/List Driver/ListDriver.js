import create from 'zustand';
import axios from 'axios';
import { BaseUrlRace } from '../../../../../Api/BaseUrl';

const ListDriverZustand = create((set) => ({

    Driver: "",
    ListDriver: "",
    DetailDriver: "",
    DriverID: null,
    FetchDriver: async () => {
        try {
            const data = await axios.get(`${BaseUrlRace}driver/get-driver?limit=10&page=1&keyword=&jenisKepemilikan=&status=`,
                {
                    headers: {
                        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjksInVzZXJuYW1lIjoicmFjZWFkbWluIiwiZnVsbG5hbWUiOiJJbmRhaCBNdXJ0aW5pbmdzaWgiLCJqb2JkZXNrIjoicmFqYWNlcGF0IiwiaWF0IjoxNjk4MzM3Mzg2LCJleHAiOjE2OTg0MjM3ODZ9.G3wsj2FXma8aAISzJbzhqmnrWs6DSOYDgHrF7RMsQS0',
                        "Content-Type": "application/json",
                        Authorization: localStorage.getItem("token"),
                    },
                }
            );
            set({ ListDriver: data?.data?.data });
        } catch (error) {
            console.error(error);
        }
    },
    FetchDetailDriver: async (id) => {
        try {
            const data = await axios.get(`${BaseUrlRace}driver/get-driver-detail?id=${id}`,
                {
                    headers: {
                        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjksInVzZXJuYW1lIjoicmFjZWFkbWluIiwiZnVsbG5hbWUiOiJJbmRhaCBNdXJ0aW5pbmdzaWgiLCJqb2JkZXNrIjoicmFqYWNlcGF0IiwiaWF0IjoxNjk4MzM3Mzg2LCJleHAiOjE2OTg0MjM3ODZ9.G3wsj2FXma8aAISzJbzhqmnrWs6DSOYDgHrF7RMsQS0',
                        "Content-Type": "application/json",
                        Authorization: localStorage.getItem("token"),
                    },
                }
            ); set({ DetailDriver: data?.data?.data?.[0] })
        } catch (error) {
            console.error(error);
        }
    },

}));

export default ListDriverZustand;
