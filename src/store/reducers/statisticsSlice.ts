import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import type { RootState } from '../index';
import api from '../../api';

interface StatisticsState {
    status: string;
    error: string;
    monthlyStatistics: Array<{
        month: string;
        items: number;
    }>
    topItems: Array<{name: string; percent: number;}>,
    topCategories: Array<{name: string; percent: number;}>
}

const initialState: StatisticsState =  {
    monthlyStatistics: [],
    topItems: [],
    topCategories: [],
    error: '',
    status: 'loading', // loading | idle
};

// thunks
export const getStatisticsInfo = createAsyncThunk('products/getInfo', async () => {
    const monthlyStatistics: any = await api.getMontlyStatistics();
    const topItems: any = await api.getTopItems();
    const topCategories: any = await api.getTopCategories();
    return { monthlyStatistics, topItems, topCategories };
});

export const statisticsSlice = createSlice({
    name: 'statistics',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getStatisticsInfo.pending, (state) => {
                return {...state, status: 'loading'}
            })
            .addCase(getStatisticsInfo.fulfilled, (state, action) => {
                return {...state, status: 'idle', error: '', ...action.payload }
            })
            .addCase(getStatisticsInfo.rejected, (state) => {
                return {...state, status: 'idle', error: 'Something went wrong!' }
            })
    },
});

export const selectMonthlyItems = ({ statistics: { monthlyStatistics }}: RootState) => {
    const index = (new Date()).getMonth();
    return monthlyStatistics.slice(index - 3, index + 4);
};

export const selectTopItems = ({ statistics: { topItems }}: RootState) => topItems;

export const selectTopCategories = ({ statistics: { topCategories }}: RootState) => topCategories;

export default statisticsSlice.reducer;