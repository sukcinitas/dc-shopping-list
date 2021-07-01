import { createSlice } from '@reduxjs/toolkit';

export const monthlySlice = createSlice({
    name: 'monthly',
    initialState: {
            items: [{ month: 'January', items: 104 }, 
            { month: 'February', items: 104 }, 
            { month: 'March', items: 104 }, 
            { month: 'April', items: 104 }, 
            { month: 'May', items: 104 }, 
            { month: 'June', items: 4 }, 
            { month: 'July', items: 10 }, 
            { month: 'August', items: 204 }, 
            { month: 'September', items: 104 }, 
            { month: 'October', items: 304 }, 
            { month: 'November', items: 14 }, 
            { month: 'December', items: 104 }, ],
            error: '',
            status: 'loading', // loading | success | error
    },
    reducers: {}
});

export const selectMonthlyItems = ({ monthly: { items }}: any) => {
    const index = (new Date()).getMonth();
    return items.slice(index - 3, index + 4);
};

export const {  } = monthlySlice.actions;

export default monthlySlice.reducer;