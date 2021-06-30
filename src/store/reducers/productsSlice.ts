import { createSlice } from '@reduxjs/toolkit';

export const productsSlice = createSlice({
  name: 'products',
  initialState: {
        categories: [{ category: 'Meats', items: [{id: '1', name: 'Pork', url: '', description: ''}, {id: '2', name: 'Chicken', url: '', description: ''}]},
        {category: 'Fish', items: [{id: '3', name: 'Salmon', url: '', description: ''}]}],
        categoriesNames: ['Meats', 'Fish'],
        selectedProduct: null,
  },
  reducers: {
    add: (state, action) => {
        const category:string = action.payload.category;
        if (state.categoriesNames.indexOf(category) > -1) {
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
                if (category === action.payload.category) {
                    return {
                        category,
                        items: item.items.filter((it) => it.id !== action.payload.id),
                    }
                } else {
                    return item;
                }
            }),
            selectedProduct: null,
        }
    },
    selectProduct: (state, { payload: { item, category }} ) => {
        if (!item) {
            return {
                ...state,
                selectedProduct: item,
            }
        } else {
            const { id, name, description } = item;
            return {
                ...state,
                selectedProduct: {
                    id,
                    name, 
                    description, 
                    category,
                }
            }
        }
    }
  }
})

export const { add, remove, selectProduct } = productsSlice.actions;

export default productsSlice.reducer;