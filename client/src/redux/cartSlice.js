import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { fetchSomeData } from "./productSlice";
const cartSlice = createSlice({
    name: "car",
    initialState: {
        items: localStorage.getItem("productCart")
            ? JSON.parse(localStorage.getItem("productCart"))
            : [],
        quantityCart: localStorage.getItem("productCart")
            ? JSON.parse(localStorage.getItem("productCart")).length
            : 0,
        // quantityProduct: 0
    },

    reducers: {
        addItem: (state, action) => {
            // nếu sai trả về -1
            const index = state.items.findIndex((item) => item.id === action.payload.id && item.size === action.payload.size);
            if (index === -1) {
                state.items.push(action.payload);
                state.quantityCart += 1;
            } else {
                state.items[index].quantity += action.payload.quantity;
            }
            localStorage.setItem("productCart", JSON.stringify(state.items));
        },
        removeItem: (state, action) => {
            const idToRemove = action.payload.id;
            const sizeToRemove = action.payload.size;
            state.items = state.items.filter((cartItem) => !(cartItem.id === idToRemove && cartItem.size === sizeToRemove));
            state.quantityCart -= 1
            localStorage.setItem("productCart", JSON.stringify(state.items))
        },
        clearCart: (state) => {
            state.items = [];
            localStorage.setItem("productCart", JSON.stringify(state.items))
            state.quantityCart = 0;
        },
        quantityIncrease: (state, action) => {
            const index = state.items.findIndex((item) => item.id === action.payload.id);
            state.items[index].quantity += 1;
        },
        quantityReduce: (state, action) => {
            const index = state.items.findIndex((item) => item.id === action.payload.id);
            state.items[index].quantity -= 1;
        }
    },


});

export const { addItem, removeItem, clearCart, quantityIncrease, quantityReduce } = cartSlice.actions;
export default cartSlice.reducer;
