import {createSlice} from '@reduxjs/toolkit';

export const ordersSlice = createSlice({
    name: 'orders',
    initialState: {
        value: {}
    },
    reducers: {
        update(state, action) {
            if (typeof state.value !== 'object' || state.value === null) {
                state.value = {};
            }

            state.value[action.payload.id] = action.payload;

            localStorage.setItem("orders", JSON.stringify(state.value));
        },

        remove(state, action) {
            delete state.value[action.payload.id];
            localStorage.setItem("orders", JSON.stringify(state.value));
        },

        init(state) {
            state.value = JSON.parse(localStorage.getItem("orders")) || {}; // Используем пустой объект, если данные в localStorage отсутствуют
            console.log("init");
        },
    },
});

export const {update, remove, init} = ordersSlice.actions;
export default ordersSlice.reducer;
