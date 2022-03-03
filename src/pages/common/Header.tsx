import React, { createContext, useContext, useState } from 'react'
import { useTranslation , withTranslation, WithTranslation} from 'react-i18next'
import LangContext from '../../const/langContext';
import i18n from "./../../i18/i18";
const Header = () => {
  const {lang,setLang} = useContext<any>(LangContext);
  const langChange = (e:any) => {
    setLang(e.target.value);
    localStorage.setItem("focus:lang",e.target.value);
    i18n.changeLanguage(e.target.value);
  }
  return (
    <div className='header'>
        <div></div>
        <div></div>
        <div className='lngdrp'>
            <div className="form_group">
                <select className="form_control" onClick={(e:any)=>langChange(e)}>
                <option value="en">En</option>
                <option value="thai">thai</option>
                </select>
            </div>
        </div>
    </div>
  )
}

export default withTranslation()(Header);