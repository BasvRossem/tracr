import { configureStore } from '@reduxjs/toolkit';
import currentDate from './dateSlice';
import logger from './logSlice';
import token from './tokenSlice';

export default configureStore({
  reducer: {
    currentDate: currentDate,
    logger: logger,
    token: token
  },
})