import { createSlice } from '@reduxjs/toolkit';

const selectToSlice = createSlice({
  name: 'selectTo',
  initialState: '',
  reducers: {
    setSelectedTo: (state, action) => {
      return action.payload;
    },
  },
});

export const { setSelectedTo } = selectToSlice.actions;
export default selectToSlice.reducer;
