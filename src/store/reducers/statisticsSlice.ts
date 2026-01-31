import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import type { RootState } from "../index";
import api from "../../api";

interface StatisticsState {
  status: string;
  error: string;
  monthlyStatistics: Array<{
    month: string;
    items: number;
  }>;
  topItems: Array<{ name: string; percent: number }>;
  topCategories: Array<{ name: string; percent: number }>;
}

const initialState: StatisticsState = {
  monthlyStatistics: [],
  topItems: [],
  topCategories: [],
  error: "",
  status: "loading", // loading | idle
};

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
// thunks
export const getStatisticsInfo = createAsyncThunk(
  "products/getInfo",
  async () => {
    const monthlyStatisticsInitial = await api.getMontlyStatistics();
    const monthlyStatistics = monthlyStatisticsInitial.map(
      (m: { month: string; items: number }) => ({
        month: months[parseInt(m.month) - 1],
        items: m.items,
      }),
    );
    const topItems = await api.getTopItems();
    const topCategories = await api.getTopCategories();
    return { monthlyStatistics, topItems, topCategories };
  },
);

export const statisticsSlice = createSlice({
  name: "statistics",
  initialState,
  reducers: {
    changeErrorMessage: (state) => {
      return {
        ...state,
        error: "",
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getStatisticsInfo.pending, (state) => {
        return { ...state, status: "loading" };
      })
      .addCase(getStatisticsInfo.fulfilled, (state, action) => {
        return { ...state, status: "idle", error: "", ...action.payload };
      })
      .addCase(getStatisticsInfo.rejected, (state) => {
        return {
          ...state,
          status: "idle",
          error: "Something went wrong! Try again later!",
        };
      });
  },
});

export const selectMonthlyItems = ({
  statistics: { monthlyStatistics },
}: RootState) => {
  const index = new Date().getMonth();
  if (monthlyStatistics.length < 12) return monthlyStatistics;
  return monthlyStatistics.slice(index - 3, index + 4);
};

export const selectTopItems = ({ statistics: { topItems } }: RootState) =>
  topItems;

export const selectTopCategories = ({
  statistics: { topCategories },
}: RootState) => topCategories;

export const selectState = ({ statistics: { status } }: RootState) => status;

export const selectError = ({ statistics: { error } }: RootState) => error;

export const { changeErrorMessage } = statisticsSlice.actions;

export default statisticsSlice.reducer;
