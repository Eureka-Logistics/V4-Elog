// store.js
import create from 'zustand';

const useCoordinateRaceMap = create(set => ({
    Coordinate: [],
    setCoordinate: (data) => set(state => ({ Coordinate: data })),
}));
export default useCoordinateRaceMap;
