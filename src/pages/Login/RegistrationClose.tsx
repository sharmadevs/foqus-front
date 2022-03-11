import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import Logo from '../../component/Logo/Logo';
import LangContext from '../../const/langContext';
import { BufferToBase64 } from '../../const/utils';

const RegistrationClose = (props: any) => {
  const { t } = useTranslation<string>();
  const companyInfo = useSelector((state: any) => state.user.companyInfo);
  const { lang, setLang } = useContext<any>(LangContext);

  let now= new Date(new Date().toLocaleString('en-US', { timeZone: companyInfo?.time_zone })).getTime();
 let open=new Date(companyInfo?.docreg_allowed_time).getTime();
 let close=new Date(companyInfo?.docreg_finish_time).getTime();
 let condtion1:boolean= now < open;
 let condtion2:boolean= now > close;

  return (
    <section className='section'>
      <div className='container'>
        {/* <Logo/> */}
        <div className='title'>
          <h2>{t('register.main_heading')}</h2>
        </div>
        <div className='menual'>
        {lang == "en" &&<a href="https://quidlab.com/img/eagm/CondoDocument_Upload_Eng.pdf" target="_blank">English Manual</a>}
        {lang == "thai" &&<a href="https://quidlab.com/img/eagm/CondoDocument_Upload_Thai.pdf" target="_blank">คู่มือภาษาไทย</a>}
        </div>
        <div>
          <h3 className='text_center notStart'>{condtion2 ?  t('register.close_text') : condtion1 ? t('register.not_start_text') : ""}</h3>
        </div>
        <div className='bottomtext'>
          <p>{t('register.note_close')}</p>
          <p>Fogus version 2.3.0 Served from Singapore</p>
        </div>
      </div>
    </section>
  )
}

export default RegistrationClose