import { configureStore } from '@reduxjs/toolkit';
import logger from './logSlice';

export default configureStore({
  reducer: {
    logger: logger,
  },
})