import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getCategories } from '../../api/api';

export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getCategories();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const categoriesSlice = createSlice({
  name: 'categories',
  initialState: {
    items: [],
    activeCategory: null,
    loading: false,
    error: null,
  },
  reducers: {
    setActiveCategory(state, action) {
      console.log('🔴 setActiveCategory called with:', action.payload);
      state.activeCategory = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.map(cat => ({
          id: cat.id,
          name: cat.title,
        }));
        state.items.unshift({ id: 0, name: 'Все' });
        if (state.activeCategory === null) {
          state.activeCategory = 0;
        }
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setActiveCategory } = categoriesSlice.actions;
export default categoriesSlice.reducer;