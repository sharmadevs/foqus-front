import React, { createContext, useState } from 'react';
import './App.css';
import { useSelector } from 'react-redux';
import AppRoutes from './route';
import {BrowserRouter as Router} from "react-router-dom";
import Header from './pages/common/Header';
import LangContext from './const/langContext';

function App() {
  const [lang, setLang] = useState<string>('en');
  
  return (
    <LangContext.Provider value={{lang:lang, setLang: setLang}}>
      <Router>
        <Header/>
        <AppRoutes/>
      </Router>
    </LangContext.Provider>
  );
}
export default App;
