import { useFormik } from 'formik';
import React from 'react'
import { shareHolderLogInAction } from '../../redux/user/action';
import * as Yup from 'yup';
import { useNavigate  } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { BufferToBase64 } from '../../const/utils';
import Logo from '../../component/Logo/Logo';

const ProxyLogin = (props:any) => {
  const {dispatch, navigate,lang, t , companyInfo}=props;
  const loginSchema = Yup.object().shape({
    i_holder: Yup.string()
      .required('Unit No. No required'),
    I_ref: Yup.string()
      .required('Area required'),
    termsAccepted: Yup
    .boolean()
    .oneOf([true], 'Must Accept termsAccepted'),
  })
  const formik = useFormik({
    initialValues: {
      i_holder: '',
      I_ref: '',
      termsAccepted:false
    },
    validationSchema: loginSchema,
    onSubmit: values => {
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
                <label>{t('register.inp_unit_head')}</label>
                <input type="text" className="form_control" placeholder={t('register.inp_unit_holder')} name="i_holder"
                  autoComplete="off" id="i_holder"
                  onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.i_holder}/>
                {formik.errors.i_holder && formik.touched.i_holder ? (
                <span className="error_message">{formik.errors.i_holder}</span>
              ) : null}
              </div>
              <div className="form_group">
                <label>{t('register.inp_area_head')}</label>
                <input type="text" className="form_control" autoComplete="off" placeholder={t('register.inp_area__holder')} name="I_ref" id="I_ref"
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
            <button type="submit" name="terms" >Submit</button>
            </div>
          </form>
        <div className='bottomtext'>
          <p style={{textAlign:"left", fontWeight: 600}}>{t('register.assist_note2')}</p>
          <p className='tc_blue'><a href="https://quidlab.com/img/Privacy_policy.pdf" target="_blank">{t('register.privacy_text')}</a></p>
        </div>
    </div>
  </section>
  )
}

export default ProxyLogin