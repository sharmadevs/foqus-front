import { takeLatest, call, put } from "redux-saga/effects";
import ROUTE from "../../route/Route";
import { loader, toast } from "../common/common-reducer";
import { HttpResponse } from "../common/response-model";
import {shareHolderLogInAction, logoutAction, companyInfoAction, documentTypeListAction, updateUserAction, uploadedFileListAction, documentUploadAction } from "./action";
import { companyInfoResponse, documentTypeListResponse, documentUploadResponse, loginResponse, logoutResponse, updateUserResponse, uploadedFileListResponse } from "./reducer";
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
export function* uploadedFileList(data: any) {
    try {
        yield put(loader(true));
        let payload = data.payload;
        let {id} = payload;
        let res: HttpResponse<any> = yield call(UserService.getInstance().uploadedFileList,id);
        let response: any = res;
        yield put(uploadedFileListResponse(response?.data));
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

export function* userEffects() {
    yield takeLatest(shareHolderLogInAction.type, shareHolderLogin);
    yield takeLatest(logoutAction.type, logout);
    yield takeLatest(companyInfoAction.type, compnayInfo);
    yield takeLatest(documentTypeListAction.type, documentTypeList);
    yield takeLatest(documentUploadAction.type, documentUpload);
    yield takeLatest(uploadedFileListAction.type, uploadedFileList);
    yield takeLatest(updateUserAction.type, updateUserList);
}

const userSagas = [call(userEffects)];

export default userSagas;
