import { bindActionCreators, createSlice } from '@reduxjs/toolkit';

type list = {
    name: string;
    items: {id: string; name: string; category: string; pieces: number; completed: boolean; }[];
    state: string;
};

type item = {
    id: string; name: string; category: string; pieces: number; completed: boolean;
}

export const listSlice = createSlice({
    name: 'items',
    initialState: {
            name: '',
            items: [],
            state: 'edit' // edit | active
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
        editState: (state:any, action) => {
            return {...state, state: action.payload.state};
        },
        addItem: (state:any, action) => {
            if (state.items.find((item: item) => item.id === action.payload.item.id )) {
                return {...state};
            }
            return {
                ...state,
                items: [...state.items, {...action.payload.item, pieces: 1, completed: false }]
            }
        },
        removeItem: (state:any, action) => {
            return {
                ...state,
                items: state.items.filter((item: item) => item.id !== action.payload.id),
            }
        },
        increaseAmount: (state:any, action) => {
            return {
                ...state,
                items: state.items.map((item: item) => {
                    if (item.id === action.payload.id) {
                        return {...item, pieces: item.pieces + 1}
                    } else {
                        return item;
                    }
                })
            }
        },
        decreaseAmount: (state:any, action) => {
            return {
                ...state,
                items: state.items.map((item:item) => {
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
        toggleItemCompletion: (state: any, action) => {
            return {
                ...state,
                items: state.items.map((item: item) => {
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

export const selectNonCompletedAmount = ({ list }: { list: any }) => {
    let count = 0;
    for (let i = 0; i < list.items.length; i++) {
        if (!list.items[i].completed) {
            count++;
        }
    }
    return count;
};

export const selectListName = (state: any) => state.list.name;

export const selectInEditState = (state: any) => state.list.state === 'edit';

export const { addItem, removeItem, increaseAmount, decreaseAmount, editName, editState, cancelList, toggleItemCompletion } = listSlice.actions;

export default listSlice.reducer;