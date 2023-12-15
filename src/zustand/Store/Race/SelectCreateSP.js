import create from 'zustand';
import axios from 'axios';
import { BaseUrlRace } from '../../../Api/BaseUrl';

const CreateSPRace = create((set) => ({

    SelectCreateSPRace: "",

    setSelectCreateSPRace: async () => {
        try {
            const data = await axios.get(`${BaseUrlRace}sp/get-select-sp?noref=`,
                {
                    headers: {
                        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjksInVzZXJuYW1lIjoicmFjZWFkbWluIiwiZnVsbG5hbWUiOiJJbmRhaCBNdXJ0aW5pbmdzaWgiLCJqb2JkZXNrIjoicmFqYWNlcGF0IiwiaWF0IjoxNjk4MzM3Mzg2LCJleHAiOjE2OTg0MjM3ODZ9.G3wsj2FXma8aAISzJbzhqmnrWs6DSOYDgHrF7RMsQS0',
                        "Content-Type": "application/json",
                        // Authorization: localStorage.getItem("token"),
                    },
                }
            );
            set({ SelectCreateSPRace: data.data });
        } catch (error) {
            console.error(error);
        }
    },

}));

export default CreateSPRace;
