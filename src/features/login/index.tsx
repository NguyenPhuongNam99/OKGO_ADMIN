import React, { useEffect } from "react";
import "./styles.scss";
import { Formik } from "formik";
import { LoginSchema } from "../../utils/Utils";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { loginApi } from "./loginApi";
import { useQuery } from "react-query";

const Login = () => {
  const navigate = useNavigate();
  

  return (
    <Formik
      initialValues={{
        acount: "",
        password: "",
      }}
      validationSchema={LoginSchema}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        setSubmitting(false);
        console.log("values", values);
        loginApi(values.acount, values.password)
          .then((response: any) => {
            console.log('dtaaaa', response)
            localStorage.setItem("Name", response.data.accesToken);
            toast.success("🦄 Chúc mừng bạn đã đăng nhập thành công!", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
            setTimeout(() => {
              navigate("/Home");
            }, 1500);
          })
          .catch((error) => {
            console.log('error new', error)
            toast.error(String('loi roi '), {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          });
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        /* and other goodies */
      }) => (
        <form onSubmit={handleSubmit} className='containerForm'>
          <ToastContainer />
            <div className="blockContent">
              <div className="itemContent">
                <img
                  className="itemContent_image"
                  src={require("../../assets/images/travel.webp")}
                />
              </div>
              <div className="itemContent">
                <div className="itemContentCenter">
                  <img
                    className="itemContent_imageLogo"
                    src={require("../../assets/images/okgoimage.png")}
                  />
                  <p className="headerLogin">chào mừng</p>
                  <p className="titleLogin">
                    Hãy đăng nhập để trải nghiệm cùng chúng tôi.
                  </p>
                  <div className="inputContainer">
                    <input
                      type="acount"
                      name="acount"
                      placeholder="Tên đăng nhập"
                      className="input"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.acount}
                    />
                    {errors.acount && touched.acount && errors.acount && (
                      <p className="colorError">
                        {errors.acount && touched.acount && errors.acount}
                      </p>
                    )}

                    <input
                      type="password"
                      name="password"
                      placeholder="Mật khẩu"
                      className="input"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                    />
                    {errors.password && touched.password && errors.password && (
                      <p className="colorError">
                        {errors.password && touched.password && errors.password}
                      </p>
                    )}
                  </div>
                  <div className="buttonClick">
                    <button
                      className="button"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      Đăng nhập
                    </button>
                  </div>
                </div>
              </div>
            </div>
        
        </form>
      )}
    </Formik>
  );
};

export default Login;
