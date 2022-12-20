import { Button } from "antd";
import "./restaurantCreateStyles.scss";
import DatePickerComponent from "../../components/date/DatePickerComponent";
import { Formik } from "formik";
import { createVoucher } from "../../utils/Utils";
import axiosClient from "../../api/api";
import axios from "axios";
import { useState } from "react";

interface TypeSetValue {
  name: string;
  discription: string;
  code: string;
  percentDiscount: number;
  minPrice: number;
  maxPrice: number;
  totalVoucher: number;
}
const RestaurantCreate = () => {
  const [value, setValue] = useState<TypeSetValue>();
  const handleDatePickerChange = (date: any, dateString: any, id: any) => {
    console.log(dateString);
  };
  const handleDatePickerChange2 = (date: any, dateString: any, id: any) => {
    console.log(dateString);
  };

  console.log("value new", value);

  const submitForm = async (values: TypeSetValue) => {
    console.log("values form", values);
    try {
      let config = {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("Name"),
        },
      };
      const obj = {
        name: values.name,
        decription: values.discription,
        code: values.code,
        image_url: "http://localhost:name",
        percent_discount: values.percentDiscount,
        price_min_condition: values.minPrice,
        price_max_condition: values.maxPrice,
        quantity: values.totalVoucher,
        time_start: "20/11/2020",
        time_end: "20/12/2022",
      };
      console.log('obj new', obj)
      const response = await axios.post(
        "http://localhost:8000/v1/voucher/createVoucher",
        obj,

        config
      );
      console.log("response data", response);
    } catch (error) {
      console.log("error new", error);
    }
  };

  return (
    <div className="containerRestaurant">
      <div className="blockContentRestaurant">
        <div className="headerTitleRestaurant">
          <h6 className="titleRestaurant">Thêm mới voucher</h6>
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
          onSubmit={async (values) => {
            console.log("values", values);
            await submitForm(values);
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
            <form onSubmit={handleSubmit}>
              <div className="FormContent">
                <div className="formBlock">
                  <p className="vouchername">Tên voucher</p>
                  <input
                    className="inputContent"
                    placeholder="Nhập tên voucher"
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
                  <p className="vouchername">Miêu tả voucher</p>
                  <input
                    className="inputContent"
                    placeholder="Nhập miêu tả voucher"
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
                  <p className="vouchername">Mã giảm giá</p>
                  <input
                    className="inputContent"
                    placeholder="Nhập mã giảm giá"
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
                  <p className="vouchername">% được giảm</p>
                  <input
                    className="inputContent"
                    placeholder="Nhập % được giảm"
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
                  <p className="vouchername">Giá tối thiểu để áp dụng mã</p>
                  <input
                    className="inputContent"
                    placeholder="Nhập giá tối thiểu để áp dụng mã"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.minPrice}
                    name="minPrice"
                  />
                </div>
                {errors.minPrice && touched.minPrice && errors.minPrice && (
                  <p className="errorInput">
                    {errors.minPrice && touched.minPrice && errors.minPrice}
                  </p>
                )}
                <div className="formBlock">
                  <p className="vouchername">Giá tối đa để áp dụng mã</p>
                  <input
                    className="inputContent"
                    placeholder="Nhập giá tối đa để áp dụng mã"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.maxPrice}
                    name="maxPrice"
                  />
                </div>
                {errors.maxPrice && touched.maxPrice && errors.maxPrice && (
                  <p className="errorInput">
                    {errors.maxPrice && touched.maxPrice && errors.maxPrice}
                  </p>
                )}
                <div className="formBlock">
                  <p className="vouchername">Tổng số voucher phát hành</p>
                  <input
                    className="inputContent"
                    placeholder="Nhập tổng số voucher phát hành"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.totalVoucher}
                    name="totalVoucher"
                  />
                </div>
                {errors.totalVoucher &&
                  touched.totalVoucher &&
                  errors.totalVoucher && (
                    <p className="errorInput">
                      {errors.totalVoucher &&
                        touched.totalVoucher &&
                        errors.totalVoucher}
                    </p>
                  )}
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
                  <Button type="primary" danger style={{ width: "40%" }}>
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
