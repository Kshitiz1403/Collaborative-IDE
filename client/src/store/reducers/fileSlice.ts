import { createSlice } from '@reduxjs/toolkit';

const INITIAL_STATE = {
   tree: '',
   treeLoaded: false,
   isSaving: false,
};

export const fileSlice = createSlice({
   name: 'file',
   initialState: INITIAL_STATE,
   reducers: {
      setTree: (state, action) => {
         state.tree = action.payload;
      },
      setTreeLoaded: state => {
         state.treeLoaded = true;
      },
      setSaving: state => {
         state.isSaving = true;
      },
      setSaved: state => {
         state.isSaving = false;
      },
   },
});

export const { setTree, setTreeLoaded, setSaving, setSaved } = fileSlice.actions;

export default fileSlice.reducer;
