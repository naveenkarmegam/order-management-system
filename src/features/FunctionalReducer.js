import { createSlice } from "@reduxjs/toolkit";

export const FunctionalSlice = createSlice({
  name: "funactionality",
  initialState: {
    sideBarToggle: true,
    profileEditMode: false,
    searchInput: "",
    greetings: "",
  },
  reducers: {
    setProfileEditMode: (state, action) => {
      state.profileEditMode = action.payload;
      return state;
    },
    setSideBarToggle: (state, action) => {
      state.sideBarToggle = action.payload;
      return state;
    },
    setSearchInput: (state, action) => {
      state.searchInput = action.payload;
      return state;
    },
    setGreetings: (state, action) => {
      state.greetings = action.payload;
      return state;
    },
  },
});

export const {
  sideBarToggle,
  setSideBarToggle,
  setProfileEditMode,
  setSearchInput,
  setGreetings,
} = FunctionalSlice.actions;
export default FunctionalSlice.reducer;
