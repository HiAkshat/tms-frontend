import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define initial state
const initialState = {
  organisations: [],
  status: 'idle',
  error: null,
};

// Define thunk to fetch organizations from the API
export const fetchOrganisations = createAsyncThunk(
  'http://localhost:8000/api/organisation',
  async () => {
    try {
      const response = await axios.get('/api/organisations'); // Replace '/api/organisations' with your actual API endpoint
      return response.data;
    } catch (error) {
      throw Error('Failed to fetch organisations');
    }
  }
);

// Create organisations slice
const organisationsSlice = createSlice({
  name: 'organisations',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrganisations.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchOrganisations.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.organisations = action.payload;
      })
      .addCase(fetchOrganisations.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

// Export actions and reducer
export default organisationsSlice.reducer;
