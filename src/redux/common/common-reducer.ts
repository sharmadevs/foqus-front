import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type CommonState = {
    loader: boolean,
    toast: any
};

let initialState: CommonState = {
    loader: false,
    toast: null
};

const commonSlice = createSlice({
    name: "common",
    initialState,
    reducers: {
        loader(state, action: PayloadAction<any>) {
            state.loader = action.payload;
        },
        toast(state, action: PayloadAction<any>) {
            state.toast = action.payload;
        }
    },
});

export const { loader, toast } = commonSlice.actions;

export default commonSlice.reducer;
