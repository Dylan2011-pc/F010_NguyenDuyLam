// src/features/selectFrom/selectFromSlice.js
import { createSlice } from '@reduxjs/toolkit';

const selectFromSlice = createSlice({
  name: 'selectFrom',
  initialState: '',
  reducers: {
    setSelectedFrom: (state, action) => {
      return action.payload;
    },
  },
});

export const { setSelectedFrom } = selectFromSlice.actions;
export default selectFromSlice.reducer;
