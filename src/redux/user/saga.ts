import { takeLatest, call, put } from "redux-saga/effects";
import ROUTE from "../../route/Route";
import { loader, toast } from "../common/common-reducer";
import { HttpResponse } from "../common/response-model";
import {shareHolderLogInAction, logoutAction, companyInfoAction, documentTypeListAction } from "./action";
import { companyInfoResponse, documentTypeListResponse, loginResponse, logoutResponse } from "./reducer";
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
        yield put(loader(false));
    } catch (err: any) {
        yield put(loader(false));
        yield put(toast({ message: err.message, type: 'error' }));
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
       window.location.href=ROUTE.LOGIN;
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


export function* userEffects() {
    yield takeLatest(shareHolderLogInAction.type, shareHolderLogin);
    yield takeLatest(logoutAction.type, logout);
    yield takeLatest(companyInfoAction.type, compnayInfo);
    yield takeLatest(documentTypeListAction.type, documentTypeList);
}

const userSagas = [call(userEffects)];

export default userSagas;
