import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface AuthState { 
  isLoading?: boolean, isSignout?: boolean, gotek?: string 
}

const initialState: AuthState = {
  isLoading: true,
  isSignout: false,
  gotek: 'null',
}

// Slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    RESTORE_TOKEN(state, action: PayloadAction<{isLoading?: any, gotek?: any}>) {
      state.gotek = action.payload.gotek,
      state.isLoading = false
    },
    SIGN_IN(state, action: PayloadAction<{isSignOut?: any, gotek?: any}>) {
      state.isSignout = false,
      state.gotek = action.payload.gotek
    },
    SIGN_OUT(state, action: PayloadAction<{isSignOut?: any, gotek?: any}>) {
      state.isSignout = true,
      state.gotek = 'null'
    },
  },
});

// Actions
export const { RESTORE_TOKEN,SIGN_IN,SIGN_OUT } = authSlice.actions
export default authSlice.reducer