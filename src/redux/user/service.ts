import Api from "../common/api";
import { HttpResponse } from "../common/response-model";
import { Url } from "../common/url";
import {ShareholderRequest, UpdateUserRequest } from "./model";

export class UserService {
    private static instance: UserService;
    private constructor() { }

    public static getInstance(): UserService {
        if (!UserService.instance) {
            UserService.instance = new UserService();
        }
        return UserService.instance;
    }

    public shareHolderLogin = async (data: ShareholderRequest): Promise<HttpResponse<any>> => {
        return await Api.post(Url.shareHolderLogin, data);
    };
    public companyInfo = async (data: any): Promise<HttpResponse<any>> => {
        return await Api.get(Url.companyinfo);
    };
    public documentTypeList = async (data: any): Promise<HttpResponse<any>> => {
        return await Api.get(`${Url.documentTypeList}?proxy_type=${data?.proxy_type}`);
    };
    public documentUpload = async (data: any): Promise<HttpResponse<any>> => {
        return await Api.post(Url.documentUpload, data);
    };
    public getEgm = async (Request:any): Promise<HttpResponse<any>> => {
        return await Api.get(Url.getEgm, Request);
    };
    public updateUserList = async (data: UpdateUserRequest, id:any): Promise<HttpResponse<any>> => {
        return await Api.put(Url.updateUser + id, data);
    };
    public getReasonForm = async (Request:any): Promise<HttpResponse<any>> => {
        return await Api.get(Url.getReasonForm, Request);
    };
    public getProfile = async (): Promise<HttpResponse<any>> => {
        return await Api.get(Url.getProfile);
    };
}
