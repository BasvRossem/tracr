// import { configureStore } from '@reduxjs/toolkit';
import logger from './daySlice';
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  reducer: {
    logger: logger,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;