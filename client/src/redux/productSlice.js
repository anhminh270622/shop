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
export const updateStatus = (id) => async (dispatch) => {
    console.log(id)
    const response = await axios.get(`http://localhost:3000/api/order/${id}`)
    const order = response.data
    const updatedOrder = {
        ...order,
        status: "Thành công",
    }
    await axios.put(`http://localhost:3000/api/order/${id}`, updatedOrder)
    dispatch(updateOrderStatus(id))
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
            const index = state.order.data.findIndex((item) => item.id === action.payload)
            state.order.data[index].status = "thành công"
            console.log("index", index, "status", state.order.data[index].status)
            // if (index !== -1) {
            //     state.order.data[index].status = state.order.data[index].status
            // } else {
            //     state.order.data[index].status = "Thành Công"
            // }
        },
    },
});

export const { fetchDataSuccess, updateOrderStatus, fetchDataPending, fetchDataFailure } = productSlice.actions;

export default productSlice.reducer;
