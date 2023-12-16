import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { config } from "../config/config";

export const fetchOrders = createAsyncThunk('order_list/fetchOrders', async () => {
    try {
        const response = await axios.get(`${config.ordersApi}/orders`);
        return response.data;
    } catch (error) {
        console.error('Error fetching orders:', error);
        throw error;
    }
});

export const orderSlice = createSlice({
  name: "order_list",
  initialState: {
    orders: [],
    loading: false,
    viewOrderInfo: {},
  },
  reducers: {
    createOrder: (state, action) => {
      state.orders = [...state.orders, action.payload];
      state.loading = false;
      return state;
    },
    viewOrder: (state, actions) => {
      state.viewOrderInfo = actions.payload;
      state.loading = false;
      return state;
    },
    editOrder: (state, action) => {
      const updatedOrder = action.payload;
      const index = state.orders.findIndex(
        (order) => order.id === updatedOrder.id
      );
      if (index !== -1) {
        state.orders[index] = updatedOrder;
      }
    },
    deleteOrder: (state, action) => {
      const id = action.payload;
      state.orders = state.orders.filter((details) => details.id !== id);
    },
    setSideBarToggle: (state, action) => {
      state.sideBarToggle = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
        .addCase(fetchOrders.pending, (state) => {
            state.loading = true;
        })
        .addCase(fetchOrders.fulfilled, (state, action) => {
            state.loading = false;
            state.orders = action.payload;
        })
        .addCase(fetchOrders.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
    },
 
});
export const {
  createOrder,
  viewOrder,
  editOrder,
  deleteOrder,
  setLoading,
} = orderSlice.actions;

export default orderSlice.reducer;
