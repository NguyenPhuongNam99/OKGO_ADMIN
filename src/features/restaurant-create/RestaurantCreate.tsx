import { Button, Form, Modal, Select } from "antd";
import axios from "axios";
import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import axiosClient from "../../api/api";
import DatePickerComponent from "../../components/date/DatePickerComponent";
import { validateCreateRestaurant } from "../../utils/Utils";
import { cityApi, provincesApi } from "../tour/tourApi";
import { AutoCompleteType } from "../tour/type";
import "../voucher-create/voucherCreateStyles.scss";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { editorConfiguration } from "../../utils/Utils";
import Editor from "ckeditor5-custom-build/build/ckeditor";

const RestaurantCreate = () => {
  const [valueFile, setValueFile] = useState<any>([]);
  const [timeStart, setTimeStart] = useState<string>();
  const [timeFinish, setTimeFinish] = useState<string>();
  const [isSelectedCity, setIsSelectCity] = useState<boolean>(false);
  const [provinces, setProvinces] = useState<AutoCompleteType[]>([]);
  const [form] = Form.useForm();
  const [cities, setCities] = useState<AutoCompleteType[]>([]);
  const [valueForm, setValueForm] = useState({
    cityForm: "",
    districtForm: "",
  });
  const [CKEditorDataDB, setCKEditorDataDB] = useState<string>("");
  const [isPageReady, setIsPageReady] = useState<boolean>(false);
  
  useEffect(() => {
    if (!isPageReady) {
      setIsPageReady(true);
    }
  }, []);

  useEffect(() => {
    const listCity = cityApi();
    Promise.all([listCity]).then((values) => {
      const listCity = values[0].data.data.data;
      const convertList = convertDataSource(listCity);
      setCities(convertList);
    });
  }, []);

  const convertDataSource = (data: any) => {
    return data?.map((item: any) => {
      return {
        label: item.name_with_type,
        value: item.code,
      };
    });
  };

  const handleDatePickerChange = (date: any, dateString: any, id: any) => {
    setTimeStart(dateString);
  };

  const handleDatePickerChange2 = (date: any, dateString: any, id: any) => {
    setTimeFinish(dateString);
  };

  const handleSelectCity = (id: string) => {
    setIsSelectCity(true);
    provincesApi(id)
      .then((value) => {
        const provincesList = value.data.data.data;
        setProvinces(convertDataSource(provincesList));
      })
      .catch();
    // set nha hang hoac khach san
    form.setFieldsValue({
      city: id,
      provinces: "",
    });
    setValueForm({
      ...valueForm,
      cityForm: id,
    });
  };

  const handleClearCity = () => {
    setProvinces([]);

    // clear nha hang hoac khach san
    form.setFieldsValue({
      provinces: "",
    });
  };

  const handleSelectProvinces = (id: string) => {
    form.setFieldsValue({
      provinces: id,
    });
    setValueForm({
      ...valueForm,
      districtForm: id,
    });
  };

  async function onFileChange(e: any) {
    const formData = new FormData();
    formData.append("upload", e.target.files[0]);

    try {
      const response = await axios({
        method: "post",
        url: "http://206.189.37.26:8080/uploadImageCloudArray",
        data: formData,
      });
      setValueFile([...valueFile, response.data]);
    } catch (error) {
      console.log("error new", error);
    }
  }




  const submitForm = async (values: any, resetForm: any) => {
    try {
      const formatFile: any = [];
      valueFile.map((item: any) => {
        return formatFile.push({
          image: item,
        });
      });
      console.log("format file", formatFile);
      let config = {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("Name"),
        },
      };
      const obj = {
        name: values.name,
        description: CKEditorDataDB,
        city_id: valueForm.cityForm,
        district_id: valueForm.districtForm,
        address_detail: values.address_detail,
        images: formatFile,
        price: values.price,
        open_time: timeStart,
        close_time: timeFinish,
      };

      console.log("obj", obj);
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/v1/restaurant/createRestaurant`,
        obj,
        config
      );
      console.log("response new", response);
      toast.success("🦄 Tạo nhà hàng thành công!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      form.setFieldsValue({
        provinces: "",
        city: "",
      });
      resetForm();
      setTimeStart("");
      setTimeFinish("");
      setValueFile(undefined);
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <div className="containerRestaurant">
      <div className="blockContentRestaurant">
        <div className="headerTitleRestaurant">
          <h5 className="titleRestaurant">Thêm mới nhà hàng</h5>
        </div>

        <Formik
          initialValues={{
            name: "",
            address_detail: "",
            price: "",
          }}
          validationSchema={validateCreateRestaurant}
          onSubmit={async (values, { resetForm }) => {
            console.log("values", values);
            await submitForm(values, resetForm);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            resetForm,
            /* and other goodies */
          }) => (
            <form onSubmit={handleSubmit}>
              <div className="FormContent">
                <ToastContainer />

                <div className="formBlock">
                  <p className="vouchername">Tên nhà hàng</p>
                  <input
                    className="inputContent"
                    placeholder="Nhập tên nhà hàng"
                    name="name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                  />
                </div>
                {errors.name && touched.name && errors.name && (
                  <p className="errorInput">
                    {errors.name && touched.name && errors.name}
                  </p>
                )}
                <div className="formBlock">
                  <p className="vouchername">Miêu tả nhà hàng</p>
                   {isPageReady && (
                    <CKEditor
                    
                      editor={Editor}
                      data={CKEditorDataDB}
                      config={editorConfiguration}
                      onChange={(event: any, editor: any) => {
                        setCKEditorDataDB(editor.getData());
                      }}
                    />
                  )}
                </div>
              
                <div className="formBlock">
                  <p className="vouchername">Giá giao động</p>
                  <input
                    className="inputContent"
                    placeholder="Nhập giá"
                    name="price"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.price}
                  />
                </div>
                {errors.price && touched.price && errors.price && (
                  <p className="errorInput">
                    {errors.price && touched.price && errors.price}
                  </p>
                )}

                <div className="formBlock">
                  <p className="vouchername">Thành phố</p>
                  <Select
                    showSearch
                    allowClear
                    onClear={handleClearCity}
                    style={{ width: "100%" }}
                    options={cities}
                    onSelect={handleSelectCity}
                    filterOption={(inputValue, option) =>
                      option!.label
                        .toUpperCase()
                        .indexOf(inputValue.toUpperCase()) !== -1
                    }
                  />
                </div>

                <div className="formBlock">
                  <p className="vouchername">Quận huyện</p>

                  <Select
                    showSearch
                    allowClear
                    style={{ width: "100%" }}
                    options={provinces}
                    onSelect={handleSelectProvinces}
                    filterOption={(inputValue, option) =>
                      option!.label
                        .toUpperCase()
                        .indexOf(inputValue.toUpperCase()) !== -1
                    }
                  />
                </div>
                <div className="formBlock">
                  <p className="vouchername">Nhập địa chỉ chi tiết</p>
                  <input
                    className="inputContent"
                    placeholder="Nhập địa chỉ chi tiết"
                    name="address_detail"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.address_detail}
                  />
                </div>
                {errors.address_detail &&
                  touched.address_detail &&
                  errors.address_detail && (
                    <p className="errorInput">
                      {errors.address_detail &&
                        touched.address_detail &&
                        errors.address_detail}
                    </p>
                  )}
                <div className="formBlock">
                  <p className="vouchername">Chọn file</p>
                  <input
                    type="file"
                    id="avatar"
                    name="avatar"
                    accept="image/png, image/jpeg"
                    onChange={onFileChange}
                  />
                </div>
                <div className="formBlock">
                  <p className="vouchername">Chọn file</p>
                  <input
                    type="file"
                    id="avatar"
                    name="avatar"
                    accept="image/png, image/jpeg"
                    onChange={onFileChange}
                  />
                </div>
                <div className="formBlock">
                  <p className="vouchername">Chọn file</p>
                  <input
                    type="file"
                    id="avatar"
                    name="avatar"
                    accept="image/png, image/jpeg"
                    onChange={onFileChange}
                  />
                </div>
                <div className="formBlock">
                  <p className="vouchername">Chọn file</p>
                  <input
                    type="file"
                    id="avatar"
                    name="avatar"
                    accept="image/png, image/jpeg"
                    onChange={onFileChange}
                  />
                </div>
                
                <div className="formBlock">
                  <p className="vouchername">Thời gian mở cửa</p>
                  <DatePickerComponent
                    handleDatePickerChange={handleDatePickerChange}
                    onlyTimeNow
                  />
                </div>
                <div className="formBlock">
                  <p className="vouchername">Thời gian đóng cửa</p>
                  <DatePickerComponent
                    handleDatePickerChange={handleDatePickerChange2}
                    onlyTimeNow
                  />
                </div>
                <div className="buttonSubmit">
                  <Button
                    type="primary"
                    danger
                    style={{ width: "40%" }}
                    // onClick={() => cancelForm(resetForm)}
                  >
                    Huỷ
                  </Button>
                  <button
                    type="submit"
                    style={{
                      width: "40%",
                      border: 1,
                      borderColor: "green",
                      backgroundColor: "#5468ff",
                      color: "white",
                      borderRadius: 7,
                    }}
                  >
                    Lưu
                  </button>
                </div>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default RestaurantCreate;
