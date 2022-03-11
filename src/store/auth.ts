/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isLoading?: boolean, isSignout?: boolean, token?: string
}

const initialState: AuthState = {
  isLoading: true,
  isSignout: false,
  token: '',
};

// Slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    RESTORE_TOKEN(state, action: PayloadAction<{isLoading?: any, token?: any}>) {
      state.token = action.payload.token;
      state.isLoading = false;
    },
    SIGN_IN(state, action: PayloadAction<{isSignOut?: any, token?: any}>) {
      state.isSignout = false;
      state.token = action.payload.token;
    },
    SIGN_OUT(state, action: PayloadAction<{isSignOut?: any, token?: any}>) {
      state.isSignout = true;
      state.token = 'null';
    },
  },
});

// Actions
export const { RESTORE_TOKEN,SIGN_IN,SIGN_OUT } = authSlice.actions;
export default authSlice.reducer;
