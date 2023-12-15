// store.js
import create from 'zustand';

const MappingCoordinate = create(set => ({
    Coordinate: "",
    setCoordinate: (data) => set(state => ({ Coordinate: data })),
}));
export default MappingCoordinate;
