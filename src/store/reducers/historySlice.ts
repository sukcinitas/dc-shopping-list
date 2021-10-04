import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import type { RootState } from '../index';
import api from '../../api';

interface HistoryState {
    lists: Array<{
        id: number;
        name: string;
        state: string;
        updated_at: string;
    }>;
    status: string;
    error: string;
}

const initialState: HistoryState = {
    lists: [],
    error: '',
    status: 'idle', // loading | idle
};

// thunks
export const getLists = createAsyncThunk('products/loadLists', async () => {
    const response: any = await api.getLists();
    return response.filter((list: any) => list.state !== 'active');
});

export const historySlice = createSlice({
    name: 'history',
    initialState,
    reducers: {
        changeErrorMessage: (state) => {
            return {
                ...state,
                error: '',
            }
        },
    },
    extraReducers: builder => {
        builder
            .addCase(getLists.pending, (state) => {
                return {...state, status: 'loading'}
            })
            .addCase(getLists.fulfilled, (state, action) => {
                return {...state, status: 'idle', error: '', lists: action.payload }
            })
            .addCase(getLists.rejected, (state) => {
                return {...state, status: 'idle', error: 'Something went wrong! Try again later!' }
            })
    },
});

// need to get list sorted by recent date

const monthsMap = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
export const selectListsByDate = ({ history: { lists }}: RootState) => {
    const map: {[key: string]: Array<{
        id: number;
        name: string;
        state: string;
        updated_at: string;
    }>;} = {};

    for (let i = 0; i < lists.length; i++) {
        const date =  new Date(lists[i].updated_at);
        const dateByMonth = `${date.getFullYear()} ${monthsMap[date.getMonth()]}`;
        if (dateByMonth in map) {
            map[dateByMonth] = [...map[dateByMonth], lists[i]];
        } else {
            map[dateByMonth] = [lists[i]];
        }
    }
    return map;
};

export const { changeErrorMessage } = historySlice.actions;

export const selectState = ({ history: { status }}: RootState) => status;

export const selectError = ({ history: { error }}: RootState) => error;

export default historySlice.reducer;