import React, { useContext, useEffect } from 'react'
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import LangContext from '../../const/langContext';
import { BufferToBase64 } from '../../const/utils';
import { documentTypeListAction, logoutAction } from '../../redux/user/action';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const registerSchema = Yup.object().shape({
  e_mail: Yup.string()
    .required('Email address No required')
    .email("Email address not valid"),
  m_phone: Yup.string()
    .required('Phone Number required')
})

const UploadDocument = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const documentType = useSelector((state: any) => state.user.documentType);
  const companyInfo = useSelector((state: any) => state.user.companyInfo);
  const {lang,setLang} = useContext<any>(LangContext);
  const {t}=useTranslation<string>();
  const handleLogout = () => {
    dispatch(logoutAction(navigate));
  }
  useEffect(() => {
    dispatch(documentTypeListAction({}));
   return () => { }
 }, [])
 
const formik = useFormik({
  initialValues: {
    e_mail: '',
    m_phone: '',
    metting: "",
    Proxy: '',
    Proxy_name: '',
    proxy_I_ref: ''
  },
  validationSchema: registerSchema,
  onSubmit: values => {
    /* dispatch(shareHolderLogInAction(values, navigate)) */
  },
});
 var USER:any = JSON.parse(localStorage.getItem("focus:user") || "");
 console.log(USER);
  return (
    <section className='section'>
      <div className='container'>
      <div className="logo">
          <img src={companyInfo?.logo?.data ? BufferToBase64(companyInfo?.logo?.data): ""} alt="" />
        </div>
        <div className='title'>
          <h2>{t('register.main_heading')}</h2>
          <h3>{lang === "thai" ? companyInfo?.Company_Name_Thai: companyInfo?.Company_Name_Eng}</h3>
          <p>{lang === "thai" ? companyInfo?.AGM_ADD_THAI: companyInfo?.AGM_ADD_ENG}</p>
        </div>
        <div className='menual'>
          <a href="https://quidlab.com/img/eagm/CondoDocument_Upload_Thai.pdf" target="_blank">คู่มือภาษาไทย</a>
          <a href="https://quidlab.com/img/eagm/CondoDocument_Upload_Eng.pdf" target="_blank">English Manual</a>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <div>
            <div className="form_group">
              <label>Email address</label>
              <input type="email" className="form_control" placeholder="name@example.com" name="e_mail"
                autoComplete="off" id="e_mail"  
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.e_mail}
              />
              {formik.errors.e_mail && formik.touched.e_mail ? (
                <span className="error_message">{formik.errors.e_mail}</span>
              ) : null}
            </div>
            <div className="form_group">
              <label>Phone Number</label>
              <input type="text" className="form_control" autoComplete="off" placeholder="Phone Number" name="m_phone" id="m_phone"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.m_phone}
            />
            {formik.errors.m_phone && formik.touched.m_phone ? (
              <span className="error_message">{formik.errors.m_phone}</span>
            ) : null}
            </div>
            <div className="form_group">
              <label>Upload files</label>
              {documentType && documentType.length > 0 && documentType.map((item:any,i:any)=>(
              <div className="custom-file-upload" key={i}>
                <span>{item?.name}</span>
                <label className="uploadBtn">
                  <input type="file" style={{display:"none"}}/>
                  Browse files
                </label>
              </div>
              ))}
            </div>
            <div className="form_group" style={{flexDirection: "row", alignItems: "center"}}>
              <label className="radio-inline">Attend meeting</label>
              <input type="radio" className="radio-inline" autoComplete="off"  name="metting" id="metting1" value="person"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              checked={formik.values.metting === "person" ? true : false}
            />
              <span className="radio-inline">Person</span>
              <input type="radio" className="radio-inline" autoComplete="off" name="metting" id="metting2" value="proxy"
             onChange={formik.handleChange}
             onBlur={formik.handleBlur}
             checked={formik.values.metting === "proxy" ? true : false}
           />
            <span className="radio-inline">Proxy</span>
              {formik.errors.metting && formik.touched.metting ? (
             <span className="error_message">{formik.errors.metting}</span>
           ) : null}
            </div>
            {formik.values.metting === "proxy" &&
            <div className="custom-select">
            <div className="form_group">
              <label>Proxy Name</label>
              <input type="email" className="form_control" placeholder="Proxy Name" name="email"
                autoComplete="off" id="email"  />
            </div>
            <div className="form_group">
            <label>Proxy Type</label>
            <select className="form_control">
              <option value=""></option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
            </select>
            </div>
            <div className="form_group">
            <label>Proxy ID Card No</label>
            <input type="email" className="form_control" placeholder="Proxy ID Card No" name="email"
                autoComplete="off" id="email"/>
            </div>
          </div>}
          </div>
          <div className="sub_button">
            <button type="submit" name="terms" >Submit</button>
          </div>
          <div className='bottomtext'>
            <p>Note: Please refer to invitation letter for meeting to get a list of document to be uploaded in case of coming in person or proxy</p>
            <p>Note: If you need assistance submitting document please contact</p>
          <p className='colorblue'>Quidtab Information Security Management and Data Protection Policy</p>
          </div>
          <div className="sub_button">
            <button type="button" onClick={()=>handleLogout()}>Logout</button>
          </div>
        </form>
      </div>
    </section>
  )
}

export default UploadDocument