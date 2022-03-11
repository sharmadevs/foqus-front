import React from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {  shareHolderLogInAction } from '../../redux/user/action';
import LangContext from '../../const/langContext';
import { BufferToBase64 } from '../../const/utils';
import Logo from '../../component/Logo/Logo';

const loginSchema = Yup.object().shape({
  i_holder: Yup.string()
    .required('Registration No required'),
  I_ref: Yup.string()
    .required('ID Card Number/Passport Number required'),
  termsAccepted: Yup
    .boolean()
    .oneOf([true], 'Must Accept termsAccepted'),
})

const ShareHolderLogin = (props:any) => {
  const {dispatch, navigate,lang, t , companyInfo}=props;
  const formik = useFormik({
    initialValues: {
      i_holder: '',
      I_ref: '',
      termsAccepted: false,
    },
    validationSchema: loginSchema,
    onSubmit: values => {
      let val:any={...values};
      delete val?.termsAccepted;
      dispatch(shareHolderLogInAction(values, navigate))
    },
  });
  
  return (
    <section className='section'>
      <div className='container'>
        {/* <Logo/> */}
        <div className='title'>
          <h2>{t('register.main_heading')}</h2>
          <h3>{lang === "thai" ? companyInfo?.Company_Name_Thai: companyInfo?.Company_Name_Eng}</h3>
          <p>{lang === "thai" ? companyInfo?.AGM_ADD_THAI: companyInfo?.AGM_ADD_ENG}</p>
        </div>
        <div className='menual'>
        {
            lang === "thai" ? (
              <a href="https://quidlab.com/img/eagm/CondoDocument_Upload_Thai.pdf" target="_blank">คู่มือภาษาไทย</a>
            ):(
              <a href="https://quidlab.com/img/eagm/CondoDocument_Upload_Eng.pdf" target="_blank">English Manual</a>
            )
          }
          </div>
        <form onSubmit={formik.handleSubmit}>
          <div className='flex-row'>
            <div className="form_group">
              <label>{t('register.inp1_head')}</label>
              <input type="text" className="form_control" placeholder={t('register.inpt1_place_holder')} name="i_holder"
                autoComplete="off" id="i_holder"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.i_holder}
              />
              {formik.errors.i_holder && formik.touched.i_holder ? (
                <span className="error_message">{formik.errors.i_holder}</span>
              ) : null}
            </div>
            <div className="form_group">
              <label>{t('register.inp2_head')}</label>
              <input type="text" className="form_control" autoComplete="off" placeholder={t('register.inpt2_place_holder')} name="I_ref" id="I_ref"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.I_ref}
              />
              {formik.errors.I_ref && formik.touched.I_ref ? (
                <span className="error_message">{formik.errors.I_ref}</span>
              ) : null}
            </div>
          </div>
          <div className="sub_button">
            <input type="checkbox" id="termsAccepted" name="termsAccepted" 
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            /><label htmlFor="termsAccepted">Accept terms</label>
            {formik.errors.termsAccepted && formik.touched.termsAccepted ? (
                <span className="error_message">{formik.errors.termsAccepted}</span>
              ) : null}
          </div>
          <div className="sub_button">
            <button type="submit" >Submit</button>
          </div>
        </form>
        <div className='bottomtext'>
          <p>{t('register.refer_note')}</p>
          <p>{t('register.assist_note2')}</p>
          <p className='tc_blue'><a href="https://quidlab.com/img/Privacy_policy.pdf" target="_blank">{t('register.privacy_text')}</a></p>
          <p>Fogus version 2.3.0 Served from Singapore</p>
        </div>
      </div>
    </section>
  )
}

export default ShareHolderLogin