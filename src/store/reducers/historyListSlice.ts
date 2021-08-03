import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import type { RootState } from '../index';
import api from '../../api';

interface HistoryListState {
    list: {
        id: number;
        name: string;
        created_at: string;
        state: string;
        items: Array<{
            id: number;
            name: string;
            description: string;
            url: string;
            category: string;
            completed: boolean;
            pieces: number;
        }>
    };
    status: string;
    error: string;
}

const initialState: HistoryListState = {
    list: {
        id: 0,
        name: '',
        created_at: '',
        state: '',
        items: []
    },
    status: 'idle',
    error: '',
}

// thunks
export const getList = createAsyncThunk('products/loadList', async (id: number) => {
    const response: any = await api.getList(id);
    return response;
});

export const historyListSlice = createSlice({
    name: 'historyList',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getList.fulfilled, (state, action) => {
                return {...state, status: 'idle', error: '', list: action.payload }
            })
            .addCase(getList.pending, (state) => {
                return {...state, status: 'loading'}
            })
            .addCase(getList.rejected, (state) => {
                return {...state, status: 'idle', error: 'Something went wrong!' }
            })
    },
});

export const selectItemsByCategories = ( { historyList: { list: { items } }}: RootState) => {
    const map: {[key: string]: Array<{
        id: number;
        name: string;
        description: string;
        url: string;
        category: string;
    }>;} = {};
    if (!items) {
        return {};
    }
    for (let i = 0; i < items.length; i++) {
        if (!items[i].completed) continue;
        if (items[i].category in map) {
            map[items[i].category] = [...map[items[i].category], items[i]];
        } else {
            map[items[i].category] = [items[i]];
        }
    }
    return map;
};

export const selectListName = (state: RootState) => state.historyList.list.name;

export const selectListDate = (state: RootState) => state.historyList.list.created_at;

export const selectState = ({ historyList: { status }}: RootState) => status;

export const {  } = historyListSlice.actions;

export default historyListSlice.reducer;