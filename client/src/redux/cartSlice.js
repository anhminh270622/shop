import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { fetchSomeData } from "./productSlice";
// export const addToCartById = (productId) => async (dispatch) => {
//     console.log("productId", productId);
//     try {
//         const response = await axios.post("http://localhost:3000/api/carts", { productId });
//         // console.log("response", response.data);

//         dispatch(addItem(response.data));
//     } catch (error) {
//         console.log(error);
//     }
// };
// export const removeCart = (id) => async (dispatch, getState) => {
//     try {
//         await axios.delete(`http://localhost:3000/api/carts/${id}`);
//         dispatch(removeItem(id));
//         console.log('redux xóa ', id);
//     } catch (error) {
//         console.log(error);
//     }
// };
const cartSlice = createSlice({
    name: "car",
    initialState: {
        items: localStorage.getItem("productCart")
            ? JSON.parse(localStorage.getItem("productCart"))
            : [],
        quantityCart: localStorage.getItem("productCart")
            ? JSON.parse(localStorage.getItem("productCart")).length
            : 0,
    },
    reducers: {
        addItem: (state, action) => {
            const index = state.items.findIndex((item) => item.id === action.payload.id);
            const size = state.items.findIndex((item) => item.size === action.payload.size);
            if (index === -1 && size === -1) {
                state.items.push(action.payload);
                state.quantityCart += 1;
            } else if (index === 0 && size === -1) {
                state.items.push(action.payload);
                state.quantityCart += 1;
            }
            else {
                state.items[index].quantity += action.payload.quantity;
            }
            localStorage.setItem("productCart", JSON.stringify(state.items));
            console.log("index", index, "size", size)
        },
        removeItem: (state, action) => {
            const idToRemove = action.payload.id;
            state.items = state.items.filter((cartItem) => cartItem.id !== idToRemove);
            state.quantityCart -= 1
            localStorage.setItem("productCart", JSON.stringify(state.items))
        },

        clearCart: (state) => {
            state.items = [];
        },
    },


});

export const { addItem, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
