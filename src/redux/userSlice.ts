import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: '',
  name: '',
  email: '',
  userType: '', // 'system' or 'organization'
  organisation_id: '',
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      const { id, name, email, userType, organisation_id } = action.payload;
      state.id = id,
      state.name = name;
      state.email = email;
      state.userType = userType;
      state.organisation_id = organisation_id
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.id = '',
      state.name = '';
      state.email = '';
      state.userType = '';
      state.organisation_id = '',
      state.isAuthenticated = false;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;