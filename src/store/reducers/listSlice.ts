import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import type { RootState } from '../index';
import api from '../../api';

interface ListState {
    list: {
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
    const response: any = await api.getActiveList();
    return response.list;
});

export const saveList = createAsyncThunk('products/saveActiveList', async (name: string, { getState }) => {
    const { list } = getState() as RootState;
    const response: any = await api.saveActiveList({...list.list, name, state: 'active'});
    return response;
});

export const changeActiveListState = createAsyncThunk('products/changeListState', async (state: 'cancelled'|'completed', { getState }): Promise<{ state: 'cancelled'|'completed'}> => {
    const { list } = getState() as RootState;
    await api.changeActiveListState(list.list.id, state);
    return { state };
});

export const listSlice = createSlice({
    name: 'items',
    initialState,
    reducers: {
        editState: (state, action) => {
            return {...state, list: {...state.list, state: action.payload.state }};
        },
        addItem: (state, action) => {
            if (state.list.items.find((item) => item.id === action.payload.item.id )) {
                return {
                    ...state,
                    list: {
                        ...state.list,
                        state: 'edit',
                        items: state.list.items.map((item) => {
                            if (item.id === action.payload.item.id) {
                                return {...item, pieces: item.pieces + 1}
                            } else {
                                return item;
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
                    items: [...state.list.items, {...action.payload.item, pieces: 1, completed: false }]
                }
            }
        },
        removeItem: (state, action) => {
            return {
                ...state,
                list: {
                    ...state.list,
                    items: state.list.items.filter((item) => item.id !== action.payload.id),
                }
            }
        },
        increaseAmount: (state, action) => {
            return {
                ...state,
                list: {
                    ...state.list,
                    items: state.list.items.map((item) => {
                        if (item.id === action.payload.id) {
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
                        if (item.id === action.payload.id) {
                            return {...item, pieces: item.pieces - 1}
                        } else {
                            return item;
                        }
                    })
                }
            }
        },
        toggleItemCompletion: (state, action) => {
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
                    list: {...state.list, state: 'active', name: action.payload.name, id: action.payload.id }
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

export const { addItem, removeItem, increaseAmount, decreaseAmount, editState, toggleItemCompletion } = listSlice.actions;

export default listSlice.reducer;