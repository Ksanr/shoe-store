import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getTopSales } from '../../api/api';

export const fetchTopSales = createAsyncThunk(
  'topSales/fetchTopSales',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getTopSales();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const topSalesSlice = createSlice({
  name: 'topSales',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTopSales.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTopSales.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchTopSales.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default topSalesSlice.reducer;