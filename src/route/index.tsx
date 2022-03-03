import React from 'react';
import {BrowserRouter as Router ,Routes, Route} from "react-router-dom";
import ProxyLogin from '../pages/Login/proxyLogin';
import ROUTE from './Route';
import UploadDocument from '../pages/UploadDocument/UploadDocument';
import Login from '../pages/Login';
import { getUser, PrivateRoute } from './privateRoute';

const AppRoutes = () => {
  return (
    <Routes>
        <Route path={ROUTE.UPLOAD_DOCUMENT} element={<PrivateRoute><UploadDocument/></PrivateRoute>} />
        <Route  path={ROUTE.LOGIN} element={!getUser()? <Login/>:<UploadDocument/>}/>
        <Route  path={ROUTE.LOGIN_PROXY} element={<ProxyLogin/>} />
    </Routes>
  )
}

export default AppRoutes