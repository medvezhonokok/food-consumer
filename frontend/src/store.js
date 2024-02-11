import {configureStore} from '@reduxjs/toolkit'
import ordersReducer from "./reducers/orders";

export default configureStore({
    reducer: {
        orders: ordersReducer,
    },
})