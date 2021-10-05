import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import type { RootState } from '../index';
import api from '../../api';

interface ProductToAdd {
    name: string; category: string; url: string; description: string;
}

interface Product extends ProductToAdd {
    id: number; deleted_at: string|null; user_id: number;
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
    addProductError: string;
    addProductMessage: string;
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
    addProductError: '',
    addProductMessage: '',
};

// thunks
export const getProducts = createAsyncThunk('products/loadProducts', async (): Promise<any> => await api.getProducts());

export const addProduct = createAsyncThunk('products/add', async (productToAdd: ProductToAdd, {rejectWithValue}: {rejectWithValue: any}): Promise<any>=> {
    try {
        const result = await api.addProduct({...productToAdd});
        return { product: result.product};
    } catch (err: any) {
        if (!('data' in err)) {
            return rejectWithValue({ message: 'Something went wrong! Try again later!'});
        }
        return rejectWithValue('message' in err.response.data ? err.response.data : { message: 'Something went wrong! Try again later!'});
    }
});

export const removeProduct = createAsyncThunk('products/remove', async (id: number): Promise<{id: number}> => {
    await api.removeProduct(id);
    return { id };
});

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    changeErrorMessage: (state) => {
        return {
            ...state,
            products: {...state.products, error: ''}
        }
    },
    changeAddErrorMessage: (state) => {
        return {
            ...state,
            addProductError: '',
        }
    },
    changeAddMessage: (state) => {
        return {
            ...state,
            addProductMessage: '',
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
                },
                isSidePanelShown: true,
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
            state.products.items = [];
            state.filteredItems = [];
        })
        .addCase(addProduct.fulfilled, (state, action) => {
            return {
                ...state,
                products: {...state.products, items: [...state.products.items, {...action.payload.product }]},
                filteredItems: [...state.products.items, {...action.payload.product }],
                addProductMessage: 'Product has been successfully added!'
            }
        })
        .addCase(addProduct.rejected, (state, action: any) => {
            return {
                ...state,
                addProductError: action.payload.message
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
        if (filteredItems[i].deleted_at) continue;
        if (filteredItems[i].category in map) {
            map[filteredItems[i].category] = [...map[filteredItems[i].category], filteredItems[i]];
        } else {
            map[filteredItems[i].category] = [filteredItems[i]];
        }
    }
    let accumLength = 0;
    const array: Array<{ category: string; items: Array<Product>; accumLength: number;}> = [];
    Object.keys(map).map((key) => {
        array.push({
            category: key,
            items: map[key],
            accumLength,
        })
        accumLength += map[key].length;
    });
    return array;
};

export const selectCategories = ({ products: { products: { items } } }: RootState) => {
    const map: Array<string> = [];
    for (let i = 0; i < items.length; i++) {
        if (items[i].deleted_at) continue;
        if (map.indexOf(items[i].category) < 0) {
            map.push(items[i].category);
        }
    }
    return map;
};

export const selectSelectedItem = ({ products: { selectedProduct } }: RootState) => selectedProduct;

export const selectIsSidePanelShown = ({ products: { isSidePanelShown }}: RootState) => isSidePanelShown;

export const selectState = ({ products: { products: { state } }}: RootState) => state;

export const selectAddError = ({ products: { addProductError }}: RootState) => addProductError;

export const selectAddMessage = ({ products: { addProductMessage }}: RootState) => addProductMessage;

export const selectError = ({ products: { products: { error } }}: RootState) => error;

export const { selectProduct, search, toggleSidePanel, changeErrorMessage, changeAddErrorMessage, changeAddMessage } = productsSlice.actions;

export default productsSlice.reducer;