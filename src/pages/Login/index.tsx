import React, { useContext, useEffect } from 'react'
import { companyInfoAction } from '../../redux/user/action';
import { useDispatch, useSelector } from 'react-redux';
import ShareHolderLogin from './shareHolderLogin';
import RegistrationClose from './RegistrationClose';
import ProxyLogin from './proxyLogin';
import LangContext from '../../const/langContext';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const {lang,setLang} = useContext<any>(LangContext);
  const {t}=useTranslation<string>();
  const companyInfo = useSelector((state: any) => state.user.companyInfo);

 let now= new Date(new Date().toLocaleString('en-US', { timeZone: companyInfo?.time_zone })).getTime();
 let open=new Date(companyInfo?.docreg_allowed_time).getTime();
 let close=new Date(companyInfo?.docreg_finish_time).getTime();
 let condtion:boolean= now >= open && now <= close;
 
  return (
    <>
    {companyInfo && !condtion && companyInfo?.meeting_type &&
      <RegistrationClose dispatch={dispatch} navigate={navigate} lang={lang} t={t} companyInfo={companyInfo}/>
    }
    {companyInfo && condtion && companyInfo?.meeting_type === "Investor" ?
      <ShareHolderLogin dispatch={dispatch} navigate={navigate} lang={lang} t={t} companyInfo={companyInfo}/>
      : companyInfo?.meeting_type === "Condo" && condtion ?
      <ProxyLogin dispatch={dispatch} navigate={navigate} lang={lang} t={t} companyInfo={companyInfo}/>
      : null
    }
    </>
  )
}

export default Login