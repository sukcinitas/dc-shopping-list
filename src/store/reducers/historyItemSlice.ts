import { createSlice } from '@reduxjs/toolkit';

type list = {
    name: string;
    items: {id: string; name: string; category: string; pieces: number; completed: boolean; }[];
    state: string;
};

type item = {
    id: string; name: string; category: string; pieces: number; completed: boolean;
}

export const historyItemSlice = createSlice({
    name: 'historyItem',
    initialState: {
            items: [],
            selectedList: {}
    },
    reducers: {
        editName: (state: any, action) => {
            if (!state.name) {
                return {
                    ...state,
                    name: action.payload.name,
                    state: 'edit'
                }
            }
            return {
                ...state,
                name: action.payload.name,
                state: 'active'
            }
        },
    }
});

export const selectItemsByCategories = ({ list }: { list: any }) => {
    const map: any = {};
    for (let i = 0; i < list.items.length; i++) {
        if (list.items[i].category in map) {
            map[list.items[i].category] = [...map[list.items[i].category], list.items[i]];
        } else {
            map[list.items[i].category] = [list.items[i]];
        }
    }
    return map;
};

export const selectListName = (state: any) => state.list.name;

export const {  } = historyItemSlice.actions;

export default historyItemSlice.reducer;