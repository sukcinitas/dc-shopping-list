import { createSlice } from '@reduxjs/toolkit';

type item = {
    id: string; name: string; category: string; url: string; description: string;
}

export const productsSlice = createSlice({
  name: 'products',
  initialState: {
        items: [{id: '1', name: 'Pork', url: '', description: '', category: 'Meats'}, {id: '2', name: 'Chicken', url: '', description: '', category: 'Meats'},
        { id: '3', name: 'Salmon', url: '', description: '', category: 'Fish' }],
        filteredItems: [{id: '1', name: 'Pork', url: '', description: '', category: 'Meats'}, {id: '2', name: 'Chicken', url: '', description: '', category: 'Meats'},
        { id: '3', name: 'Salmon', url: '', description: '', category: 'Fish' }],
        selectedProduct: null,
  },
  reducers: {
    add: (state:any, action) => {
        if (state.items.find((item: item) => item.name === action.payload.item.name )) {
            return {...state};
        }
        return {
            ...state,
            items: [...state.items, {...action.payload.item }]
        }
    },
    remove: (state:any, action) => {
        return {
            ...state,
            items: state.items.filter((item: item) => item.id !== action.payload.id),
        }
    },
    selectProduct: (state, { payload: { item }} ) => {
        if (!item) {
            return {
                ...state,
                selectedProduct: item,
            }
        } else {
            const { id, name, description, url, category } = item;
            return {
                ...state,
                selectedProduct: {
                    id,
                    name, 
                    description, 
                    category,
                    url,
                }
            }
        }
    }
  }
});

export const selectProductsByCategories =  ({ products: { filteredItems } }: any) => {
    const map: any = {};
    for (let i = 0; i < filteredItems.length; i++) {
        if (filteredItems[i].category in map) {
            map[filteredItems[i].category] = [...map[filteredItems[i].category], filteredItems[i]];
        } else {
            map[filteredItems[i].category] = [filteredItems[i]];
        }
    }
    return map;
};

export const selectCategories = ({ products: { items } }: any) => {
    const map: any = [];
    for (let i = 0; i < items.length; i++) {
        if (map.indexOf(items[i].category) < 0) {
            map.push(items[i].category);
        }
    }
    return map;
};

export const { add, remove, selectProduct } = productsSlice.actions;

export default productsSlice.reducer;