import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type UserState = {
    user: any;
    isLoggedIn: boolean;
    token:any;
    companyInfo: any;
    documentType:any[];
    documentList: any[];
};

let initialState: UserState = {
    user: {},
    isLoggedIn: false,
    token:"",
    companyInfo:{},
    documentType: [],
    documentList:[],
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
        uploadedFileListResponse(state, action: PayloadAction<any>) {
            state.documentList = action.payload;
        },
        updateUserResponse(state, action: PayloadAction<any>) {
            state.user = action.payload;
        }, 
    },
});

export const { 
    loginResponse, 
    logoutResponse, 
    companyInfoResponse,
    documentTypeListResponse,
    documentUploadResponse,
    uploadedFileListResponse,
    updateUserResponse
} = userSlice.actions;

export default userSlice.reducer;
