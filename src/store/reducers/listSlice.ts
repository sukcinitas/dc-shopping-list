import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import type { RootState } from "../index";
import api from "../../api";

interface ListState {
  list: {
    list_id: number | undefined;
    name: string;
    items: Array<{
      id: number | undefined;
      product_id: number;
      name: string;
      pieces: number;
      completed: boolean;
      category: string;
    }>;
    state: string;
  };
  status: string;
  error: string;
  message: string;
  itemPiecesMessage: string;
}

const initialState: ListState = {
  list: {
    list_id: undefined,
    name: "",
    items: [],
    state: "edit", // edit | active
  },
  status: "idle",
  error: "",
  message: "",
  itemPiecesMessage: "",
};

// thunks
export const getActiveList = createAsyncThunk(
  "products/loadActiveList",
  async () => {
    const response = await api.getActiveList();
    return response;
  }
);

export const saveList = createAsyncThunk(
  "products/saveActiveList",
  async (name: string, { getState }) => {
    const { list } = getState() as RootState;
    const items = list.list.items;
    const newItems = items.map(
      ({ pieces, product_id, completed, name, category }) => ({
        units: pieces,
        product_id,
        completed: completed ? "1" : "0",
        name,
        category,
      })
    );
    const response = await api.saveActiveList({
      ...list.list,
      items: newItems,
      name,
      state: "active",
    });
    return response;
  }
);

export const changeActiveListState = createAsyncThunk(
  "products/changeListState",
  async (state: "cancelled" | "completed", { getState }) => {
    const { list } = getState() as RootState;
    await api.changeActiveListState(list.list.list_id, state);
  }
);

export const toggleItemCompletion = createAsyncThunk(
  "products/toggleCompletion",
  async (
    state: { id: number | undefined; completed: true | false },
    { getState }
  ) => {
    const { list } = getState() as RootState;
    await api.toggleItemCompletion(
      list.list.list_id,
      state.id,
      state.completed ? "1" : "0"
    );
    return { id: state.id };
  }
);

export const listSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    changeMessage: (state) => {
      return { ...state, message: "" };
    },
    changeItemPiecesMessage: (state) => {
      return { ...state, itemPiecesMessage: "" };
    },
    editState: (state, action) => {
      return { ...state, list: { ...state.list, state: action.payload.state } };
    },
    addItem: (state, action) => {
      const item = state.list.items.find(
        (item) => item.product_id === action.payload.item.product_id
      );
      if (item) {
        return {
          ...state,
          list: {
            ...state.list,
            state: "edit",
            items: state.list.items.map((item) => {
              if (item.product_id === action.payload.item.product_id) {
                return { ...item, pieces: item.pieces + 1 };
              } else {
                return { ...item };
              }
            }),
          },
          itemPiecesMessage: `${item.name}: ${item.pieces + 1} pcs`,
        };
      }
      return {
        ...state,
        list: {
          ...state.list,
          state: "edit",
          items: [
            ...state.list.items,
            {
              ...action.payload.item,
              product_id: action.payload.item.product_id,
              id: undefined,
              pieces: 1,
              completed: false,
            },
          ],
        },
        itemPiecesMessage: `${action.payload.item.name} added to the list!`,
      };
    },
    removeItem: (state, action) => {
      return {
        ...state,
        list: {
          ...state.list,
          items: state.list.items.filter(
            (item) => item.product_id !== action.payload.id
          ),
        },
      };
    },
    increaseAmount: (state, action) => {
      return {
        ...state,
        list: {
          ...state.list,
          items: state.list.items.map((item) => {
            if (item.product_id === action.payload.id) {
              return { ...item, pieces: item.pieces + 1 };
            } else {
              return item;
            }
          }),
        },
      };
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
            if (item.product_id === action.payload.id) {
              return { ...item, pieces: item.pieces - 1 };
            } else {
              return item;
            }
          }),
        },
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getActiveList.pending, (state) => {
        return { ...state, status: "loading" };
      })
      .addCase(getActiveList.fulfilled, (state, action) => {
        const list = action.payload || {
          list_id: undefined,
          name: "",
          items: [],
          state: "edit", // edit | active
        };
        return {
          ...state,
          list: { ...list, state: "active" },
          status: "idle",
        };
      })
      .addCase(getActiveList.rejected, (state) => {
        return { ...state, status: "idle", error: "Something went wrong!" };
      })
      .addCase(saveList.fulfilled, (state, action) => {
        return {
          ...state,
          list: { ...action.payload.list, state: "active" },
        };
      })
      .addCase(changeActiveListState.fulfilled, () => {
        return {
          list: {
            list_id: undefined,
            name: "",
            items: [],
            state: "edit", // edit | active
          },
          error: "",
          status: "idle",
          message: "List has been successfully saved!",
          itemPiecesMessage: "",
        };
      })
      .addCase(toggleItemCompletion.fulfilled, (state, action) => {
        return {
          ...state,
          list: {
            ...state.list,
            items: state.list.items.map((item) => {
              if (item.id === action.payload.id) {
                return { ...item, completed: !item.completed };
              } else {
                return item;
              }
            }),
          },
        };
      });
  },
});

export const selectItemsByCategories = ({ list }: RootState) => {
  const map: {
    [key: string]: Array<{
      id: number | undefined;
      product_id: number;
      name: string;
      pieces: number;
      completed: boolean;
      category: string;
    }>;
  } = {};
  for (const element of list.list.items) {
    if (element.category in map) {
      map[element.category] = [...map[element.category], element];
    } else {
      map[element.category] = [element];
    }
  }
  return map;
};

export const selectNonCompletedAmount = ({ list }: RootState) => {
  if (!list?.list?.items) {
    return 0;
  }
  let count = 0;
  for (const element of list.list.items) {
    if (!element.completed) {
      count++;
    }
  }
  return count;
};

export const selectListName = (state: RootState) => state.list.list.name;

export const selectInEditState = (state: RootState) =>
  state.list.list.state === "edit";

export const selectStatus = (state: RootState) => state.list.status;

export const selectMessage = (state: RootState) => state.list.message;

export const selectItemPiecesMessage = (state: RootState) =>
  state.list.itemPiecesMessage;

export const {
  addItem,
  removeItem,
  increaseAmount,
  decreaseAmount,
  editState,
  changeMessage,
  changeItemPiecesMessage,
} = listSlice.actions;

export default listSlice.reducer;
