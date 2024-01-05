import axios from "axios";
import { create } from "zustand";
import { parseString } from "xml2js";

export const GetCuacaBMKG = create((set) => ({
    setdata: "",
    FetchApiBMKG: async () => {
        try {
            const response = await axios.get('https://data.bmkg.go.id/DataMKG/MEWS/DigitalForecast/DigitalForecast-DKIJakarta.xml', {
                responseType: 'text'
            });
            parseString(response.data, (err, result) => {
                if (err) {
                    throw err;
                }

                // console.log("Dari BMKG:", result.data.forecast[0]);
                set({ setdata: result.data.forecast[0] })
            });

        } catch (error) {
            console.error("Error fetching or parsing data:", error);
        }
    }
}));
