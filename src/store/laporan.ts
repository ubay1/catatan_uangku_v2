import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
  jenis_laporan: '',
}

// Slice
const laporanTransaksiSlice = createSlice({
  name: 'laporanTransaksi',
  initialState,
  reducers: {
    setJenisLaporan(state, action: PayloadAction<{jenis_laporan: string}>) {
      state.jenis_laporan = action.payload.jenis_laporan
    }
  },
});

// Actions
export const { setJenisLaporan } = laporanTransaksiSlice.actions
export default laporanTransaksiSlice.reducer