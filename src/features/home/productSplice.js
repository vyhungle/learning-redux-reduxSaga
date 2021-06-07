import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  products:[]
};

export const ProductSplice = createSlice({
  name: "products",
  initialState,
  reducers: {
    productsPending: (state) => {
      state.isLoading = true;
    },
    productsSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.products = payload.products;    
    },
    productsFail: (state) => {
      state.isLoading = false;
    },
  },
});

export const { productsSuccess, productsPending, productsFail } = ProductSplice.actions;

export default ProductSplice.reducer;
