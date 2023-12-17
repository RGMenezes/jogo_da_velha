import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface Tool{
  loading: boolean
}

const initialState: Tool = {
  loading: false
}

const toolSlice = createSlice({
  name: 'tool',
  initialState,
  reducers: {
    handleLoading: (state, action: PayloadAction<Tool>) => {
      state.loading = action.payload.loading
    }
  }
})

export const {
  handleLoading
} = toolSlice.actions

export default toolSlice.reducer