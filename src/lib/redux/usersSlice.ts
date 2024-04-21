import { createSlice } from '@reduxjs/toolkit';
import { User, Users } from '@/types/user';

export const usersSlice = createSlice({
  name: 'users',
  initialState: {
    users: [] as Users,
    searchResults: [] as Users,
    searchUsers: [] as Users,
    searchQuery: '',
    editUserData: null as User | null,
  },
  reducers: {
    setUsers: (state, { payload }) => {
      state.users = payload;
    },
    searchUsers: (state, { payload }) => {
      state.searchUsers = state.users.filter((user) =>
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
  usersSlice.actions;

export default usersSlice.reducer;
