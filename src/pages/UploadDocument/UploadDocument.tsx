import React, { useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import LangContext from '../../const/langContext';
import { BufferToBase64 } from '../../const/utils';
import { documentTypeListAction, documentUploadAction, logoutAction, updateUserAction, uploadedFileListAction } from '../../redux/user/action';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const UploadDocument = () => {
  var USER:any = JSON.parse(localStorage.getItem("focus:user") || "");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [values, setValues]=useState({
      e_mail: '',
      m_phone: '',
      Proxy: "",
      ProxyType: '',
      Proxy_name: '',
      proxy_I_ref: ''
    });
    const [files, setFiles]=useState<any[]>([]);
  const documentType = useSelector((state: any) => state.user.documentType);
  const document = useSelector((state: any) => state.user.documentList);
  const companyInfo = useSelector((state: any) => state.user.companyInfo);
  const toast = useSelector((state: any) => state.common.toast); 
  const {lang,setLang} = useContext<any>(LangContext);
  const {t}=useTranslation<string>();
  const handleLogout = () => {
    dispatch(logoutAction(navigate));
  }
  useEffect(() => {
    dispatch(documentTypeListAction({}));
    getUploadedDoc();
   return () => { }
 }, [])
  useEffect(() => {
    if(toast && toast?.type === 'success' && toast?.message === "File Upload successfully"){
      getUploadedDoc();
    } else if(toast?.message === "Update successfully"){
      let USER:any = JSON.parse(localStorage.getItem("focus:user") || "");
      let newUser={...USER, ...values};
      console.log(newUser,values)
      localStorage.setItem("focus:user", JSON.stringify(newUser));
      /* window.location.reload(); */
    }
   return () => { }
 }, [toast])

 useEffect(() => {
  let USER:any = JSON.parse(localStorage.getItem("focus:user") || "");
  setValues({
    ...values,
    e_mail: USER?.e_mail || "",
    m_phone: USER?.m_phone || "",
    Proxy: USER?.Proxy || "",
    ProxyType: USER?.ProxyType || "",
    Proxy_name: USER?.Proxy_name || "",
    proxy_I_ref: USER?.proxy_I_ref || ""
  })
 return () => { }
}, [])

useEffect(() => {
  if(document?.docs){
    setFiles(document?.docs);
  }
 return () => { }
}, [document])

 const getUploadedDoc = async () => {
  let USER:any = await JSON.parse(localStorage.getItem("focus:user") || "");
  dispatch(uploadedFileListAction(USER?.i_holder));
 }

 const registerSchema = Yup.object().shape({
  e_mail: Yup.string()
    .required('Email address required')
    .email("Email address not valid"),
  m_phone: Yup.string()
    .required('Phone Number required'),
  Proxy: Yup.string()
    .required('Attend Meeting required'),
  Proxy_name: Yup.string()
    .when('Proxy', {
      is: 'Y',
      then: Yup.string()
        .required('Proxy Name is required.'),
  }),
  ProxyType: Yup.string()
  .when("Proxy", (Proxy) => {
    if(Proxy === "Y" && companyInfo?.meeting_type === "Invester"){
      return Yup.string().required("Proxy Type required")
    }else {
      return Yup.string()
    }
  }),
  proxy_I_ref: Yup.string()
  .when("Proxy", (Proxy) => {
    if(Proxy === "Y" && companyInfo?.meeting_type === "Condo"){
      return Yup.string().required("Proxy Id required")
    }else {
      return Yup.string()
    }
  })
})

const formik = useFormik({
  initialValues: values,
  enableReinitialize: true,
  validationSchema: registerSchema,
  onSubmit: values => {
    setValues(values);
    dispatch(updateUserAction(values, USER?.ID))
  },
});
const handleFileUpload = (e:any,id:any) => {
  let file=e.target.files[0];
  if(file && id ){
    const formData: any = new FormData();
    formData.append(id, file);
     dispatch(documentUploadAction(formData));
  }
}
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
        {USER && USER?.doc_received === "Y" &&
        <div className='title' style={{color: "red"}}>
          <p>{t('register.doc_under_considertion')}</p>
        </div>
        }
        {files && files?.length > 0 &&
        <div className='title'>
          <p>{t('register.already_submit')}</p>
        </div>
        }
        <form onSubmit={formik.handleSubmit}>
          <div>
            <div className="form_group">
              <label>{t('register.inp_email_head')}</label>
              <input type="email" className="form_control" placeholder={t('register.inp_email_holder')} name="e_mail"
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
              <label>{t('register.inp_phone_head')}</label>
              <input type="text" className="form_control" autoComplete="off" placeholder={t('register.inp_phone__holder')} name="m_phone" id="m_phone"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.m_phone}
            />
            {formik.errors.m_phone && formik.touched.m_phone ? (
              <span className="error_message">{formik.errors.m_phone}</span>
            ) : null}
            </div>
            <div className="form_group">
              <label>{t('register.upload_file')}</label>
              {documentType && documentType.length > 0 && documentType.map((item:any,i:any)=>(
              <div className="custom-file-upload" key={i}>
                <span>{item?.name}</span>
                <label className="uploadBtn">
                  <input type="file" style={{display:"none"}} onChange={(e:any)=>handleFileUpload(e,item?.id)}/>
                  Browse files
                </label>
              </div>
              ))}
            </div>
            <div className="form_group file-list">
              {files?.length > 0 && files?.map((file:any,i:any)=>(
                <div key={i} >{file?.document_path}</div>
              ))}
            </div>
            <div className="form_group" style={{flexDirection: "row", alignItems: "center"}}>
              <label className="radio-inline">{t('register.attend_meeting')}</label>
              <input type="radio" className="radio-inline" autoComplete="off"  name="Proxy" id="metting1" value="N"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              checked={formik.values.Proxy === "N" ? true : false}
            />
              <span className="radio-inline">{t('register.person')}</span>
              <input type="radio" className="radio-inline" autoComplete="off" name="Proxy" id="metting2" value="Y"
             onChange={formik.handleChange}
             onBlur={formik.handleBlur}
             checked={formik.values.Proxy === "Y" ? true : false}
           />
            <span className="radio-inline">{t('register.proxy')}</span>
              {formik.errors.Proxy && formik.touched.Proxy ? (
             <span className="error_message">{formik.errors.Proxy}</span>
           ) : null}
            </div>
            {formik.values.Proxy === "Y" &&
            <div className="custom-select">
            <div className="form_group">
              <label>{t('register.Proxy_Name')}</label>
              <input type="text" className="form_control" placeholder="Proxy Name" name="Proxy_name"
                autoComplete="off" id="Proxy_name"  
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.Proxy_name}
                />
                {formik.errors.Proxy_name && formik.touched.Proxy_name ? (
                <span className="error_message">{formik.errors.Proxy_name}</span>
              ) : null}
            </div>
            {companyInfo?.meeting_type === "Invester" &&
            <div className="form_group">
            <label>{t('register.Proxy_Type')}</label>
            <select className="form_control" 
              name="ProxyType"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.ProxyType}
            >
              <option value=""></option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
            </select>
            {formik.errors.ProxyType && formik.touched.ProxyType ? (
                <span className="error_message">{formik.errors.ProxyType}</span>
              ) : null}
            </div>}
            {companyInfo?.meeting_type === "Condo" &&
            <div className="form_group">
            <label>{t('register.Proxy_ID_Card')}</label>
            <input type="text" className="form_control" placeholder="Proxy ID Card No" name="proxy_I_ref"
                autoComplete="off" id="proxy_I_ref"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.proxy_I_ref}
              />
              {formik.errors.proxy_I_ref && formik.touched.proxy_I_ref ? (
                <span className="error_message">{formik.errors.proxy_I_ref}</span>
              ) : null}
            </div>}
          </div>}
          </div>
          <div className="sub_button">
            <button type="submit" name="terms" >Submit</button>
          </div>
          </form>
          <div className='bottomtext'>
            <p>{t('register.refer_note')}</p>
            <p>{t('register.assist_note2')}</p>
            <p className='tc_blue'><a href="https://quidlab.com/img/Privacy_policy.pdf" target="_blank">{t('register.privacy_text')}</a></p>
          </div>
          <div className="sub_button">
            <button type="button" onClick={()=>handleLogout()}>Logout</button>
          </div>
      </div>
    </section>
  )
}

export default UploadDocument