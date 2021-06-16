import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
  isLoading: true,
  name: '',
}

// Slice
const appIntroSlice = createSlice({
  name: 'name',
  initialState,
  reducers: {
    setUserName(state, action: PayloadAction<{name: string}>) {
      state.name = action.payload.name,
      state.isLoading = false
    }
  },
});

// Actions
export const { setUserName } = appIntroSlice.actions
export default appIntroSlice.reducer