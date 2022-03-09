import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  data: [],
  totalSaldo: 0,
  totalSaldoPemasukan: 0,
  totalSaldoPengeluaran: 0,
};

// Slice
const appListNoteSlice = createSlice({
  name: 'listNote',
  initialState,
  reducers: {
    setListNote(state, action: PayloadAction<{data: any}>) {
      state.data = action.payload.data;
    },
    setTotalSaldo(state, action: PayloadAction<{totalSaldo: number}>) {
      state.totalSaldo = action.payload.totalSaldo;
    },
    setTotalSaldoPemasukan(state, action: PayloadAction<{totalSaldoPemasukan: number}>) {
      state.totalSaldoPemasukan = action.payload.totalSaldoPemasukan;
    },
    setTotalSaldoPengeluaran(state, action: PayloadAction<{totalSaldoPengeluaran: number}>) {
      state.totalSaldoPengeluaran = action.payload.totalSaldoPengeluaran;
    },
  },
});

// Actions
export const { setListNote, setTotalSaldo, setTotalSaldoPemasukan, setTotalSaldoPengeluaran } = appListNoteSlice.actions;
export default appListNoteSlice.reducer;
