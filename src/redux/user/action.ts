import { createAction } from "@reduxjs/toolkit";
import { ShareholderRequest, UpdateUserRequest } from './model';

export const shareHolderLogInAction = createAction("shareholder/login", (Request: ShareholderRequest, navigate: any) => ({
    payload: { Request, navigate },
}));
export const logoutAction = createAction("user/logout", (navigate: any) => ({
    payload: { navigate },
}));
export const companyInfoAction = createAction("company/info", (Request: any) => ({
    payload: {Request },
}));
export const documentTypeListAction = createAction("documentType/list", (Request: any) => ({
    payload: {Request },
}));
export const documentUploadAction = createAction("document/Upload", (Request: any) => ({
    payload: {Request },
}));
export const getEgmAction = createAction("getEgm", (Request:any) => ({
    payload: {Request },
}));
export const updateUserAction = createAction("updateUser", (Request: UpdateUserRequest,id:any) => ({
    payload: {Request,id },
}));
