import { createSlice } from '@reduxjs/toolkit';

const initialState = null; // Initial value for the "from" currency price rate

const priceRateFromSlice = createSlice({
  name: 'priceRateFrom',
  initialState,
  reducers: {
    setPriceRateFrom: (state, action) => {
      return action.payload;
    },
  },
});

export const { setPriceRateFrom } = priceRateFromSlice.actions;
export default priceRateFromSlice.reducer;
