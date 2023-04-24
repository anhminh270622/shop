import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const SERVER_URL = 'http://localhost:3000/api';

export const addProductToCart = createAsyncThunk(
    'cart/addProductToCart',
    async ({ userId, product }) => {
        const response = await axios.post(`${SERVER_URL}/carts/${userId}`, product);
        return response.data;
    }
);

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addProductToCart.pending, (state) => {
                state.loading = true;
            })
            .addCase(addProductToCart.fulfilled, (state, action) => {
                state.items = action.payload.cart;
                state.loading = false;
            })
            .addCase(addProductToCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default cartSlice.reducer;