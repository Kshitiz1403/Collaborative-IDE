import { createSlice } from '@reduxjs/toolkit';

const INITIAL_STATE = {
   isOpen: false,
   severity: 'error',
   message: '',
   timeout: 6000,
};

interface ISnack {
   message: string;
   timeout?: number;
   isError: boolean;
}

export const snackSlice = createSlice({
   name: 'snack',
   initialState: INITIAL_STATE,
   reducers: {
      setSnack: (state, action: { payload: ISnack }) => {
         let { message, timeout, isError } = action.payload;
         if (timeout == undefined) timeout = 6000;
         state.message = message;
         state.isOpen = true;
         state.timeout = timeout;
         isError ? (state.severity = 'error') : (state.severity = 'success');
         setTimeout(() => {
            return INITIAL_STATE;
         }, timeout);
      },
      reset: state => {
         state.isOpen = INITIAL_STATE.isOpen;
         state.message = INITIAL_STATE.message;
         state.timeout = INITIAL_STATE.timeout;
      },
   },
});

export const { reset: resetSnack, setSnack } = snackSlice.actions;

export default snackSlice.reducer;
