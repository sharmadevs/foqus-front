import React, { createContext, useEffect, useRef, useState } from 'react';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import AppRoutes from './route';
import {BrowserRouter as Router} from "react-router-dom";
import Header from './pages/common/Header';
import LangContext from './const/langContext';
import { companyInfoAction } from './redux/user/action';
import { toast, ToastContainer } from 'react-toastify';

function App() {
  let lng:any=localStorage.getItem("focus:lang")
  const dispatch=useDispatch();
  const [lang, setLang] = useState<string>(lng);
  const toastData = useSelector((state: any) => state.common.toast);
  const toastId = useRef<any>(null);

  useEffect(() => {
    dispatch(companyInfoAction({}))
   return () => { }
 }, []);
  useEffect(() => {
    if (toastData) {
      notify(toastData.message, toastData.type);
    }
  }, [toastData]);

  const notify = (message: string, type: any) => {
    if (!toast.isActive(toastId.current)) {
      toastId.current = toast(message, { type: type, position: toast.POSITION.TOP_RIGHT, autoClose: 3000 });
    }
  }
  return (
    <LangContext.Provider value={{lang:lang, setLang: setLang}}>
      <Router>
        <Header/>
        <AppRoutes/>
      </Router>
      <ToastContainer
        theme={"colored"}
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </LangContext.Provider>
  );
}
export default App;
