import { Button, message } from "antd";
import Upload, {
  RcFile,
  UploadChangeParam,
  UploadFile,
  UploadProps,
} from "antd/es/upload";
import React, { useEffect, useState } from "react";
import "./restaurantUpdate.scss";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Formik } from "formik";
import { updateInputSchema } from "../../utils/Utils";
import axios from "axios";
import useFetchApi from "../../hook/useFetchApi";
import { useLocation, useParams } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { editorConfiguration } from "../../utils/Utils";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useNavigate } from "react-router-dom";

// import Editor from "ckeditor5-custom-build/build/ckeditor";
//thêm trường miêu tả khách sạn : décription
const RestaurantUpdate = (props: any) => {
  const params = useParams();
  const [isPageReady, setIsPageReady] = useState<boolean>(false);
  const [CKEditorDataDB, setCKEditorDataDB] = useState<string>("");
  const navigate = useNavigate()

  useEffect(() => {
    if (!isPageReady) {
      setIsPageReady(true);
    }
  }, []);

  async function onFileChange(e: any) {
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
  }
  return (
    <Formik
      initialValues={{
        name: "",
        address: "",
        address_detail: "",
        price: "",
        discription: "",
        amount: "",
      }}
      validationSchema={updateInputSchema}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
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
        <form onSubmit={handleSubmit} className="containerResult">
          <div className="containerResult">
            <div className="headerRestaurant">
              <p className="titleHeader">CẬP NHẬT NHÀ HÀNG</p>
              <div className="headerRightRestaurant">
                <Button
                  type="primary"
                  size={"large"}
                  className="buttonForm"
                  danger
                >
                  Huỷ
                </Button>
                <Button type="primary" size={"large"} className="buttonForm">
                  Lưu
                </Button>
              </div>
            </div>
            <div className="contentRestaurant">
              <div className="blockContentRes">
                <div className="leftContent">
                  <p className="titleContent">Tên nhà hàng</p>
                </div>
                <div className="rightContent">
                  <input
                    className="inputValue"
                    type="name"
                    name="name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                  />
                </div>
              </div>
              {errors.name && touched.name && errors.name && (
                <div className="containError">
                  <div className="leftError" />
                  <p className="rightError">
                    {errors.name && touched.name && errors.name}
                  </p>
                </div>
              )}

              <div className="formBlock">
                <p className="vouchername">Số lượng bàn</p>
                <input
                  className="inputContent"
                  placeholder="Nhập số lượng"
                  name="amount"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.amount}
                />
              </div>
              {errors.amount && touched.amount && errors.amount && (
                <p className="errorInput">
                  {errors.amount && touched.amount && errors.amount}
                </p>
              )}

              <div className="blockContentRes">
                <div className="leftContent">
                  <p className="titleContent">Địa chỉ</p>
                </div>
                <div className="rightContent">
                  <input
                    className="inputValue"
                    type="address"
                    name="address"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.address}
                  />
                </div>
              </div>
              {errors.address && touched.address && errors.address && (
                <div className="containError">
                  <div className="leftError" />
                  <p className="rightError">
                    {errors.address && touched.address && errors.address}
                  </p>
                </div>
              )}
              <div className="blockContentRes">
                <div className="leftContent">
                  <p className="titleContent">Địa chỉ chi tiết</p>
                </div>
                <div className="rightContent">
                  <input
                    className="inputValue"
                    type="address_detail"
                    name="address_detail"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.address_detail}
                  />
                </div>
              </div>
              {errors.address_detail &&
                touched.address_detail &&
                errors.address_detail && (
                  <div className="containError">
                    <div className="leftError" />
                    <p className="rightError">
                      {errors.address_detail &&
                        touched.address_detail &&
                        errors.address_detail}
                    </p>
                  </div>
                )}
              <div className="blockContentRes">
                <div className="leftContent">
                  <p className="titleContent">Thời gian mở cửa</p>
                </div>
                <div className="rightContent">
                  <input className="inputValue" />
                </div>
              </div>
              <div className="blockContentRes">
                <div className="leftContent">
                  <p className="titleContent">Thời gian đóng cửa</p>
                </div>
                <div className="rightContent">
                  <input className="inputValue" />
                </div>
              </div>
              <div className="blockContentRes">
                <div className="leftContent">
                  <p className="titleContent">Miêu tả</p>
                </div>
                <div className="rightContent">
                  {isPageReady && (
                    <CKEditor
                      editor={ClassicEditor}
                      data={CKEditorDataDB}
                      config={editorConfiguration}
                      onChange={(event: any, editor: any) => {
                        setCKEditorDataDB(editor.getData());
                      }}
                    />
                  )}
                </div>
              </div>

              <div className="blockContentRes">
                <div className="leftContent">
                  <p className="titleContent">Giá</p>
                </div>
                <div className="rightContent">
                  <input
                    className="inputValue"
                    type="price"
                    name="price"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.price}
                  />
                </div>
              </div>
              {errors.price && touched.price && errors.price && (
                <div className="containError">
                  <div className="leftError" />
                  <p className="rightError">
                    {errors.price && touched.price && errors.price}
                  </p>
                </div>
              )}
              <div className="blockContentRes imgaeContent">
                <div className="leftContent">
                  <p className="titleContent">Ảnh</p>
                </div>
                <div className="rightContent">
                  <input
                    type="file"
                    id="avatar"
                    name="avatar"
                    accept="image/png, image/jpeg"
                    onChange={onFileChange}
                  />
                  <input
                    type="file"
                    id="avatar"
                    name="avatar"
                    accept="image/png, image/jpeg"
                    onChange={onFileChange}
                  />
                  <input
                    type="file"
                    id="avatar"
                    name="avatar"
                    accept="image/png, image/jpeg"
                    onChange={onFileChange}
                  />
                  <input
                    type="file"
                    id="avatar"
                    name="avatar"
                    accept="image/png, image/jpeg"
                    onChange={onFileChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default RestaurantUpdate;
