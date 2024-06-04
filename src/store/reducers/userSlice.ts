import {
  createSlice,
  createAsyncThunk,
  ActionReducerMapBuilder,
} from "@reduxjs/toolkit";
import axios from "axios";

interface UserState {
  username: string | undefined;
  user_id: number | undefined;
}

const initialState: UserState = {
  username: undefined,
  user_id: undefined,
};

export const fetchUser = createAsyncThunk("users/fetchUser", async () => {
  const response = await axios.get("/api/users/login");
  if (response?.data?.username) {
    return response.data;
  } else {
    throw new Error("No user");
  }
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logoutCurrentUser: (state) => {
      state.username = undefined;
      state.user_id = undefined;
    },
    setCurrentUser: (state, action) => {
      const { username, user_id } = action.payload;
      state.username = username;
      state.user_id = user_id;
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<UserState>) => {
    builder
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.username = action.payload.username;
        state.user_id = action.payload.user_id;
      })
      .addCase(fetchUser.rejected, (state) => {
        state.username = undefined;
        state.user_id = undefined;
      });
  },
});

export const { setCurrentUser, logoutCurrentUser } = userSlice.actions;

export default userSlice.reducer;
