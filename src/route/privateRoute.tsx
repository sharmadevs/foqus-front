import React from "react";
import {Navigate  } from "react-router-dom";
import ROUTE from "./Route";

export const getUser = () => {
    return !!localStorage.getItem("focus:user");
};
export const PrivateRoute = (props: any) => {
    if (getUser()) {
        return props.children;
    }
    return <Navigate  to={ROUTE.LOGIN} />;
};
