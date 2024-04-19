import {configureStore} from '@reduxjs/toolkit'
import orders from "./../reducers/orders";

export default configureStore({
    reducer: {
        orders: orders,
    },
})