import { createSlice } from '@reduxjs/toolkit';

const INITIAL_STATE = {
   isLoggedIn: false,
   username: '',
   token: '',
   isSigninigIn: true,
   isLoading: true,
   user: {},
};
export const authSlice = createSlice({
   name: 'auth',
   initialState: INITIAL_STATE,
   reducers: {
      loginUser: (state, action) => {
         state.isLoggedIn = true;
         const token = action.payload;
         state.token = token;
         state.isLoading = false;
      },
      setUser: (state, action) => {
         state.user = action.payload;
      },
      setSigningUp: state => {
         state.isSigninigIn = false;
      },
      setLoggingIn: state => {
         state.isSigninigIn = true;
      },
      toggleLoginState: state => {
         state.isSigninigIn = !state.isSigninigIn;
      },
      logoutUser: state => {
         return { ...INITIAL_STATE, isLoading: false };
      },
      setLoaded: state => {
         state.isLoading = false;
      },
   },
});

export const { loginUser, setUser, setSigningUp, setLoggingIn, logoutUser, setLoaded, toggleLoginState } =
   authSlice.actions;

export default authSlice.reducer;
