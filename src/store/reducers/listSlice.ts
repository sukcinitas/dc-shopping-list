import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../index';

interface ListState {
    name: string;
    items: Array<{
        id: number;
        name: string;
        pieces: number;
        completed: boolean;
        category: string;
    }>;
    state: string;
}

const initialState: ListState = {
    name: '',
    items: [],
    state: 'edit' // edit | active
}

export const listSlice = createSlice({
    name: 'items',
    initialState,
    reducers: {
        editName: (state, action) => {
            return {
                ...state,
                name: action.payload.name,
                state: 'active'
            }
        },
        editState: (state, action) => {
            return {...state, state: action.payload.state};
        },
        addItem: (state, action) => {
            if (state.items.find((item) => item.id === action.payload.item.id )) {
                return {
                    ...state,
                    state: 'edit',
                    items: state.items.map((item) => {
                        if (item.id === action.payload.item.id) {
                            return {...item, pieces: item.pieces + 1}
                        } else {
                            return item;
                        }
                    })
                }
            }
            return {
                ...state,
                state: 'edit',
                items: [...state.items, {...action.payload.item, pieces: 1, completed: false }]
            }
        },
        removeItem: (state, action) => {
            return {
                ...state,
                items: state.items.filter((item) => item.id !== action.payload.id),
            }
        },
        increaseAmount: (state, action) => {
            return {
                ...state,
                items: state.items.map((item) => {
                    if (item.id === action.payload.id) {
                        return {...item, pieces: item.pieces + 1}
                    } else {
                        return item;
                    }
                })
            }
        },
        decreaseAmount: (state, action) => {
            return {
                ...state,
                items: state.items.map((item) => {
                    if (item.pieces === 1) {
                        return item;
                    }
                    if (item.id === action.payload.id) {
                        return {...item, pieces: item.pieces - 1}
                    } else {
                        return item;
                    }
                })
            }
        },
        cancelList: () => {
            return {
                name: '',
                items: [],
                state: 'edit' // edit | active
            }
        },
        toggleItemCompletion: (state, action) => {
            return {
                ...state,
                items: state.items.map((item) => {
                    if (item.id === action.payload.id) {
                        return {...item, completed: !item.completed };
                    } else {
                        return item;
                    }
                })
            }
        }
    }
});

export const selectItemsByCategories = ({ list }: RootState) => {
    const map: {[key: string]: Array<{
        id: number;
        name: string;
        pieces: number;
        completed: boolean;
        category: string;
    }>;} = {};
    for (let i = 0; i < list.items.length; i++) {
        if (list.items[i].category in map) {
            map[list.items[i].category] = [...map[list.items[i].category], list.items[i]];
        } else {
            map[list.items[i].category] = [list.items[i]];
        }
    }
    return map;
};

export const selectNonCompletedAmount = ({ list }: RootState) => {
    let count = 0;
    for (let i = 0; i < list.items.length; i++) {
        if (!list.items[i].completed) {
            count++;
        }
    }
    return count;
};

export const selectListName = (state: RootState) => state.list.name;

export const selectInEditState = (state: RootState) => state.list.state === 'edit';

export const { addItem, removeItem, increaseAmount, decreaseAmount, editName, editState, cancelList, toggleItemCompletion } = listSlice.actions;

export default listSlice.reducer;