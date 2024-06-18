import { jwtDecode } from "jwt-decode";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// const HOSTNAME = process.env.REACT_APP_BACKENDHOSTNAME;
const HOSTNAME = "http://localhost:8000";

export const createDriverAsync = createAsyncThunk(
  "driver/createUser",
  async ({ email, fullName, password, userType, latitude, longitude }) => {
    try {
      // console.log(`${HOSTNAME}/api/signUp/`);
      const response = await axios.post(`${HOSTNAME}/driverAuth/signUp/`, {
        email,
        fullName,
        password,
        latitude,
        longitude,
      });
      // console.log(" resopnse data " , response.data );
      return response.data;
    } catch (error) {
      // console.log("createUserAsync Error - ", error.response);
    }
  }
);

export const loginDriverAsync = createAsyncThunk(
  "driver/loginUser",
  async ({ email, password }) => {
    try {
      const response = await axios.post(`${HOSTNAME}/driverAuth/login/`, {
        email: email,
        password: password,
      });
      // console.log( response.data );
      return response.data;
    } catch (error) {
      // console.log("loginUserAsync Error  ", error.response);
    }
  }
);

const initialState = {
  data: [],
  isLoading: false,
  isError: false,
  loggedData: {
    isUserLogged:
      localStorage.getItem("loggedDriverToken") !== null
        ? jwtDecode(localStorage.getItem("loggedDriverToken")).isUserLogged
        : null,
    id:
      localStorage.getItem("loggedDriverToken") !== null
        ? jwtDecode(localStorage.getItem("loggedDriverToken")).id
        : null,
    fullName:
      localStorage.getItem("loggedDriverToken") !== null
        ? jwtDecode(localStorage.getItem("loggedDriverToken")).fullName
        : null,
    email:
      localStorage.getItem("loggedDriverToken") !== null
        ? jwtDecode(localStorage.getItem("loggedDriverToken")).email
        : null,
    isAvailable:
      localStorage.getItem("loggedDriverToken") !== null
        ? jwtDecode(localStorage.getItem("loggedDriverToken")).isAvailable
        : null,
    latitude:
      localStorage.getItem("loggedDriverToken") !== null
        ? jwtDecode(localStorage.getItem("loggedDriverToken")).latitude
        : null,
    longitude:
      localStorage.getItem("loggedDriverToken") !== null
        ? jwtDecode(localStorage.getItem("loggedDriverToken")).longitude
        : null,
  },
};

export const driverAuthSlice = createSlice({
  name: "drivers",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(createDriverAsync.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(createDriverAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })

      .addCase(createDriverAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })

      .addCase(loginDriverAsync.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(loginDriverAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })

      .addCase(loginDriverAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export default driverAuthSlice.reducer;
