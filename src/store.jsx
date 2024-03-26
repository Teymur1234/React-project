import { configureStore } from "@reduxjs/toolkit";
import BasketSlice from "./slice/BasketSlice";
import ProductSlice from "./slice/ProductSlice";


export const Store=configureStore({
    reducer:{
        basket:BasketSlice,
        products:ProductSlice
    }
})