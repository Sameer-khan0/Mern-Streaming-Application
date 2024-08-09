import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { HOST, REGISTER_USER, LOGIN_USER, UPDATE_USER, GET_USER, LOGOUT_USER } from "../../Apis";

// Define the action type and thunk for registering a user
export const RegisterUser = createAsyncThunk(
  "user/register",
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post(HOST + REGISTER_USER, userData);
      if(response.status===400) return {message:"User Already exist"}
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Define the action type and thunk for logging in a user
export const LoginUser = createAsyncThunk(
  "user/login",
  async (credentials, thunkAPI) => {
    try {
      const response = await axios.post(HOST + LOGIN_USER, credentials);
      console.log(response)
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Define the action type and thunk for updating a user
export const UpdateUser = createAsyncThunk(
  "user/update",
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post(HOST + UPDATE_USER, userData, {
        headers: {
          token: localStorage.getItem("atoken"),
        },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Define the action type and thunk for fetching user data
export const GetUser = createAsyncThunk(
  "user/get",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(HOST + GET_USER, {
        headers: {
          token: localStorage.getItem("atoken"),
        },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Define the action type and thunk for logging out a user
export const LogoutUser = createAsyncThunk(
  "user/logout",
  async (_, thunkAPI) => {
    try {
      const response = await axios.post(HOST + LOGOUT_USER, {}, {
        headers: {
          token: localStorage.getItem("atoken"),
        },
      });
      // Clear the token from local storage
      localStorage.removeItem("atoken");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
