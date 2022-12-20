import React, { useState } from "react";
import "./login.scss";
import { Input } from "antd";
import { Checkbox, Button } from "antd";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import { LoginSchema } from "../../utils/Utils";
import { Formik } from "formik";
import { loginScreenApi } from "./loginScreenApi";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const LoginScreen = () => {
  const navigate = useNavigate();

  const onChange = (e: CheckboxChangeEvent) => {
    console.log(`checked = ${e.target.checked}`);
  };

  return (
    <div className="containerLogin">
      <div className="blockLogin">
        <div className="blockLeft">
          <img
            src={require("../../assets/images/logoIcon.jpeg")}
            alt=""
            className="imgLogo"
          />
        </div>
        <div className="blockRight">
          <Formik
            initialValues={{
              acount: "",
              password: "",
            }}
            validationSchema={LoginSchema}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              setSubmitting(false);
              console.log("values", values);
              loginScreenApi(values.acount, values.password)
                .then((response: any) => {
                  console.log("dtaaaa", response);
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
                  console.log("error new", error);
                  toast.error(String("loi roi "), {
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
              <form onSubmit={handleSubmit} className="fullBlockRight">
                <ToastContainer />

                <h4 className="headerTitle">Welcome Back</h4>
                <Input
                  className="inputLogin"
                  name="acount"
                  placeholder="Tên đăng nhập"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.acount}
                />
                {errors.acount && touched.acount && errors.acount && (
                  <p className="errorInput">
                    {errors.acount && touched.acount && errors.acount}
                  </p>
                )}

                <Input
                  type="password"
                  placeholder="Password"
                  className="inputLogin"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                />
                {errors.password && touched.password && errors.password && (
                  <p className="errorInput">
                    {errors.password && touched.password && errors.password}
                  </p>
                )}
                <div className="checkbox">
                  <Checkbox onChange={onChange} className="checkboxLabel">
                    Remember Me
                  </Checkbox>
                </div>
                <div className="inputSubmit">
                  <button
                    type="submit"
                    className="fullWidth backgroundSubmit"
                    disabled={isSubmitting}
                  >
                    Login
                  </button>
                </div>
                <div className="border" />
                <div className="containerSubmit">
                  <div className="inputSubmitForgot">
                    <Button type="text" danger>
                      Forgot Password?
                    </Button>
                  </div>
                  <div className="inputSubmitForgot">
                    <Button type="text" danger>
                      Create an Account
                    </Button>
                  </div>
                </div>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
