import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { createInjectorsEnhancer } from "redux-injectors";

import createReducer from "./reducer";
import rootSaga from "./saga";

const devMode = process.env.NODE_ENV === "development";
const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];
const { run: runSaga } = sagaMiddleware;

const enhancers = [
    createInjectorsEnhancer({
        createReducer,
        runSaga,
    }),
];

export default (preloadedState = {}) => {
    const store = configureStore({
        reducer: createReducer(),
        middleware,
        preloadedState: preloadedState,
        devTools: devMode,
        enhancers
    });
    sagaMiddleware.run(rootSaga);
    return store;
};
