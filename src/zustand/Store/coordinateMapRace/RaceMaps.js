// store.js
import create from 'zustand';

const useCoordinateRaceMap = create(set => ({
    Coordinate: [],
    JarakDanWaktu: [],
    AmbilCoordinates: [],
    AlamatDetailCustomer: "",
    lattitudemap: "",
    longtitudemap: "",
    setCoordinate: (data) => set(state => ({ Coordinate: data })),
    setJarakDanWaktu: (data) => set(state => ({ JarakDanWaktu: data })),
    setLatLong: (lat, lng) => set({ lattitudemap: lat, longtitudemap: lng }),
}));
export default useCoordinateRaceMap;
