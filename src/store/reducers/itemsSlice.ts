import { createSlice } from '@reduxjs/toolkit';

export const itemsSlice = createSlice({
  name: 'items',
  initialState: {
        categories: [{ category: 'Meats', items: [{id: 1, name: 'Pork', url: '', description: ''}, {id: 2, name: 'Chicken', url: '', description: ''}]},
        {category: 'Fish', items: [{id: 1, name: 'Salmon', url: '', description: ''}]}],
        categoriesNames: ['Meats', 'Fish']
  },
  reducers: {
    add: (state, action) => {
        const category:string = action.payload.category;
        if (category in state) {
            return {
                ...state,
                categories: state.categories.map((item) => {
                    if (category === item.category) {
                        return {
                            category,
                            items: [...item.items, action.payload.item]
                        }
                    } else {
                        return item;
                    }
                }),
            }
        } else {
            return {
                ...state,
                categories: [...state.categories, {
                    category: action.payload.category,
                    items: [action.payload.item]
                }],
                categoriesName: [...state.categoriesNames, action.payload.item.category]  
            }
        }
    },
    remove: (state, action) => {
        const category = action.payload.category;
        return {
            ...state,
            categories: state.categories.map((item) => {
                if (category === item.category) {
                    return {
                        category,
                        items: item.items.filter((it) => it.id !== action.payload.item.id),
                    }
                } else {
                    return item;
                }
            }),
        }
    },
  }
})

export const { add, remove } = itemsSlice.actions;
// export const selectCategoriesNames = (state:any) => state.categoriesNames;

export default itemsSlice.reducer;