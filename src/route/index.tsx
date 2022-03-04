import React from 'react';
import {BrowserRouter as Router ,Routes, Route, Navigate} from "react-router-dom";
import ROUTE from './Route';
import UploadDocument from '../pages/UploadDocument/UploadDocument';
import Login from '../pages/Login';
import { getUser, PrivateRoute } from './privateRoute';
import RegistrationClose from '../pages/Login/RegistrationClose';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path={ROUTE.HOME} element={<Navigate to={ROUTE.UPLOAD_DOCUMENT}/> }/>
        <Route path={ROUTE.UPLOAD_DOCUMENT} element={<PrivateRoute><UploadDocument/></PrivateRoute>} />
        <Route  path={ROUTE.LOGIN} element={!getUser()? <Login/>:<UploadDocument/>}/>
        <Route  path="*" element={<RegistrationClose/>}/>
    </Routes>
  )
}

export default AppRoutes