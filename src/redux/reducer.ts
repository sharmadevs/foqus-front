import { combineReducers } from "@reduxjs/toolkit";
import commonReducer from "./common/common-reducer";
import userReducer from "./user/reducer";

const reducers = {
    common: commonReducer,
    user: userReducer,
};

export let rootReducer = combineReducers({
    ...reducers,
});

export default function createReducer(injectedReducers = {}) {
    rootReducer = combineReducers({
        ...reducers,
        ...injectedReducers,
    });

    return rootReducer;
}

export type RootState = ReturnType<typeof rootReducer>;
