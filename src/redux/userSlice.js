import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    searchResults: [],
    searchQuery: "",
    editUserData: null,
  },
  reducers: {
    setUsers: (state, { payload }) => {
      state.users = payload;
    },
    searchUsers: (state, { payload }) => {
      state.searchUsers = state.users.filter(user =>
        user.name.toLowerCase().includes(payload.toLowerCase())
      );
    },
    searchQuery: (state, { payload }) => {
      state.searchQuery = payload;
    },
    editUserData: (state, { payload }) => {
      state.editUserData = payload;
    },
  },
});

export const { setUsers, searchUsers, searchQuery, editUserData } =
  userSlice.actions;

export default userSlice.reducer;
