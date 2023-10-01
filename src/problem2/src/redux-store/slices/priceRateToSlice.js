import { createSlice } from '@reduxjs/toolkit';

const initialState = null; // Initial value for the "to" currency price rate

const priceRateToSlice = createSlice({
  name: 'priceRateTo',
  initialState,
  reducers: {
    setPriceRateTo: (state, action) => {
      return action.payload;
    },
  },
});

export const { setPriceRateTo } = priceRateToSlice.actions;
export default priceRateToSlice.reducer;
