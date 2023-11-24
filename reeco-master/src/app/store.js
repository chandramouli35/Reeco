import { configureStore } from '@reduxjs/toolkit';
import orderDataReducer from '../components/orderData/orderDataSlice';

const store = configureStore({
  reducer: {
    orderData: orderDataReducer,
  },
});

export default store;
