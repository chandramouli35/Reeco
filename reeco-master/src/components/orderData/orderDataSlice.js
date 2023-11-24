import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  orderData: [],
  error: '',
};

export const fetchData = createAsyncThunk('fetchOrderData', () => {
  return fetch('data.json')
    .then((res) => res.json())
    .then((data) => {
      return data;
    });
});

export const orderDataSlice = createSlice({
  name: 'orderData',
  initialState,
  reducers: {
    updateData: (state, action) => {
      let id = action.payload['id'];
      let nStatus = action.payload['status'];
      let nPrice;
      let nQuantity;
      let nTotal;

      if (!(action.payload['price'] || action.payload['price'] === 0)) {
        nPrice = state.orderData[id].price;
      } else {
        nPrice = action.payload['price'];
      }
      if (!(action.payload['quantity'] || action.payload['quantity'] === 0)) {
        nQuantity = state.orderData[id].quantity;
      } else {
        nQuantity = action.payload['quantity'];
      }
      if (!(action.payload['total'] || action.payload['total'] === 0)) {
        nTotal = state.orderData[id].total;
      } else {
        nTotal = action.payload['total'];
      }
      
      state.orderData[id].status = nStatus;
      state.orderData[id].price = nPrice;
      state.orderData[id].quantity = nQuantity;
      state.orderData[id].total = nTotal;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.loading = false;
      state.orderData = action.payload;
      state.error = '';
    });
    builder.addCase(fetchData.rejected, (state, action) => {
      state.loading = false;
      state.orderData = [];
      state.error = action.error.message;
    });
  },
});

export const { updateData } = orderDataSlice.actions;

export default orderDataSlice.reducer;
