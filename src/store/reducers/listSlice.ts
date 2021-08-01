import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import type { RootState } from '../index';
import api from '../../api';

interface ListState {
    id: number|undefined;
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
    id: undefined,
    name: '',
    items: [],
    state: 'edit' // edit | active
}

// thunks
export const getActiveList = createAsyncThunk('products/loadActiveList', async () => {
    const response: any = await api.getActiveList();
    return response.list;
});

export const saveList = createAsyncThunk('products/saveActiveList', async (name: string, { getState }) => {
    const { list } = getState() as RootState;
    const response: any = await api.saveActiveList({...list, name, state: 'active'});
    return response;
});

export const changeActiveListState = createAsyncThunk('products/changeListState', async (state: 'cancelled'|'completed', { getState }) => {
    const { list } = getState() as RootState;
    await api.changeActiveListState(list.id, state);
    return { state };
});

export const listSlice = createSlice({
    name: 'items',
    initialState,
    reducers: {
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
        },  
    },
    extraReducers: builder => {
        builder
            .addCase(getActiveList.fulfilled, (state, action) => {
                return {...state, name: action.payload.name, items: action.payload.items, id: action.payload.id, state: 'active'
                }
            })
            .addCase(saveList.fulfilled, (state, action) => {
                return {
                    ...state,
                    name: action.payload.name,
                    state: 'active',
                    id: action.payload.id
                }
            })
            .addCase(changeActiveListState.fulfilled, () => {
                return {
                    id: undefined,
                    name: '',
                    items: [],
                    state: 'edit' // edit | active
                }
            })
    },
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

export const { addItem, removeItem, increaseAmount, decreaseAmount, editState, toggleItemCompletion } = listSlice.actions;

export default listSlice.reducer;