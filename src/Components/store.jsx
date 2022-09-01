import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./UserSlice1";
import networksReducer from './NetworksSlice'
export default configureStore({
  reducer: {
    users: usersReducer,
    networks:networksReducer,
  },
});
