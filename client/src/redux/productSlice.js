import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchSomeData = (type) => async (dispatch) => {
    dispatch(fetchDataPending(type));
    try {
        const response = await axios.get(`http://localhost:3000/api/${type}`);
        dispatch(fetchDataSuccess({ type, data: response.data }));
    } catch (error) {
        dispatch(fetchDataFailure({ type, error: error.message }));
    }
};
export const updateStatus = (id, productId) => async (dispatch) => {
    const response = await axios.get(`http://localhost:3000/api/order/${id}`)
    const order = response.data
    const updatedOrder = {
        ...order,
        status: "Thành công",
    }
    await axios.put(`http://localhost:3000/api/order/${id}`, updatedOrder)
    dispatch(updateOrderStatus({ id, productId }))
}
const initialState = {
    products: { data: [], status: null, error: null },
    order: { data: [], status: null, error: null },
    user: { data: [], status: null, error: null },
}

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        fetchDataPending: (state, action) => {
            state[action.payload].status = 'loading';
        },
        fetchDataSuccess: (state, action) => {
            state[action.payload.type].status = 'succeeded';
            state[action.payload.type].data = action.payload.data;
        },
        fetchDataFailure: (state, action) => {
            state[action.payload.type].status = 'failed';
            state[action.payload.type].error = action.payload.error;
        },
        updateOrderStatus: (state, action) => {
            const { id, productId } = action.payload;
            const orderIndex = state.order.data.findIndex((item) => item.id === id);
            state.order.data[orderIndex].status = "Thành công";
            // const productIndex = state.products.data.findIndex((item) => item.id === productId);
            // console.log("productIndex", productIndex);
            // console.log("state.products.data", state.products);
        },
        editUser: (state, action) => {

        }
    },
});

export const { fetchDataSuccess, updateOrderStatus, fetchDataPending, fetchDataFailure } = productSlice.actions;

export default productSlice.reducer;
