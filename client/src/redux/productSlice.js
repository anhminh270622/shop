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
    },
});

export const { fetchDataPending, fetchDataSuccess, fetchDataFailure } = productSlice.actions;

export default productSlice.reducer;
