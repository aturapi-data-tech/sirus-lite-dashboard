import { configureStore } from "@reduxjs/toolkit";
import filterSlice from "./slices/filterSlice";


const store = configureStore({
    reducer: {
        filter: filterSlice
    }
});

// console.log('create', store.getState());


store.subscribe(() => {
    // console.log('update', store.getState());
})

export default store;
