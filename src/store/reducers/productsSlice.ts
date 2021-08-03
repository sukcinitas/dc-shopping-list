import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import type { RootState } from '../index';
import api from '../../api';

interface ProductToAdd {
    name: string; category: string; url: string; description: string;
}

interface Product extends ProductToAdd {
    id: number; deletedAt: string|null; user_id: number;
}

interface Product2 {
    id: number;
    name: string;
    url: string;
    description: string;
    category: string;
    deletedAt: null;
  }
  
  interface ProductWithUserId extends Product2 {
      user_id: number;
  }
  
  interface SimpleProduct {
    name:string;
    id: number;
    state: string;
    created_at: string;
  }

interface ProductsState {
    products: {
        state: string;
        error: string;
        items: Array<Product>;
    }
    filteredItems: Array<Product>;
    selectedProduct: Product|null;
    isSidePanelShown: boolean;
}

const initialState: ProductsState =  {
    products: {
        items: [],
        state: 'idle', // loading | idle
        error: '',
    },
    filteredItems: [],
    selectedProduct: null,
    isSidePanelShown: false,
};

// thunks
export const getProducts = createAsyncThunk('products/loadProducts', async (): Promise<{ products: Array<ProductWithUserId>}> => {
    const response = await api.getProducts();
    return { products: response.products };
});

export const addProduct = createAsyncThunk('products/add', async (product: ProductToAdd): Promise<{product: any}>=> {
    const response: any = await api.addProduct({...product});
    return { product: response.product };
});

export const removeProduct = createAsyncThunk('products/remove', async (id: number): Promise<{id: number}> => {
    await api.removeProduct(id);
    return { id };
});


export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
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
            return  {...state, filteredItems: [...state.products.items]};
        } else {
            const regex = new RegExp(`^${phrase}`, 'i');
            return {
                ...state,
                filteredItems: state.products.items.filter((item) => regex.test(item.name))
            }
        }
    },
    toggleSidePanel: (state) => {
        return  {...state, isSidePanelShown: !state.isSidePanelShown };
    }
  },
  extraReducers: builder => {
    builder
        .addCase(getProducts.pending, (state) => {
            state.products.state = 'loading';
        })
        .addCase(getProducts.fulfilled, (state, action) => {
            state.products.items = action.payload.products;
            state.filteredItems = action.payload.products;
            state.products.state = 'idle';
        })
        .addCase(getProducts.rejected, (state) => {
            state.products.state = 'idle';
            state.products.error = 'Something went wrong! Try again later!';
            setInterval(() => {
                state.products.error = '';
            }, 400);
        })
        .addCase(addProduct.fulfilled, (state, action) => {
            return {
                ...state,
                products: {...state.products, items: [...state.products.items, {...action.payload.product }]},
                filteredItems: [...state.products.items, {...action.payload.product }],
            }
        })
        .addCase(removeProduct.fulfilled, (state, action) => {
            return {
                ...state,
                products: {...state.products, items: state.products.items.filter((product) => product.id !== action.payload.id)},
                filteredItems: state.products.items.filter((product) => product.id !== action.payload.id),
            }
        })
    },
});

//selectors
export const selectProductsByCategories =  ({ products: { filteredItems } }: RootState) => {
    const map: {[key: string]: Array<Product>;} = {};
    for (let i = 0; i < filteredItems.length; i++) {
        if (filteredItems[i].deletedAt) continue;
        if (filteredItems[i].category in map) {
            map[filteredItems[i].category] = [...map[filteredItems[i].category], filteredItems[i]];
        } else {
            map[filteredItems[i].category] = [filteredItems[i]];
        }
    }
    return map;
};

export const selectCategories = ({ products: { products: { items } } }: RootState) => {
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

export const selectState = ({ products: { products: { state } }}: RootState) => state;

export const { selectProduct, search, toggleSidePanel } = productsSlice.actions;

export default productsSlice.reducer;