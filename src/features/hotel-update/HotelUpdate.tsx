import { Button, Form, Select, Spin } from "antd";
import axios from "axios";
import { Formik } from "formik";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { validateCreateHotel } from "../../utils/Utils";
import { cityApi, provincesApi } from "../tour/tourApi";
import { AutoCompleteType } from "../tour/type";
import "../voucher-create/voucherCreateStyles.scss";
import UploadFileComponent from "../hotel-create/component/UploadFile";
import axiosClient from "../../api/api";
import { useParams } from "react-router-dom";

const HotelUpdate = () => {
  const params = useParams();

  const [data, setData] = useState<any>();
  const [valueFile, setValueFile] = useState<any>(data ? data.image : []);
  const [isSelectedCity, setIsSelectCity] = useState<boolean>(false);
  const [provinces, setProvinces] = useState<AutoCompleteType[]>([]);
  const [form] = Form.useForm();
  const [cities, setCities] = useState<AutoCompleteType[]>([]);
  const [valueForm, setValueForm] = useState({
    cityForm: "",
    districtForm: "",
    type: "",
  });
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const listCity = cityApi();
    Promise.all([listCity]).then((values) => {
      const listCity = values[0]?.data?.data?.data;
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

  const submitForm = async (values: any, resetForm: any) => {
    try {
      const formatFile: any = [];
      valueFile.map((item: any) => {
        return formatFile.push({
          image: item,
        });
      });
      let config = {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("Name"),
        },
      };
      const obj = {
        name: values.name,
        description: values.description,
        city_id: valueForm.cityForm,
        district_id: valueForm.districtForm,
        address_detail: values.address_detail,
        image: formatFile,
        price: values.price,
        type: valueForm.type,
      };

      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/v1/hotel/createHotel`,
        obj,
        config
      );
      toast.success("🦄 Cập nhật nhà hàng thành công!", {
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

      setValueFile([]);
    } catch (error) {
      console.log("error", error);
    }
  };

  const onChange = (value: string) => {
    setValueForm({
      ...valueForm,
      type: value,
    });

    setValueForm({
        ...valueForm,
        type: data?.type
    })
  };

  const fetchIDHotel = async () => {
    try {
      setLoading(true);
      const response = await axiosClient.get(`/v1/hotel/${params.id}`);
      console.log("response new", response);
      setData(response);
       form.setFieldsValue({
        provinces: data.district_id,
        city: data.district_id,
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("error", error);
    }
  };

  useEffect(() => {
    fetchIDHotel();
  }, []);

  console.log("data name", data?.name);
  return (
    <Spin tip="loading" spinning={loading} size={"large"}>
      <div className="containerRestaurant">
        <div className="blockContentRestaurant">
          <div className="headerTitleRestaurant">
            <h5 className="titleRestaurant">Cập nhật nhà hàng</h5>
          </div>
          <ToastContainer />

          {data && (
            <Formik
              initialValues={{
                name: data?.name ? data.name : "",
                description:data?.description ? data?.description : "",
                address_detail: data ? data.address_detail: "",
                price: data? data?.price: "",
              }}
              validationSchema={validateCreateHotel}
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
              }: /* and other goodies */
              any) => (
                <form onSubmit={handleSubmit}>
                  <div className="FormContent">
                    <div className="formBlock">
                      <p className="vouchername">Tên khách sạn</p>
                      <input
                        className="inputContent"
                        placeholder="Nhập tên khách sạn"
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
                      <p className="vouchername">Miêu tả khách sạn</p>
                      <input
                        className="inputContent"
                        placeholder="Nhập miêu tả khách sạn"
                        name="description"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.description}
                      />
                    </div>
                    {errors.description &&
                      touched.description &&
                      errors.description && (
                        <p className="errorInput">
                          {errors.description &&
                            touched.description &&
                            errors.description}
                        </p>
                      )}

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
                      defaultValue={data?.city_id}
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
                                            defaultValue={data?.district_id}

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
                      <p className="vouchername">Loại</p>

                      <Select
                      defaultValue={data?.type}
                        style={{ width: "100%" }}
                        showSearch
                        placeholder="Chọn loại"
                        optionFilterProp="children"
                        onChange={onChange}
                        filterOption={(input, option) =>
                          (option?.label ?? "")
                            .toLowerCase()
                            .includes(input.toLowerCase())
                        }
                        options={[
                          {
                            value: "hotel",
                            label: "khách sạn",
                          },
                          {
                            value: "homeStay",
                            label: "homeStay",
                          },
                        ]}
                      />
                    </div>
                    <div className="formBlock">
                      <p className="vouchername">Chọn file</p>

                      <div style={{ display: "flex", flexDirection: "row" }}>
                        <UploadFileComponent
                          setValueFile={setValueFile}
                          valueFile={valueFile}
                          index={0}
                        />
                        <UploadFileComponent
                          setValueFile={setValueFile}
                          valueFile={valueFile}
                          index={1}
                        />
                        <UploadFileComponent
                          setValueFile={setValueFile}
                          valueFile={valueFile}
                          index={2}
                        />
                        <UploadFileComponent
                          setValueFile={setValueFile}
                          valueFile={valueFile}
                          index={3}
                        />
                      </div>
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
          )}
        </div>
      </div>
    </Spin>
  );
};

export default HotelUpdate;
