import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type UserState = {
    user: any;
    isLoggedIn: boolean;
    token:any;
    companyInfo: any;
    documentType:any[];
    egm: any[];
    reasonForm: any[];
    profile:any;
};

let initialState: UserState = {
    user: {},
    isLoggedIn: false,
    token:"",
    companyInfo:{},
    documentType: [],
    egm:[],
    reasonForm: [],
    profile:{}
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        loginResponse(state, action: PayloadAction<any>) {
            state.user = action.payload;
            state.isLoggedIn = true;
        },
        logoutResponse(state, action: PayloadAction<any>) {
            state.user = action.payload;
            state.isLoggedIn = false;
        },
        companyInfoResponse(state, action: PayloadAction<any>) {
            state.companyInfo = action.payload;
        },
        documentTypeListResponse(state, action: PayloadAction<any>) {
            state.documentType = action.payload;
        },
        documentUploadResponse(state, action: PayloadAction<any>) {
        },
        egmListResponse(state, action: PayloadAction<any>) {
            state.egm = action.payload;
        },
        updateUserResponse(state, action: PayloadAction<any>) {
            state.user = action.payload;
        }, 
        reasonFormResponse(state, action: PayloadAction<any>) {
            state.reasonForm = action.payload;
        },
        getProfileResponse(state, action: PayloadAction<any>) {
            state.profile = action.payload;
        },
    },
});

export const { 
    loginResponse, 
    logoutResponse, 
    companyInfoResponse,
    documentTypeListResponse,
    documentUploadResponse,
    egmListResponse,
    updateUserResponse,
    reasonFormResponse,
    getProfileResponse
} = userSlice.actions;

export default userSlice.reducer;
