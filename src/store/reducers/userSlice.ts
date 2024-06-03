import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../index';

interface UserState {
  user_id: number;
}

const initialState: UserState = {
  user_id: 1,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
});

export const selectUser = ({ user: { user_id } }: RootState) => user_id;

export const {} = userSlice.actions;

export default userSlice.reducer;
