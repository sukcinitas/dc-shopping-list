import { createSlice } from '@reduxjs/toolkit';

type list = {
    name: string;
    items: {id: string; name: string; category: string; pieces: number; completed: boolean; }[];
    state: string;
};

type item = {
    id: string; name: string; category: string; pieces: number; completed: boolean;
}

export const historySlice = createSlice({
    name: 'history',
    initialState: {
            lists: [{ id: 1, created_at: '2020-10-11', name: 'Pirmas apsipirkimas', status: 'completed' },
             { id: 2, created_at: '2019-10-11', name: 'Pirmas apsipirkimas', status: 'completed' },
             { id: 3, created_at: '2019-10-12', name: 'Monthly', status: 'cancelled' }],
            error: '',
            status: 'loading', // loading | success | error
    },
    reducers: {}
});

// need to get list sorted by recent date

// 2020-11-11
const monthsMap = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
export const selectListsByDate = ({ history: { lists }}: any) => {
    const map: any = {};
    for (let i = 0; i < lists.length; i++) {
        const date =  new Date(lists[i].created_at);
        const dateByMonth = `${date.getFullYear()} ${monthsMap[date.getMonth()]}`;
        console.log(dateByMonth);
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