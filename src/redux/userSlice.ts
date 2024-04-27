import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: '',
  email: '',
  userType: '', // 'system' or 'organization'
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      const { name, email, userType } = action.payload;
      state.name = name;
      state.email = email;
      state.userType = userType;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.name = '';
      state.email = '';
      state.userType = '';
      state.isAuthenticated = false;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;