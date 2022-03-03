import { useFormik } from 'formik';
import React from 'react'
import { shareHolderLogInAction } from '../../redux/user/action';
import * as Yup from 'yup';
import { useNavigate  } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const ProxyLogin = (props:any) => {
  const {dispatch, navigate,lang, t , companyInfo}=props;
  const loginSchema = Yup.object().shape({
    i_holder: Yup.string()
      .required('Unit No. No required'),
    I_ref: Yup.string()
      .required('Area required')
  })
  const formik = useFormik({
    initialValues: {
      i_holder: '',
      I_ref: ''
    },
    validationSchema: loginSchema,
    onSubmit: values => {
      dispatch(shareHolderLogInAction(values, navigate))
    },
  });
  return (
    <section className='section'>
      <div className='container'>
      <div className="logo">
          <img src={"/assets/images/logo.png"} alt="" />
        </div>
        <div className='title'>
          <h2>Document Registation System for E-Meeting</h2>
          <h3>Quidlab Company Limitedl</h3>
          <p>The Annual General Meeting of Shareholders Year 2021, which will be held on 23 April 2021 at 02.OO p.m.</p>
        </div>
        <div className='menual'>
          <a href="https://quidlab.com/img/eagm/CondoDocument_Upload_Thai.pdf" target="_blank">คู่มือภาษาไทย</a>
          <a href="https://quidlab.com/img/eagm/CondoDocument_Upload_Eng.pdf" target="_blank">English Manual</a>
        </div>
        <form onSubmit={formik.handleSubmit}>
            <div className='flex-row'>
              <div className="form_group">
                <label>Unit No.</label>
                <input type="text" className="form_control" placeholder="Unit No." name="i_holder"
                  autoComplete="off" id="i_holder"
                  onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.i_holder}/>
                {formik.errors.i_holder && formik.touched.i_holder ? (
                <span className="error_message">{formik.errors.i_holder}</span>
              ) : null}
              </div>
              <div className="form_group">
                <label>Area according to the title deed (square meter/square wa) or Ownership ratio</label>
                <input type="text" className="form_control" autoComplete="off" placeholder="Area" name="I_ref" id="I_ref"
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
            <button type="submit" name="terms" >Submit</button>
            </div>
          </form>
        <div className='bottomtext'>
          <p style={{textAlign:"left", fontWeight: 600}}>Note: If you need assistance submitting document please contact Phone: 064-9</p>
          <p className='tc_blue'><a href="https://quidlab.com/img/Privacy_policy.pdf" target="_blank">Quidtab Information Security Management and Data Protection Policy</a></p>
        </div>
    </div>
  </section>
  )
}

export default ProxyLogin