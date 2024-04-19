import {createSlice} from "@reduxjs/toolkit";

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
            state.value = JSON.parse(localStorage.getItem("orders")) || {};
        },

        add(state, action) {
            const {id, text} = action.payload;
            state.value[id] = {id, text};
            localStorage.setItem("orders", JSON.stringify(state.value));
        }
    },
});

export const {update, remove, init, add} = ordersSlice.actions;
export default ordersSlice.reducer;