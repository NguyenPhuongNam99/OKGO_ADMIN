import { Button, message } from "antd";
import Upload, {
  RcFile,
  UploadChangeParam,
  UploadFile,
  UploadProps,
} from "antd/es/upload";
import React, { useState } from "react";
import "./restaurantUpdate.scss";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Formik } from "formik";
import { updateInputSchema } from "../../utils/Utils";

//thêm trường miêu tả khách sạn : décription
const RestaurantUpdate = () => {
  const getBase64 = (img: RcFile, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result as string));
    reader.readAsDataURL(img);
  };

  const beforeUpload = (file: RcFile) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
  };

  const [loading, setLoading] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string>();

  const handleChangeUpload: UploadProps["onChange"] = (
    info: UploadChangeParam<UploadFile>
  ) => {
    console.log("file new", info);
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as RcFile, (url) => {
        setLoading(false);
        setImageUrl(url);
        console.log("url ", url);
      });
    }
  };
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  return (
    <Formik
      initialValues={{
        name: "",
        address: "",
        address_detail: "",
        price: "",
        discription: "",
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
                <Button type="primary" size={"large"} className='buttonForm' danger>
                  Huỷ
                </Button>
                <Button type="primary" size={"large"} className='buttonForm'>
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
                  <input
                    className="inputValue"
                    type="discription"
                    name="discription"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.discription}
                  />
                </div>
              </div>
              {errors.discription && touched.discription && errors.discription && (
                <div className="containError">
                  <div className="leftError" />
                  <p className="rightError">
                    {errors.discription &&
                      touched.discription &&
                      errors.discription}
                  </p>
                </div>
              )}
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
                  <Upload
                    name="file"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    action={"http://localhost:8000/file/upload"}
                    beforeUpload={beforeUpload}
                    onChange={handleChangeUpload}
                    headers={{
                      Authorization: "Bearer " + localStorage.getItem("Name"),
                    }}
                    withCredentials
                  >
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt="avatar"
                        className="imagePreview"
                      />
                    ) : (
                      uploadButton
                    )}
                  </Upload>

                  <Upload
                    name="file"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    action={"http://localhost:8000/file/upload"}
                    beforeUpload={beforeUpload}
                    onChange={handleChangeUpload}
                    headers={{
                      Authorization: "Bearer " + localStorage.getItem("Name"),
                    }}
                    withCredentials
                  >
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt="avatar"
                        className="imagePreview"
                      />
                    ) : (
                      uploadButton
                    )}
                  </Upload>
                  <Upload
                    name="file"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    action={"http://localhost:8000/file/upload"}
                    beforeUpload={beforeUpload}
                    onChange={handleChangeUpload}
                    headers={{
                      Authorization: "Bearer " + localStorage.getItem("Name"),
                    }}
                    withCredentials
                  >
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt="avatar"
                        className="imagePreview"
                      />
                    ) : (
                      uploadButton
                    )}
                  </Upload>
                  <Upload
                    name="file"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    action={"http://localhost:8000/file/upload"}
                    beforeUpload={beforeUpload}
                    onChange={handleChangeUpload}
                    headers={{
                      Authorization: "Bearer " + localStorage.getItem("Name"),
                    }}
                    withCredentials
                  >
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt="avatar"
                        className="imagePreview"
                      />
                    ) : (
                      uploadButton
                    )}
                  </Upload>
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
