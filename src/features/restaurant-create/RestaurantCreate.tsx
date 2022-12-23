import { Button, Form, Select } from "antd";
import axios from "axios";
import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import DatePickerComponent from "../../components/date/DatePickerComponent";
import { createVoucher } from "../../utils/Utils";
import { cityApi, provincesApi } from "../tour/tourApi";
import { autoCompleteType } from "../tour/type";
import "../voucher-create/voucherCreateStyles.scss";

const RestaurantCreate = () => {
  const [valueFile, setValueFile] = useState<any>();
  const [timeStart, setTimeStart] = useState<string>();
  const [timeFinish, setTimeFinish] = useState<string>();
  const [isSelectedCity, setIsSelectCity] = useState<boolean>(false);
  const [provinces, setProvinces] = useState<autoCompleteType[]>([]);
  const [form] = Form.useForm();
  const [cities, setCities] = useState<autoCompleteType[]>([]);

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
  };
  async function onFileChange(e: any) {
    const formData = new FormData();
    formData.append("file", e.target.files[0]);

    try {
      const response = await axios({
        method: "post",
        url: "http://localhost:8000/file/upload",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + localStorage.getItem("Name"),
        },
      });
      setValueFile(response.data);
    } catch (error) {
      console.log("error new", error);
    }
  }
  return (
    <div className="containerRestaurant">
      <div className="blockContentRestaurant">
        <div className="headerTitleRestaurant">
          <h5 className="titleRestaurant">Thêm mới nhà hàng</h5>
        </div>
        <Formik
          initialValues={{
            name: "",
            discription: "",
            code: "",
            percentDiscount: 0,
            minPrice: 0,
            maxPrice: 0,
            totalVoucher: 0,
          }}
          validationSchema={createVoucher}
          onSubmit={async (values, { resetForm }) => {
            console.log("values", values);
            // await submitForm(values, resetForm);
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
                  <input
                    className="inputContent"
                    placeholder="Nhập miêu tả nhà hàng"
                    name="discription"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.discription}
                  />
                </div>
                {errors.discription &&
                  touched.discription &&
                  errors.discription && (
                    <p className="errorInput">
                      {errors.discription &&
                        touched.discription &&
                        errors.discription}
                    </p>
                  )}
                <div className="formBlock">
                  <p className="vouchername">Nhập địa chỉ chi tiết</p>
                  <input
                    className="inputContent"
                    placeholder="Nhập địa chỉ chi tiết"
                    name="code"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.code}
                  />
                </div>
                {errors.code && touched.code && errors.code && (
                  <p className="errorInput">
                    {errors.code && touched.code && errors.code}
                  </p>
                )}
                <div className="formBlock">
                  <p className="vouchername">Giá</p>
                  <input
                    className="inputContent"
                    placeholder="Nhập giá"
                    name="percentDiscount"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.percentDiscount}
                  />
                </div>
                {errors.percentDiscount &&
                  touched.percentDiscount &&
                  errors.percentDiscount && (
                    <p className="errorInput">
                      {errors.percentDiscount &&
                        touched.percentDiscount &&
                        errors.percentDiscount}
                    </p>
                  )}

                <div className="formBlock">
                  <p className="vouchername">thanh pho</p>
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
                  <p className="vouchername">Quan huyen</p>

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
                  <p className="vouchername">Thời gian bắt đầu</p>
                  <DatePickerComponent
                    handleDatePickerChange={handleDatePickerChange}
                  />
                </div>
                <div className="formBlock">
                  <p className="vouchername">Thời gian kết thúc</p>
                  <DatePickerComponent
                    handleDatePickerChange={handleDatePickerChange2}
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
