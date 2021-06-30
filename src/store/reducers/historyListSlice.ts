import { createSlice } from '@reduxjs/toolkit';

export const historyListSlice = createSlice({
    name: 'historyList',
    initialState: {
            list: {
                id: '10',
                name: 'Pirmasis',
                created_at: '2020-02-04',
                status: 'completed',
                items: [{ id: '1', name: 'Pork with something', description: '', url: '', category: 'Meats' }, { id: '2', name: 'Salmon', description: '', url: '', category: 'Fish' }]

            },
            status: 'loading',
            error: '',
    },
    reducers: {}
});

export const selectItemsByCategories = ( {historyList: { list: { items } }}: any ) => {
    const map: any = {};
    for (let i = 0; i < items.length; i++) {
        if (items[i].category in map) {
            map[items[i].category] = [...map[items[i].category], items[i]];
        } else {
            map[items[i].category] = [items[i]];
        }
    }
    console.log(map);
    return map;
};

export const selectListName = (state: any) => state.historyList.list.name;

export const selectListDate = (state: any) => state.historyList.list.created_at;

export const {  } = historyListSlice.actions;

export default historyListSlice.reducer;