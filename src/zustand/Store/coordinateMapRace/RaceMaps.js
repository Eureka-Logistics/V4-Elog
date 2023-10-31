// store.js
import create from 'zustand';

const useCoordinateRaceMap = create(set => ({
    Coordinate: [],
    JarakDanWaktu: [],
    setCoordinate: (data) => set(state => ({ Coordinate: data })),
    setJarakDanWaktu: (data) => set(state => ({ JarakDanWaktu: data })),
}));
export default useCoordinateRaceMap;
