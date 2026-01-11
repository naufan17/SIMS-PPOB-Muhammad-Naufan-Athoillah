import { createSlice } from '@reduxjs/toolkit'

interface UiState {
  showBalance: boolean;
}

const initialState: UiState = {
  showBalance: false,
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleShowBalance: (state) => {
      state.showBalance = !state.showBalance;
    },
    setShowBalance: (state, action: { payload: boolean }) => {
      state.showBalance = action.payload;
    },
  },
})

export const { toggleShowBalance, setShowBalance } = uiSlice.actions
export default uiSlice.reducer
