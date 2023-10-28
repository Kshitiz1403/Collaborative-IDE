import { configureStore } from '@reduxjs/toolkit';
import authSlice from './reducers/authSlice';
import projectSlice from './reducers/projectSlice';
import editorSlice from './reducers/editorSlice';
import snackSlice from './reducers/snackSlice';
import fileSlice from './reducers/fileSlice';

export default configureStore({
   reducer: {
      auth: authSlice,
      project: projectSlice,
      editor: editorSlice,
      snack: snackSlice,
      file: fileSlice,
   },
});
