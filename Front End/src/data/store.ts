import { configureStore } from '@reduxjs/toolkit';
import currentDate from './dateSlice';
import logger from './logSlice';
import selectedLog from './selectedLogSlice';

export default configureStore({
  reducer: {
    currentDate: currentDate,
    logger: logger,
    selectedLog: selectedLog
  },
})