import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { INote } from '../../models';

const initialState = JSON.stringify([]);

const noteSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    addNote(state, action: PayloadAction<INote>) {
      return JSON.stringify([...JSON.parse(state), action.payload]);
    },
    removeNote(state, action: PayloadAction<number>) {
      const notes: INote[] = JSON.parse(state);
      return JSON.stringify(notes.filter((node) => node.id !== action.payload));
    },
    updateNote(state, action: PayloadAction<INote>) {
      const nodes: INote[] = JSON.parse(state);
      return JSON.stringify(
        nodes.map((node) =>
          node.id === action.payload.id ? action.payload : node
        )
      );
    },
  },
});

export const { addNote, removeNote, updateNote } = noteSlice.actions;

export default noteSlice.reducer;
