import { takeLatest, call, put } from "redux-saga/effects";
import ROUTE from "../../route/Route";
import { loader, toast } from "../common/common-reducer";
import { HttpResponse } from "../common/response-model";
import {shareHolderLogInAction, logoutAction, companyInfoAction, documentTypeListAction, updateUserAction, documentUploadAction, getEgmAction, getReasonFormAction, getProfileAction } from "./action";
import { companyInfoResponse, documentTypeListResponse, documentUploadResponse, egmListResponse, loginResponse, logoutResponse, updateUserResponse, reasonFormResponse ,getProfileResponse} from "./reducer";
import { UserService } from "./service";

export function* shareHolderLogin(data: any) {
    try {
        yield put(loader(true));
        let payload = data.payload;
        let { Request, navigate } = payload;
        let res: HttpResponse<any> = yield call(UserService.getInstance().shareHolderLogin, Request);
        let response: any = res;
        yield localStorage.setItem("focus:user", JSON.stringify(response?.data?.user));
        yield localStorage.setItem("focus:token", response?.data?.token);
        yield put(loginResponse(response.data));
       setTimeout(()=>navigate(ROUTE.UPLOAD_DOCUMENT),1000);
       yield put(toast({ message: "Login successfully", type: 'success' }));
        yield put(loader(false));
    } catch (err: any) {
        yield put(loader(false));
        yield put(toast({ message: err?.meta?.devMessage, type: 'error' }));
    }
}
export function* logout(data: any) {
    try {
        yield put(loader(true));
        let payload = data.payload;
        let { navigate } = payload;
        localStorage.removeItem("focus:user");
        localStorage.removeItem("focus:token");
        yield put(logoutResponse({}));
        navigate(ROUTE.LOGIN)
       /* window.location.href=ROUTE.LOGIN; */
       yield put(toast({ message: "Logout successfully", type: 'success' }));
        yield put(loader(false));
    } catch (err: any) {
        yield put(loader(false));
        yield put(toast({ message: err.message, type: 'error' }));
    }
}

export function* compnayInfo(data: any) {
    try {
        yield put(loader(true));
        let payload = data.payload;
        let { Request } = payload;
        let res: HttpResponse<any> = yield call(UserService.getInstance().companyInfo, Request);
        let response: any = res;
        yield put(companyInfoResponse(response?.data));
        yield put(loader(false));
    } catch (err: any) {
        yield put(loader(false));
        yield put(toast({ message: err.message, type: 'error' }));
    }
}
export function* documentTypeList(data: any) {
    try {
        yield put(loader(true));
        let payload = data.payload;
        let { Request } = payload;
        let res: HttpResponse<any> = yield call(UserService.getInstance().documentTypeList, Request);
        let response: any = res;
        yield put(documentTypeListResponse(response?.data));
        yield put(loader(false));
    } catch (err: any) {
        yield put(loader(false));
        yield put(toast({ message: err.message, type: 'error' }));
    }
}
export function* documentUpload(data: any) {
    try {
        yield put(loader(true));
        let payload = data.payload;
        let { Request } = payload;
        let res: HttpResponse<any> = yield call(UserService.getInstance().documentUpload, Request);
        let response: any = res;
        yield put(documentUploadResponse(response?.data));
        /* yield put(toast({ message: "File Upload successfully", type: 'success' })); */
        yield put(loader(false));
    } catch (err: any) {
        yield put(loader(false));
        yield put(toast({ message: err.message, type: 'error' }));
    }
}
export function* getEgm(data: any) {
    try {
        yield put(loader(true));
        let payload = data.payload;
        let {Request} = payload;
        let res: HttpResponse<any> = yield call(UserService.getInstance().getEgm, Request);
        let response: any = res;
        yield put(egmListResponse(response?.data));
        yield put(loader(false));
    } catch (err: any) {
        yield put(loader(false));
        yield put(toast({ message: err.message, type: 'error' }));
    }
}
export function* getReasonForm(data: any) {
    try {
        yield put(loader(true));
        let payload = data.payload;
        let {Request} = payload;
        let res: HttpResponse<any> = yield call(UserService.getInstance().getReasonForm, Request);
        let response: any = res;
        yield put(reasonFormResponse(response?.data));
        yield put(loader(false));
    } catch (err: any) {
        yield put(loader(false));
        yield put(toast({ message: err.message, type: 'error' }));
    }
}

export function* updateUserList(data: any) {
    try {
        yield put(loader(true));
        let payload = data.payload;
        let { Request,id } = payload;
        let res: HttpResponse<any> = yield call(UserService.getInstance().updateUserList, Request,id);
        let response: any = res;
        yield put(updateUserResponse(response?.data));
        yield put(toast({ message: "Update successfully", type: 'success' }));
        yield put(loader(false));
    } catch (err: any) {
        yield put(loader(false));
        yield put(toast({ message: err.message, type: 'error' }));
    }
}
export function* getProfile(data: any) {
    try {
        yield put(loader(true));
        let res: HttpResponse<any> = yield call(UserService.getInstance().getProfile);
        let response: any = res;
        yield put(getProfileResponse(response?.data));
        yield put(loader(false));
    } catch (err: any) {
        yield put(loader(false));
        yield put(toast({ message: err.message, type: 'error' }));
    }
}
export function* userEffects() {
    yield takeLatest(shareHolderLogInAction.type, shareHolderLogin);
    yield takeLatest(logoutAction.type, logout);
    yield takeLatest(companyInfoAction.type, compnayInfo);
    yield takeLatest(documentTypeListAction.type, documentTypeList);
    yield takeLatest(documentUploadAction.type, documentUpload);
    yield takeLatest(getEgmAction.type, getEgm);
    yield takeLatest(updateUserAction.type, updateUserList);
    yield takeLatest(getReasonFormAction.type, getReasonForm);
    yield takeLatest(getProfileAction.type, getProfile);
}

const userSagas = [call(userEffects)];

export default userSagas;
