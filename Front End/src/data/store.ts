import { configureStore } from '@reduxjs/toolkit';
import currentDate from './dateSlice';
import logger from './logSlice';

export default configureStore({
  reducer: {
    currentDate: currentDate,
    logger: logger,
  },
})