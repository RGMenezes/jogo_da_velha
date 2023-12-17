import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface User{
  email?: string
  userName?: string
  _id?: string
}

export interface UserData{
  email: string
  userName: string
  _id: string
}

const initialState: User = {
  email: undefined,
  userName: undefined,
  _id: undefined
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers:{
    login: (state, action: PayloadAction<User>) => {
      state.userName = action.payload.userName
      state.email = action.payload.email
      state._id = action.payload._id
    },
    logout: (state) => {
      state.userName = undefined
      state.email = undefined
      state._id = undefined
    }
  }
})

export const {
  login,
  logout
} = userSlice.actions

export default userSlice.reducer