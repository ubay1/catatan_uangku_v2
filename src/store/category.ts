import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  data: [],
};

// Slice
const categorySlice = createSlice({
  name: 'laporanTransaksi',
  initialState,
  reducers: {
    setCategory(state, action: PayloadAction<{data: any}>) {
      state.data = action.payload.data;
    },
  },
});

// Actions
export const { setCategory } = categorySlice.actions;
export default categorySlice.reducer;
