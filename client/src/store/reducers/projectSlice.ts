import { createSlice } from '@reduxjs/toolkit';

const INITIAL_STATE = {
   adminUsername: '',
   name: '',
   language: '',
   defaultFile: '',
   slug: '',
   projects: [],
   project: {},
   isSlugValid: false,
   loading: true,
};
export const projectSlice = createSlice({
   name: 'project',
   initialState: INITIAL_STATE,
   reducers: {
      setProjects: (state, action) => {
         state.projects = action.payload;
      },
      setProject: (state, action) => {
         state.project = action.payload;
      },
      setActiveLanguage: (state, action) => {
         state.language = action.payload;
      },
      setActiveName: (state, action) => {
         state.name = action.payload;
      },
      setAdminUsername: (state, action) => {
         state.adminUsername = action.payload;
      },
      setDefaultFile: (state, action) => {
         state.defaultFile = action.payload;
      },
      setSlug: (state, action) => {
         state.slug = action.payload;
      },
      setSlugValid: state => {
         state.isSlugValid = true;
      },
      setSlugInvalid: state => {
         state.isSlugValid = false;
      },
      setLoading: state => {
         state.loading = true;
      },
      setLoaded: state => {
         state.loading = false;
      },
   },
});

export const {
   setProjects,
   setActiveLanguage,
   setActiveName,
   setAdminUsername,
   setDefaultFile,
   setSlug,
   setSlugValid,
   setSlugInvalid,
   setLoading,
   setLoaded,
   setProject,
} = projectSlice.actions;

export default projectSlice.reducer;
