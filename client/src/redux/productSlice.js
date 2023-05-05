import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchSomeData = (type) => async (dispatch) => {
    dispatch(fetchDataPending());
    try {
        const response = await axios.get(`http://localhost:3000/api/${type}`);
        dispatch(fetchDataSuccess(response.data));
        // console.log("responsedatacart", response.data);
    } catch (error) {
        // dispatch(fetchDataFailure(error.message));
    }
};
export const productSlide = createSlice({
    name: 'productSlide',
    initialState: {
        data: [],
        status: null,
        error: null,
    },
    reducers: {
        fetchDataPending: (state) => {
            state.status = 'loading';
        },
        fetchDataSuccess: (state, action) => {
            state.status = 'succeeded';
            state.data = action.payload;
        },
        fetchDataFailure: (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
        },
    },
});

export const { fetchDataPending, fetchDataSuccess, fetchDataFailure } = productSlide.actions;

export default productSlide.reducer;
