import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../index';

interface Item {
    id: number; name: string; category: string; url: string; description: string;
}

interface ProductsState {
    items: Array<Item>;
    filteredItems: Array<Item>;
    selectedProduct: Item;
    isSidePanelShown: boolean;
}

const initialState: ProductsState =  {
    items: [{id: 1, name: 'Pork', url: '', description: '', category: 'Meats'}, {id: 2, name: 'Chicken', url: '', description: '', category: 'Meats'},
    { id: 3, name: 'Salmon', url: '', description: '', category: 'Fish' }],
    filteredItems: [{id: 1, name: 'Pork', url: '', description: '', category: 'Meats'}, {id: 2, name: 'Chicken', url: '', description: '', category: 'Meats'},
    { id: 3, name: 'Salmon', url: '', description: '', category: 'Fish' }],
    selectedProduct: {
        id: 0,
        name: '',
        category: '',
        url: '',
        description: ''
    },
    isSidePanelShown: false,
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    add: (state, action) => {
        if (state.items.find((item) => item.name === action.payload.item.name )) {
            return {...state};
        }
        return {
            ...state,
            items: [...state.items, {...action.payload.item }],
            filteredItems: [...state.items, {...action.payload.item }],
        }
    },
    remove: (state, action) => {
        return {
            ...state,
            items: state.items.filter((item) => item.id !== action.payload.id),
            filteredItems: state.items.filter((item) => item.id !== action.payload.id),
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
    },
    search: (state, { payload: { phrase }}) => {
        if (!phrase) {
            return  {...state, filteredItems: [...state.items]};
        } else {
            const regex = new RegExp(`^${phrase}`, 'i');
            return {
                ...state,
                filteredItems: state.items.filter((item) => regex.test(item.name))
            }
        }
    },
    toggleSidePanel: (state) => {
        return  {...state, isSidePanelShown: !state.isSidePanelShown };
    }
  }
});

export const selectProductsByCategories =  ({ products: { filteredItems } }: RootState) => {
    const map: {[key: string]: Array<Item>;} = {};
    for (let i = 0; i < filteredItems.length; i++) {
        if (filteredItems[i].category in map) {
            map[filteredItems[i].category] = [...map[filteredItems[i].category], filteredItems[i]];
        } else {
            map[filteredItems[i].category] = [filteredItems[i]];
        }
    }
    return map;
};

export const selectCategories = ({ products: { items } }: RootState) => {
    const map: Array<string> = [];
    for (let i = 0; i < items.length; i++) {
        if (map.indexOf(items[i].category) < 0) {
            map.push(items[i].category);
        }
    }
    return map;
};

export const selectSelectedItem = ({ products: { selectedProduct } }: RootState) => selectedProduct;

export const selectIsSidePanelShown = ({ products: { isSidePanelShown }}: RootState) => isSidePanelShown;

export const { add, remove, selectProduct, search, toggleSidePanel } = productsSlice.actions;

export default productsSlice.reducer;