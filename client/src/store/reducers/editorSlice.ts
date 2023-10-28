import { createSlice } from '@reduxjs/toolkit';

const INITIAL_STATE = {
   filePath: '',
   slug: '',
   value: '',
   fileName: '',
   language: '',
   saved: false,
   console: '',
};

export const editorSlice = createSlice({
   name: 'editor',
   initialState: INITIAL_STATE,
   reducers: {
      setFilePath: (state, action) => {
         state.filePath = action.payload;
      },
      setFileName: (state, action) => {
         state.fileName = action.payload;
      },
      setLanguage: (state, action) => {
         state.language = action.payload;
      },
      setSaved: state => {
         state.saved = true;
      },
      setUnsaved: state => {
         state.saved = false;
      },
      setValue: (state, action) => {
         state.value = action.payload;
      },
      reset: state => {
         return INITIAL_STATE;
      },
      setConsole: (state, action) => {
         state.console = action.payload;
      },
   },
});

export const { setFilePath, setFileName, setLanguage, setSaved, setUnsaved, setValue, reset, setConsole } =
   editorSlice.actions;
export default editorSlice.reducer;
