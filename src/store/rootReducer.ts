import { combineReducers } from "@reduxjs/toolkit";
import moviesSlice from "./moviesSlice";

const createReducer = combineReducers({
  moviesSlice,
});

export default createReducer;
