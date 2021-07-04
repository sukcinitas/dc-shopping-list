import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../index';

interface HistoryState {
    lists: Array<{
        id: number;
        name: string;
        status: string;
        created_at: string;
    }>;
    status: string;
    error: string;
}

const initialState: HistoryState = {
    lists: [{ id: 1, created_at: '2020-10-11', name: 'Pirmas apsipirkimas', status: 'completed' },
     { id: 2, created_at: '2019-10-11', name: 'Pirmas apsipirkimas', status: 'completed' },
     { id: 3, created_at: '2019-10-12', name: 'Monthly', status: 'cancelled' }],
    error: '',
    status: 'loading', // loading | success | error
};

export const historySlice = createSlice({
    name: 'history',
    initialState,
    reducers: {}
});

// need to get list sorted by recent date

// 2020-11-11
const monthsMap = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
export const selectListsByDate = ({ history: { lists }}: RootState) => {
    const map: {[key: string]: Array<{
        id: number;
        name: string;
        status: string;
        created_at: string;
    }>;} = {};
    for (let i = 0; i < lists.length; i++) {
        const date =  new Date(lists[i].created_at);
        const dateByMonth = `${date.getFullYear()} ${monthsMap[date.getMonth()]}`;
        if (dateByMonth in map) {
            map[dateByMonth] = [...map[dateByMonth], lists[i]];
        } else {
            map[dateByMonth] = [lists[i]];
        }
    }
    console.log(map, 'map');
    return map;
};

export const {  } = historySlice.actions;

export default historySlice.reducer;