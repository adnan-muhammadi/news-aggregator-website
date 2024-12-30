import { configureStore } from "@reduxjs/toolkit";
import articlesReducer from './slices/articlesSlice';

// Load persisted state from localStorage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem("reduxState");
    return serializedState ? JSON.parse(serializedState) : undefined;
  } catch (error) {
    console.error("Failed to load state:", error);
    return undefined;
  }
};

// Save state to localStorage
const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("reduxState", serializedState);
  } catch (error) {
    console.error("Failed to save state:", error);
  }
};


export const store = configureStore({
    reducer: {
        articles: articlesReducer
    },
    preloadedState: loadState(),
})


// Subscribe to store changes and save state
store.subscribe(() => {
    saveState(store.getState());
});