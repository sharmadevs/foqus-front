import React from 'react'
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { BufferToBase64 } from '../../const/utils';

const RegistrationClose = (props: any) => {
  const { t } = useTranslation<string>();
  const companyInfo = useSelector((state: any) => state.user.companyInfo);
  return (
    <section className='section'>
      <div className='container'>
        <div className="logo">
          <img src={companyInfo?.logo?.data ? BufferToBase64(companyInfo?.logo?.data) : ""} alt="" />
        </div>
        <div className='title'>
          <h2>{t('register.main_heading')}</h2>
        </div>
        <div className='menual'>
          <a href="https://quidlab.com/img/eagm/CondoDocument_Upload_Thai.pdf" target="_blank">คู่มือภาษาไทย</a>
          <a href="https://quidlab.com/img/eagm/CondoDocument_Upload_Eng.pdf" target="_blank">English Manual</a>
        </div>
        <div>
          <h3 className='text_center'>{t('register.close_text')}</h3>
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