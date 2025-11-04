// files
import { axiosInstance } from "../utilities/utiles.js";
// packages
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// export const registerUser = async (signUpData) => {
//   const res = await axiosInstance.post("/users/signup", signUpData);
//   if (res.status === 201 || res.statusText === "Created" || res.statusText === "OK") {
//     return res.data;
//   }
//   throw new Error("Signup failed");
// };

// export const loginUser = async (loginData) => {
//   const res = await axiosInstance.post("/users/login", loginData);
//   if (res.status === 201 || res.statusText === "Created" || res.statusText === "OK") {
//     return res.data;
//   }
//   throw new Error("Login failed");
// };

// login user
// Thunk: login
export const loginUser = createAsyncThunk(
  "auth/login",
  async (loginData, { rejectWithValue }) => {
    try {
      const res = await api.post("/auth/login", loginData);
      return res.data; // { accessToken, user }
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Login failed");
    }
  }
);

// register
export const registerUser = createAsyncThunk("auth/register", async (data, thunkAPI) => {
  try {
    const res = await api.post("/auth/register", data);
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message);
  }
});

export const currentUser = createAsyncThunk(
  "auth/me",
  async (_, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState();
      const res = await axiosInstance.get("/auth/me", {
        headers: { Authorization: `Bearer ${auth.accessToken}` },
      });
      return res.data; // { user }
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Not authenticated");
    }
  }
);

// Thunk: refresh access token
// export const refreshToken = createAsyncThunk(
//   "auth/refresh",
//   async (_, { rejectWithValue }) => {
//     try {
//       const res = await api.post("/auth/refresh"); 
//       return res.data; // { accessToken }
//     } catch (err) {
//       return rejectWithValue("Session expired, please log in again");
//     }
//   }
// );