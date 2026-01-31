import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import type { RootState } from "../index";
import api from "../../api";

interface ProductToAdd {
  name: string;
  category: string;
  url: string;
  description: string;
}

interface Product extends ProductToAdd {
  product_id: number;
  deleted_at: string | null;
}

interface ProductsState {
  products: {
    state: string;
    error: string;
    items: Array<Product>;
  };
  filteredItems: Array<Product>;
  selectedProduct: Product | null;
  isSidePanelShown: boolean;
  addProductError: string;
  addProductMessage: string;
}

const initialState: ProductsState = {
  products: {
    items: [],
    state: "idle", // loading | idle
    error: "",
  },
  filteredItems: [],
  selectedProduct: null,
  isSidePanelShown: false,
  addProductError: "",
  addProductMessage: "",
};

// thunks
export const getProducts = createAsyncThunk(
  "products/loadProducts",
  async (): Promise<{ products: Array<Product> }> => await api.getProducts(),
);

export const addProduct = createAsyncThunk<
  { product: Product },
  ProductToAdd,
  { rejectValue: { message: string } }
>("products/add", async (productToAdd: ProductToAdd, { rejectWithValue }) => {
  try {
    const result = await api.addProduct({ ...productToAdd });
    return { product: result.product };
  } catch (err: unknown) {
    return rejectWithValue({
      message: "Something went wrong! Try again later!",
    } as { message: string });
  }
});

export const editProduct = createAsyncThunk<
  { product: Product },
  { productToAdd: ProductToAdd; product_id: number },
  { rejectValue: { message: string } }
>(
  "products/edit",
  async ({ productToAdd, product_id }, { rejectWithValue }) => {
    try {
      const result = await api.editProduct({ ...productToAdd }, product_id);
      return { product: result.product } as { product: Product };
    } catch (err: unknown) {
      return rejectWithValue({
        message: "Something went wrong! Try again later!",
      } as { message: string });
    }
  },
);

export const removeProduct = createAsyncThunk(
  "products/remove",
  async (product_id: number): Promise<{ product_id: number }> => {
    await api.removeProduct(product_id);
    return { product_id };
  },
);

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    changeErrorMessage: (state) => {
      return {
        ...state,
        products: { ...state.products, error: "" },
      };
    },
    changeAddErrorMessage: (state) => {
      return {
        ...state,
        addProductError: "",
      };
    },
    changeAddMessage: (state) => {
      return {
        ...state,
        addProductMessage: "",
      };
    },
    selectProduct: (state, { payload: { item } }) => {
      if (!item) {
        return {
          ...state,
          selectedProduct: item,
        };
      } else {
        const { product_id, name, description, url, category } = item;
        return {
          ...state,
          selectedProduct: {
            product_id,
            name,
            description,
            category,
            url,
          },
          isSidePanelShown: true,
        };
      }
    },
    search: (state, { payload: { phrase } }) => {
      if (!phrase) {
        return { ...state, filteredItems: [...state.products.items] };
      } else {
        const regex = new RegExp(`^${phrase}`, "i");
        return {
          ...state,
          filteredItems: state.products.items.filter((item) =>
            regex.test(item.name),
          ),
        };
      }
    },
    toggleSidePanel: (state) => {
      return { ...state, isSidePanelShown: !state.isSidePanelShown };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.products.state = "loading";
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.products.items = action.payload.products;
        state.filteredItems = action.payload.products;
        state.products.state = "idle";
      })
      .addCase(getProducts.rejected, (state) => {
        state.products.state = "idle";
        state.products.error = "Something went wrong! Try again later!";
        state.products.items = [];
        state.filteredItems = [];
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        if (!action.payload) return { ...state };
        return {
          ...state,
          products: {
            ...state.products,
            items: [...state.products.items, { ...action.payload.product }],
          },
          filteredItems: [
            ...state.products.items,
            { ...action.payload.product },
          ],
          addProductMessage: "Product has been successfully added!",
        };
      })
      .addCase(addProduct.rejected, (state, action) => {
        if (!action.payload) return { ...state };
        return {
          ...state,
          addProductError: action.payload.message,
        };
      })
      .addCase(editProduct.fulfilled, (state, action) => {
        if (!action.payload) return { ...state };
        const items = state.products.items.map((item) => {
          return item.product_id === action.payload.product.product_id
            ? action.payload.product
            : item;
        });
        return {
          ...state,
          products: { ...state.products, items },
          filteredItems: items,
          addProductMessage: "Product has been successfully edited!",
          selectedProduct: action.payload.product,
        };
      })
      .addCase(editProduct.rejected, (state, action) => {
        if (action.payload) {
          return {
            ...state,
            addProductError: action.payload.message,
          };
        } else {
          return { ...state };
        }
      })
      .addCase(removeProduct.fulfilled, (state, action) => {
        return {
          ...state,
          products: {
            ...state.products,
            items: state.products.items.filter(
              (product) => product.product_id !== action.payload.product_id,
            ),
          },
          filteredItems: state.products.items.filter(
            (product) => product.product_id !== action.payload.product_id,
          ),
        };
      });
  },
});

//selectors
export const selectProductsByCategories = ({
  products: { filteredItems },
}: RootState) => {
  const map: { [key: string]: Array<Product> } = {};
  for (const element of filteredItems) {
    if (element.deleted_at) continue;
    if (element.category in map) {
      map[element.category] = [...map[element.category], element];
    } else {
      map[element.category] = [element];
    }
  }
  let accumLength = 0;
  const array: Array<{
    category: string;
    items: Array<Product>;
    accumLength: number;
  }> = [];
  Object.keys(map).map((key) => {
    array.push({
      category: key,
      items: map[key],
      accumLength,
    });
    accumLength += map[key].length;
  });
  return array;
};

export const selectCategories = ({
  products: {
    products: { items },
  },
}: RootState) => {
  const map: Array<string> = [];
  for (const element of items) {
    if (element.deleted_at) continue;
    if (map.indexOf(element.category) < 0) {
      map.push(element.category);
    }
  }
  return map;
};

export const selectSelectedItem = ({
  products: { selectedProduct },
}: RootState) => selectedProduct;

export const selectIsSidePanelShown = ({
  products: { isSidePanelShown },
}: RootState) => isSidePanelShown;

export const selectState = ({
  products: {
    products: { state },
  },
}: RootState) => state;

export const selectAddError = ({ products: { addProductError } }: RootState) =>
  addProductError;

export const selectAddMessage = ({
  products: { addProductMessage },
}: RootState) => addProductMessage;

export const selectError = ({
  products: {
    products: { error },
  },
}: RootState) => error;

export const {
  selectProduct,
  search,
  toggleSidePanel,
  changeErrorMessage,
  changeAddErrorMessage,
  changeAddMessage,
} = productsSlice.actions;

export default productsSlice.reducer;
