import React, { useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import LangContext from '../../const/langContext';
import { BufferToBase64 } from '../../const/utils';
import { documentTypeListAction, documentUploadAction, logoutAction, updateUserAction, getEgmAction } from '../../redux/user/action';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Logo from '../../component/Logo/Logo';

let fileObj:any[] = [];
let fileArray :any[]= [];
let uArr: any[] = [];
const UploadDocument = () => {
  var USER: any = JSON.parse(localStorage.getItem("focus:user") || "");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [values, setValues] = useState({
    e_mail: '',
    m_phone: '',
    Proxy: "",
    ProxyType: '',
    Proxy_name: '',
    proxy_I_ref: ''
  });
  const [filesShow, setFilesShow] = useState<any[]>([]);
  const [Egm, setEgm] = useState<any>();
  const [fileData, setFileData] = useState<any[]>([]);
  const documentType = useSelector((state: any) => state.user.documentType);
  const egm = useSelector((state: any) => state.user.egm);
  const companyInfo = useSelector((state: any) => state.user.companyInfo);
  const toast = useSelector((state: any) => state.common.toast);
  const { lang, setLang } = useContext<any>(LangContext);
  const { t } = useTranslation<string>();
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
        if (Proxy === "Y" && companyInfo?.meeting_type === "Investor") {
          return Yup.string().required("Proxy Type required")
        } else {
          return Yup.string()
        }
      }),
    proxy_I_ref: Yup.string()
      .when("Proxy", (Proxy) => {
        if (Proxy === "Y" && companyInfo?.meeting_type === "Condo") {
          return Yup.string().required("Proxy Id required")
        } else {
          return Yup.string()
        }
      })
  })

  const formik = useFormik({
    initialValues: values,
    enableReinitialize: true,
    validationSchema: registerSchema,
    onSubmit: values => {
      let val:any={...values};
      if(val.Proxy === "N"){
        delete val?.ProxyType;
        delete val?.proxy_I_ref;
        delete val?.Proxy_name;
      }
      setValues(values);
      if(fileData.length > 0){
        const formData: any = new FormData();
        for (let i = 0; i < fileData.length; i++) {
          formData.append(i, fileData[i]);
        }
        dispatch(documentUploadAction(formData));
      }
      dispatch(updateUserAction(val, USER?.ID))
      fileObj=[];
      fileArray=[];
      uArr=[];
      setFilesShow(fileObj);
      setFileData(uArr);
    },
  });
  const handleLogout = () => {
    dispatch(logoutAction(navigate));
  }
  useEffect(() => {
    if (formik?.values?.Proxy) {
      dispatch(documentTypeListAction({ proxy_type: formik?.values?.Proxy === "Y" ? formik?.values?.ProxyType : "Person" }));
    }
    return () => { }
  }, [formik?.values?.Proxy])

  useEffect(() => {
    getEgm();
    return () => { }
  }, [])
  useEffect(() => {
    if (toast?.message === "Update successfully") {
      getEgm();
      let USER: any = JSON.parse(localStorage.getItem("focus:user") || "");
      let val:any={...values};
      val.doc_received = "Y";
      let newUser = { ...USER, ...val };
      localStorage.setItem("focus:user", JSON.stringify(newUser));
    }
    return () => { }
  }, [toast])

  useEffect(() => {
    let USER: any = JSON.parse(localStorage.getItem("focus:user") || "");
    setValues({
      ...values,
      e_mail: USER?.e_mail || "",
      m_phone: USER?.m_phone || "",
      Proxy: USER?.Proxy || "N",
      ProxyType: USER?.ProxyType || "A",
      Proxy_name: USER?.Proxy_name || "",
      proxy_I_ref: USER?.proxy_I_ref || ""
    })
    return () => { }
  }, [])

  useEffect(() => {
    if (egm && egm.length > 0) {
      setEgm(egm[0]);
    }
    return () => { }
  }, [egm])

  const getEgm = async () => {
    let USER: any = await JSON.parse(localStorage.getItem("focus:user") || "");
    dispatch(getEgmAction({Proxy_name:USER?.Proxy_name, m_phone: USER?.m_phone, limit: 1, page:1 }));
  }

  const handleFileUpload = (e: any, id: any) => {
    fileObj=[];
    if(e.target.files.length + fileArray.length <= 10){
      fileObj.push(e.target.files)
      for (let i = 0; i < fileObj[0].length; i++) {
        const reader: any = new FileReader();
        const url = reader.readAsDataURL(fileObj[0][i]);
        const originalFileURL = URL.createObjectURL(fileObj[0][i]);
        fileArray.push({ type: fileObj[0][i].type, url: originalFileURL, size: fileObj[0][i].size, name: fileObj[0][i].name });
        uArr.push(fileObj[0][i]);
      }
      setFileData([...uArr]);
      setFilesShow([...fileArray]);
    } else {
      alert(`you can upload only  10 files`);
    }
  }
  function deleteFile(e: any) {
    fileArray = fileArray.filter((item: any, index: any) => index !== e);
    uArr = uArr.filter((item: any, index: any) => index !== e);
    const fs: any[] = fileArray.filter((item: any, index: any) => index !== e);
    const fd: any[] = uArr.filter((item: any, index: any) => index !== e);
    setFileData([...fd]);
    setFilesShow([...fs]);
  }

  return (
    <section className='section'>
      <div className='container'>
        <Logo />
        <div className='title'>
          <h2>{t('register.main_heading')}</h2>
          <h3>{lang === "thai" ? companyInfo?.Company_Name_Thai : companyInfo?.Company_Name_Eng}</h3>
          <p>{lang === "thai" ? companyInfo?.AGM_ADD_THAI : companyInfo?.AGM_ADD_ENG}</p>
        </div>
        <div className='menual'>
          {lang == "en" && <a href="https://quidlab.com/img/eagm/CondoDocument_Upload_Eng.pdf" target="_blank">English Manual</a>}
          {lang == "thai" && <a href="https://quidlab.com/img/eagm/CondoDocument_Upload_Thai.pdf" target="_blank">คู่มือภาษาไทย</a>}
        </div>
        {USER && USER?.doc_received === "Y" && Egm?.ApprovedForOnline === "N" &&
          <div className='title' style={{ color: "red" }}>
            <p>{t('register.doc_under_considertion')}</p>
          </div>
        }
        {Egm?.ApprovedForOnline && Egm?.ApprovedForOnline === "Y" &&
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
            <div className="form_group" style={{ flexDirection: "row", alignItems: "center", display: "flex" }}>
              <label className="radio-inline">{t('register.attend_meeting')}</label>
              <div style={{ paddingLeft: 20 }}>
                <input type="radio" className="radio-inline" autoComplete="off" name="Proxy" id="metting1" value="N"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  checked={formik.values.Proxy === "N" ? true : false}
                />
                <label className="radio-inline">{t('register.person')}</label>
              </div>
              <div style={{ paddingLeft: 20 }}>
                <input type="radio" className="radio-inline" autoComplete="off" name="Proxy" id="metting2" value="Y"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  checked={formik.values.Proxy === "Y" ? true : false}
                />
                <span className="radio-inline">{t('register.proxy')}</span>
              </div>
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
                {companyInfo?.meeting_type === "Investor" &&
                  <div className="form_group">
                    <label>{t('register.Proxy_Type')}</label>
                    <select className="form_control"
                      name="ProxyType"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.ProxyType}
                    >
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
            <div className="form_group">
              <label>{t('register.upload_file')}</label>
              <div className="custom-file-upload">
                <span>
                <div className="form_group file-list">
                {documentType?.length > 0 && documentType?.map((file: any, i: any) => (
                  <div key={i} >{lang === "thai" ? file?.name_thai : file?.name_eng}</div>
                ))}
              </div>
                </span>
                <label className="uploadBtn">
                  <input type="file" style={{ display: "none" }} onChange={(e: any) => handleFileUpload(e, "1")} multiple />
                  Browse files
                </label>
              </div>
            </div>
            <div className='form_group fileuploader-items'>
              <ul className='fileuploader-items-list'>
                {fileArray?.length > 0 && fileArray?.map((file: any, i: any) => {console.log(i); return (
                  <li className='list' key={i}>
                    <div className='columns'>
                      <div className='column-thumbnail'>
                        <div className='fileuploader-item-image' >
                          <a href={file.url} target="_blank"><img src={file.url} alt=""></img></a>
                        </div>
                      </div>
                      <div className='column-title'>
                        <div>{file.name}</div>
                        <span>{file.size}</span>
                      </div>
                      <div className='column-action'>
                        <button type="button" className='action-btn action-remove-btn' onClick={(e:any) => deleteFile(i)}>X</button>
                      </div>
                    </div>
                  </li>
                )})}
              </ul>
            </div>
          </div>
          <div className="sub_button">
            <button type="submit">Submit</button>
          </div>
        </form>
        <div className='bottomtext'>
          <p>{t('register.refer_note')}</p>
          <p>{t('register.assist_note2')}</p>
          <p className='tc_blue'><a href="https://quidlab.com/img/Privacy_policy.pdf" target="_blank">{t('register.privacy_text')}</a></p>
        </div>
        <div className="sub_button">
          <button type="button" onClick={() => handleLogout()}>Logout</button>
        </div>
      </div>
    </section>
  )
}

export default UploadDocument

function forEach(arg0: (file: any) => void) {
  throw new Error('Function not implemented.');
}
