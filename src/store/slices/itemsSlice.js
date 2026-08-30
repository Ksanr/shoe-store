import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getItems } from '../../api/api';

// параметры: categoryId (null или число), offset, q (строка поиска)
export const fetchItems = createAsyncThunk(
  'items/fetchItems',
  async ({ categoryId = 0, offset = 0, q = '' }, { rejectWithValue }) => {
    try {
      const params = { offset };
      if (categoryId !== 0) params.categoryId = categoryId;
      if (q) params.q = q;
      const response = await getItems(params);
      return { items: response.data, offset, q };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const itemsSlice = createSlice({
  name: 'items',
  initialState: {
    items: [],
    loading: false,
    error: null,
    hasMore: true,
    offset: 0,
    q: '', // текущий поисковый запрос
    categoryId: 0,
  },
  reducers: {
    resetItems(state) {
      state.items = [];
      state.offset = 0;
      state.hasMore = true;
      state.error = null;
    },
    setSearchQuery(state, action) {
      state.q = action.payload;
      state.offset = 0;
      state.items = [];
      state.hasMore = true;
    },
    setCategory(state, action) {
      state.categoryId = action.payload;
      state.offset = 0;
      state.items = [];
      state.hasMore = true;
      state.q = ''; // при смене категории сбрасываем поиск
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.loading = false;
        const { items, offset, q } = action.payload;
        // Если это первый запрос (offset=0) или новый поиск, заменяем список
        if (offset === 0) {
          state.items = items;
        } else {
          state.items = [...state.items, ...items];
        }
        state.offset = offset + items.length;
        state.hasMore = items.length >= 6; // если меньше 6, значит больше нет
        state.q = q;
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetItems, setSearchQuery, setCategory } = itemsSlice.actions;
export default itemsSlice.reducer;