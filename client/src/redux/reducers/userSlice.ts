import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: null,
  name: null,
  email: null,
  imageUrl: null,
  role: null,
  userProfile: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { userInfo } = action.payload;

      state = userInfo;
    },
    clearUser: (state) => {
      state = initialState;
    },
  },
});

export default userSlice.reducer;

export const { setUser, clearUser } = userSlice.actions;
