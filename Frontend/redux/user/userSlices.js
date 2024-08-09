import { createSlice } from '@reduxjs/toolkit';
import { RegisterUser, LoginUser, UpdateUser, GetUser, LogoutUser } from './userFunction';

const initialState = {
  userData: null,
  status: 'idle',
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(RegisterUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(RegisterUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.userData = action.payload;
      })
      .addCase(RegisterUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(LoginUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(LoginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.userData = action.payload;
      })
      .addCase(LoginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(UpdateUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(UpdateUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.userData = action.payload;
      })
      .addCase(UpdateUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(GetUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(GetUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.userData = action.payload;
      })
      .addCase(GetUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(LogoutUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(LogoutUser.fulfilled, (state) => {
        state.status = 'succeeded';
        state.userData = null;
      })
      .addCase(LogoutUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
