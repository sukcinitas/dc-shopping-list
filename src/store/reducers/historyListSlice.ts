import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../index';

interface HistoryListState {
    list: {
        id: string;
        name: string;
        created_at: string;
        status: string;
        items: Array<{
            id: number;
            name: string;
            description: string;
            url: string;
            category: string;
        }>
    };
    status: string;
    error: string;
}

const initialState: HistoryListState = {
    list: {
        id: '10',
        name: 'Pirmasis',
        created_at: '2020-02-04',
        status: 'completed',
        items: [{ id: 1, name: 'Pork with something', description: '', url: '', category: 'Meats' }, { id: 2, name: 'Salmon', description: '', url: '', category: 'Fish' }]

    },
    status: 'loading',
    error: '',
}

export const historyListSlice = createSlice({
    name: 'historyList',
    initialState,
    reducers: {}
});

export const selectItemsByCategories = ( { historyList: { list: { items } }}: RootState) => {
    const map: {[key: string]: Array<{
        id: number;
        name: string;
        description: string;
        url: string;
        category: string;
    }>;} = {};
    for (let i = 0; i < items.length; i++) {
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

export const {  } = historyListSlice.actions;

export default historyListSlice.reducer;