import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
  introFinish: false,
}

// Slice
const appIntroSlice = createSlice({
  name: 'intro',
  initialState,
  reducers: {
    setIntroFinish(state, action: PayloadAction<{introFinish: boolean}>) {
      state.introFinish = action.payload.introFinish
    }
  },
});

// Actions
export const { setIntroFinish } = appIntroSlice.actions
export default appIntroSlice.reducer