import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
    name: "filter",
    initialState: {
        filter: {
            find: "all",
            date: "",
            show: 10,
            page: 1,
        }


    },
    reducers: {
        setFilterFind: (state, action) => {
            state.filter.find = action.payload;
        },
        setFilterDate: (state, action) => {
            state.filter.date = action.payload;
        },
        setFilterShow: (state, action) => {
            state.filter.show = action.payload;
        },
        setFilterPage: (state, action) => {
            state.filter.page = action.payload;
        },
    },
});


export const { setFilterFind, setFilterDate, setFilterShow, setFilterPage } = filterSlice.actions;
export default filterSlice.reducer;
