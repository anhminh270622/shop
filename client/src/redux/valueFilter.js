import { createSlice } from "@reduxjs/toolkit";
const valueFilter = createSlice({
    name: "value",
    initialState: {
        items: [],
        data: [],
    },
    reducers: {
        addValue: (state, action) => {
            // const check = state.items.findIndex(check => check === action.payload)
            // const remove = state.items.filter(remove => remove === action.payload)
            // // console.log("check", check)
            // if (check === -1) {
            //     state.items = action.payload;
            // } else {
            //     state.items = action.payload;
            // }
            state.items = action.payload;
        },
        addTrademark: (state, action) => {
            const check = state.data.findIndex(check => check === action.payload)
            const remove = state.data.filter(remove => remove !== action.payload)
            if (check === -1) {
                state.data.push(action.payload)
            } else {
                state.data = remove
            }
        }
    }
})
export const { addValue, addTrademark } = valueFilter.actions
export default valueFilter.reducer;
