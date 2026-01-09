import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface UserProfile {
  username: string
  email: string
  [key: string]: unknown
}

interface AuthState {
  token: string | null
  user: UserProfile | null
}

const initialState: AuthState = {
  token: null,
  user: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ user: UserProfile; token: string }>
    ) => {
      state.user = action.payload.user
      state.token = action.payload.token
    },
    logout: (state) => {
      state.user = null
      state.token = null
    },
  },
})

export const { setCredentials, logout } = authSlice.actions
export default authSlice.reducer
