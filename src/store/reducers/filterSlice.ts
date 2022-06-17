import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Tag } from '../../models';

const initialState: Tag[] = [];

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilter(state, action: PayloadAction<Tag[]>) {
      return action.payload;
    },
    appendTagToFilter(state, action: PayloadAction<Tag>) {
      return [...state, action.payload];
    },
  },
});

export const { setFilter, appendTagToFilter } = filterSlice.actions;

export default filterSlice.reducer;
