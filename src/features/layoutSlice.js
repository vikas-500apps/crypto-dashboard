import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  components: [
    { id: 'table', type: 'table', order: 0 }, // Default table component
  ],
  theme: 'dark', // Set default theme to dark
  filter: 'all',
};

const layoutSlice = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    addComponent: (state, action) => {
      state.components.push(action.payload);
    },
    removeComponent: (state, action) => {
      state.components = state.components.filter((comp) => comp.id !== action.payload);
    },
    updateComponentOrder: (state, action) => {
      state.components = action.payload;
    },
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
    setLayout: (state, action) => {
      return { ...state, ...action.payload };
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
});

export const {
  addComponent,
  removeComponent,
  updateComponentOrder,
  toggleTheme,
  setLayout,
  setFilter,
} = layoutSlice.actions;

export default layoutSlice.reducer;
