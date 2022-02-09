import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import type { RootState } from '../index';
import api from '../../api';

interface HistoryListState {
  list: {
    id: number;
    name: string;
    updated_at: string;
    state: string;
    user_id: number | null;
    items: Array<{
      id: number;
      product_id: number;
      name: string;
      description: string;
      url: string;
      category: string;
      completed: boolean;
      pieces: number;
    }>;
  };
  status: string;
  error: string;
}

const initialState: HistoryListState = {
  list: {
    id: 0,
    name: '',
    updated_at: '',
    state: '',
    user_id: null,
    items: [],
  },
  status: 'idle',
  error: '',
};

// thunks
export const getList = createAsyncThunk(
  'products/loadList',
  async (id: number) => {
    const response = await api.getList(id);
    return response;
  }
);

export const historyListSlice = createSlice({
  name: 'historyList',
  initialState,
  reducers: {
    changeErrorMessage: (state) => {
      return {
        ...state,
        error: '',
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getList.fulfilled, (state, action: any) => {
        return { ...state, status: 'idle', error: '', list: action.payload };
      })
      .addCase(getList.pending, (state) => {
        return { ...state, status: 'loading' };
      })
      .addCase(getList.rejected, (state) => {
        return {
          ...state,
          status: 'idle',
          error: 'Something went wrong! Try again later!',
        };
      });
  },
});

export const selectItemsByCategories = ({
  historyList: {
    list: { items },
  },
}: RootState) => {
  const map: {
    [key: string]: Array<{
      product_id: number;
      name: string;
      description: string;
      url: string;
      category: string;
    }>;
  } = {};
  if (items.length === 0) {
    return [];
  }
  for (let i = 0; i < items.length; i++) {
    const completed = Boolean(items[i].completed);
    if (!completed) continue;
    if (items[i].category in map) {
      map[items[i].category] = [...map[items[i].category], items[i]];
    } else {
      map[items[i].category] = [items[i]];
    }
  }

  let accumLength = 0;
  const array: Array<{
    category: string;
    items: Array<{
      product_id: number;
      name: string;
      description: string;
      url: string;
      category: string;
    }>;
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

export const selectListName = (state: RootState) => state.historyList.list.name;

export const selectListDate = (state: RootState) =>
  state.historyList.list.updated_at;

export const selectState = ({ historyList: { status } }: RootState) => status;

export const selectError = ({ historyList: { error } }: RootState) => error;

export const { changeErrorMessage } = historyListSlice.actions;

export default historyListSlice.reducer;
