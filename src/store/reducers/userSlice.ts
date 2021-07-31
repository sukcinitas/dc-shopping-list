import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../index';

interface UserState {
    id: number;
}

const initialState: UserState = {
    id: 1,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {}
});

export const selectUser = ({ user: { id }}: RootState) => id;

export const {  } = userSlice.actions;

export default userSlice.reducer;