import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
export const fetchSomeData = (type) => async (dispatch) => {
    dispatch(fetchDataPending(type));
    try {
        const response = await axios.get(`https://shop-server-b86ab-default-rtdb.asia-southeast1.firebasedatabase.app/${type}.json`);
        const data = response.data;
        // Chuyển đổi dữ liệu thành mảng các đối tượng với thuộc tính id
        const dataArray = Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
        }));
        dispatch(fetchDataSuccess({ type, data: dataArray }));
    } catch (error) {
        dispatch(fetchDataFailure({ type, error: error.message }));
    }
};

export const updateStatus = (id, productId) => async (dispatch) => {
    const response = await axios.get(`https://shop-server-b86ab-default-rtdb.asia-southeast1.firebasedatabase.app/order/${id}.json`);
    const order = response.data;

    const updatedOrder = {
        ...order,
        status: 'Thành công',
    };
    console.log("updatedOrder1", updatedOrder, "id1", id, "order1", order)

    await axios.put(`https://shop-server-b86ab-default-rtdb.asia-southeast1.firebasedatabase.app/order/${id}.json`, updatedOrder);
    dispatch(updateOrderStatus({ id, productId }));

};
export const updateQuantityOrder = (id, quantity) => async (dispatch) => {
    const response = await axios.get('https://shop-server-b86ab-default-rtdb.asia-southeast1.firebasedatabase.app/products.json');
    const result = response.data;
    // const order = result.find((item) => item.id === id);
    // console.log('result', result[0]);
    // const updatedOrder = {
    //     ...order,
    //     quantity: quantity,
    // };
    // console.log('updatedOrder', updatedOrder, 'id', id, 'order', order);
    // await axios.put(`https://shop-server-b86ab-default-rtdb.asia-southeast1.firebasedatabase.app/products/${id}.json`, updatedOrder);
};


const initialState = {
    products: { data: [], status: null, error: null },
    order: { data: [], status: null, error: null },
    user: { data: [], status: null, error: null },
    contact: { data: [], status: null, error: null },
};

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
            state.order.data[orderIndex].status = 'Thành công';
            // const productIndex = state.products.data.findIndex((item) => item.id === productId);
            // console.log("productIndex", productIndex);
            // console.log("state.products.data", state.products);
        },

    },
});

export const {
    fetchDataSuccess,
    updateOrderStatus,
    fetchDataPending,
    fetchDataFailure,

} = productSlice.actions;

export default productSlice.reducer;
