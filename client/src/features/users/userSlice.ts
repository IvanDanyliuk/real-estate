import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.currentUser = action.payload;
    },
    signOut: (state) => {
      state.currentUser = null;
    },
  },
});

export const { setUser, signOut } = userSlice.actions;
export default userSlice.reducer;