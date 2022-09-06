import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../types/user";
import storage from "../utils/storage";


// 用户token
export const ACCESS_TOKEN_KEY = 'ACCESS_TOKEN';

const initialState = {
  token: storage.get(ACCESS_TOKEN_KEY),
  userInfo: {}
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      
      state.token = action.payload
      
      storage.set(ACCESS_TOKEN_KEY, action.payload)
    },
    setUserInfo: (state, action: PayloadAction<IUser>) => {
      state.userInfo = action.payload
    }
  }
});

export const { setToken, setUserInfo } = userSlice.actions;
export default userSlice.reducer
