import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import type { RootState } from '../index';
import api from '../../api';

interface ListState {
    list: {
        id: number|undefined;
        name: string;
        items: Array<{
            id: number|undefined;
            product_id: number;
            name: string;
            pieces: number;
            completed: boolean;
            category: string;
        }>;
        state: string;
    }
    status: string;
    error: string;
}

const initialState: ListState = {
    list: {
        id: undefined,
        name: '',
        items: [],
        state: 'edit' // edit | active
    },
    status: 'idle',
    error: '',
}

// thunks
export const getActiveList = createAsyncThunk('products/loadActiveList', async () => {
    const response = await api.getActiveList();
    return response;
});

export const saveList = createAsyncThunk('products/saveActiveList', async (name: string, { getState }) => {
    const { list } = getState() as RootState;
    const items = list.list.items;
    const newItems = items.map(({ id, pieces, product_id, completed, name, category }) => ({ id, units: pieces, product_id, completed: completed ? "1" :"0", name, category }));
    const response = await api.saveActiveList({...list.list, items: newItems, name, state: 'active'});
    return response;
});

export const changeActiveListState = createAsyncThunk('products/changeListState', async (state: 'cancelled'|'completed', { getState }) => {
    const { list } = getState() as RootState;
    await api.changeActiveListState(list.list.id, state);
    return;
});

export const toggleItemCompletion = createAsyncThunk('products/toggleCompletion', async (state: { id: number|undefined, completed: true|false }, { getState }) => {
    const { list } = getState() as RootState;
    await api.toggleItemCompletion(list.list.id, state.id, state.completed ? "1" : "0");
    return { id: state.id };
});

export const listSlice = createSlice({
    name: 'items',
    initialState,
    reducers: {
        editState: (state, action) => {
            return {...state, list: {...state.list, state: action.payload.state }};
        },
        addItem: (state, action) => {
            if (state.list.items.find((item) => item.product_id === action.payload.item.id )) {
                return {
                    ...state,
                    list: {
                        ...state.list,
                        state: 'edit',
                        items: state.list.items.map((item) => {
                            if (item.product_id === action.payload.item.id) {
                                return {...item, pieces: item.pieces + 1}
                            } else {
                                return {...item};
                            }
                        })
                    }
                }
            }
            return {
                ...state,
                list: {
                    ...state.list,
                    state: 'edit',
                    items: [...state.list.items, {...action.payload.item, product_id: action.payload.item.id, id: undefined, pieces: 1, completed: false }]
                }
            }
        },
        removeItem: (state, action) => {
            return {
                ...state,
                list: {
                    ...state.list,
                    items: state.list.items.filter((item) => item.product_id !== action.payload.id),
                }
            }
        },
        increaseAmount: (state, action) => {
            return {
                ...state,
                list: {
                    ...state.list,
                    items: state.list.items.map((item) => {
                        if (item.product_id === action.payload.id) {
                            return {...item, pieces: item.pieces + 1}
                        } else {
                            return item;
                        }
                    })
                }
            }
        },
        decreaseAmount: (state, action) => {
            return {
                ...state,
                list: {
                    ...state.list,
                    items: state.list.items.map((item) => {
                        if (item.pieces === 1) {
                            return item;
                        }
                        if (item.product_id === action.payload.id) {
                            return {...item, pieces: item.pieces - 1}
                        } else {
                            return item;
                        }
                    })
                }
            }
        },
    },
    extraReducers: builder => {
        builder
            .addCase(getActiveList.pending, (state) => {
                return {...state, status: 'loading'}
            })
            .addCase(getActiveList.fulfilled, (state, action) => {
                return {...state, list: {...state.list,...action.payload, state: 'active'}, status: 'idle'}
            })
            .addCase(getActiveList.rejected, (state) => {
                return {...state, status: 'idle', error: 'Something went wrong!'}
            })
            .addCase(saveList.fulfilled, (state, action) => {
                return {
                    ...state,
                    list: {...action.payload.list, state: 'active'}
                }
            })
            .addCase(changeActiveListState.fulfilled, () => {
                return {
                    list: {
                        id: undefined,
                        name: '',
                        items: [],
                        state: 'edit' // edit | active
                    },
                    error: '',
                    status: 'idle',
                }
            })
            .addCase(toggleItemCompletion.fulfilled, (state, action) => {
                return {
                    ...state,
                    list: {
                        ...state.list,
                        items: state.list.items.map((item) => {
                            if (item.id === action.payload.id) {
                                return {...item, completed: !item.completed };
                            } else {
                                return item;
                            }
                        })
                    }
                }
            })
    },
});

export const selectItemsByCategories = ({ list }: RootState) => {
    const map: {[key: string]: Array<{
        id: number|undefined,
        product_id: number;
        name: string;
        pieces: number;
        completed: boolean;
        category: string;
    }>;} = {};
    for (let i = 0; i < list.list.items.length; i++) {
        if (list.list.items[i].category in map) {
            map[list.list.items[i].category] = [...map[list.list.items[i].category], list.list.items[i]];
        } else {
            map[list.list.items[i].category] = [list.list.items[i]];
        }
    }
    return map;
};

export const selectNonCompletedAmount = ({ list }: RootState) => {
    let count = 0;
    for (let i = 0; i < list.list.items.length; i++) {
        if (!list.list.items[i].completed) {
            count++;
        }
    }
    return count;
};

export const selectListName = (state: RootState) => state.list.list.name;

export const selectInEditState = (state: RootState) => state.list.list.state === 'edit';

export const selectStatus = (state: RootState) => state.list.status;

export const { addItem, removeItem, increaseAmount, decreaseAmount, editState } = listSlice.actions;

export default listSlice.reducer;