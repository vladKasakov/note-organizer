import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Tag } from '../../models';

const initialState: Tag[] = [];

const tagSlice = createSlice({
  name: 'tags',
  initialState,
  reducers: {
    addTag(state, action: PayloadAction<Tag>) {
      if (!state.includes(action.payload)) {
        return [...state, action.payload];
      }
    },
    addTags(state, action: PayloadAction<Tag[]>) {
      const tags = action.payload;
      const validTags: Tag[] = [];

      for (let i = 0; i < tags.length; i++) {
        const tag = tags[i];

        if (!state.includes(tag)) {
          validTags.push(tag);
        }
      }

      return (state = [...state, ...validTags]);
    },
  },
});

export const { addTag, addTags } = tagSlice.actions;

export default tagSlice.reducer;
