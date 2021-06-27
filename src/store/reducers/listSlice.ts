import { createSlice } from '@reduxjs/toolkit';

export const listSlice = createSlice({
    name: 'items',
    initialState: {
            name: 'Shopping List',
            categories: [{ category: 'Meat', items: [{ id: '1', name: 'Pork', pieces: 1}]}]
    },
    reducers: {
        addItem: (state, action) => {
            const newCategories = state.categories.map((category) => {
                if (action.payload.category === category.category) {
                    return {
                        category: action.payload.catgory,
                        items: [...category.items, {...action.payload.item, pieces: 1 }]
                    }
                } else {
                        return category;
                    }
            });
            return {
                ...state,
                categories: newCategories,
            }
        },
    }
});

export const { addItem } = listSlice.actions;

export default listSlice.reducer;