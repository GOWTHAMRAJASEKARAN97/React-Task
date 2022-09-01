import { createSlice } from "@reduxjs/toolkit";
const datas = [
  {
    id: "1234",
    network: "Airtel",
    discription: "123",
  },
  {
    id: "4321",
    network: "surya",
    discription: "123",
  },
];

const NetworksSlice = createSlice({
  name: "networks",
  initialState: {
    datas,
    loading: false,
  },
  reducers: {
    networkAdded(state, action) {
      state.datas.push(action.payload);
    },
    networkUpdated(state, action) {
      const { id, network, discription } = action.payload;
      const existingNetwork = state.datas.find((network) => network.id === id);
      if (existingNetwork) {
        existingNetwork.network = network;
        existingNetwork.discription = discription;
        existingNetwork.id = id;
        
      }
    },

    networkDeleted(state, action) {
      const { id } = action.payload;
      const existingNetwork = state.datas.find((network) => network.id === id);
      if (existingNetwork) {
        state.datas = state.datas.filter((network) => network.id !== id);
      }
    },
  },
});

export const { networkAdded, networkDeleted,networkUpdated } = NetworksSlice.actions;

export default NetworksSlice.reducer;
