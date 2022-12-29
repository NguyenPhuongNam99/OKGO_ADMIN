import { Button, Form, Select, Upload } from "antd";
import axios from "axios";
import { Formik } from "formik";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { validateCreateHotel } from "../../utils/Utils";
import { cityApi, provincesApi } from "../tour/tourApi";
import { AutoCompleteType } from "../tour/type";
import "../voucher-create/voucherCreateStyles.scss";
import UploadFileComponent from "./component/UploadFile";
import { PlusOutlined } from "@ant-design/icons";

const HotelCreate = () => {
  const [valueFile, setValueFile] = useState<any>([]);
  const [timeStart, setTimeStart] = useState<string>();
  const [timeFinish, setTimeFinish] = useState<string>();
  const [isSelectedCity, setIsSelectCity] = useState<boolean>(false);
  const [provinces, setProvinces] = useState<AutoCompleteType[]>([]);
  const [form] = Form.useForm();
  const [cities, setCities] = useState<AutoCompleteType[]>([]);
  const [fileList, setFileList] = useState<any>([]);
  const [countFile, setCountFile] = useState();

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

  console.log("value file", valueFile);

  const submitForm = async (values: any, resetForm: any) => {
    try {
      const formatFile: any = [];
      fileList.map((item: any) => {
        return formatFile.push({
          image: item.url,
        });
      });
      console.log("fomat file", formatFile);
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
  };

  const handleUploadChange = (uploadInfo: any) => {
    console.log("uploadInfo.file", uploadInfo.file);
    console.log("1111111");

    setCountFile(uploadInfo.fileList.length);
    if (uploadInfo.file.status !== "removed") {
      const formData = new FormData();
      console.log(uploadInfo.file);
      formData.append("upload", uploadInfo.file);
      // // You can use any AJAX library you like
      fetch("http://206.189.37.26:8080/uploadImageCloud", {
        method: "POST",
        body: formData,
      })
        .then((res) => {
          return res.json();
        })
        .then((value) => {
          console.log("therer");
          setFileList((current: any) => [
            ...current,
            {
              uid: uploadInfo.file.uid,
              url: value.url,
            },
          ]);
        })
        .catch(() => {})
        .finally(() => {});
    }
  };

  console.log("file list", fileList);

  return (
    <div className="containerRestaurant">
      <div className="blockContentRestaurant">
        <div className="headerTitleRestaurant">
          <h5 className="titleRestaurant">Thêm mới nhà hàng</h5>
        </div>
        <ToastContainer />

        <Formik
          initialValues={{
            name: "",
            description: "",
            address_detail: "",
            price: "",
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
            /* and other goodies */
          }) => (
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
                  <p className="vouchername">Loại</p>

                  <Select
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
                    <Upload
                      multiple
                      maxCount={4}
                      accept="image/png, image/jpeg"
                      // action={uploadURl}
                      listType="picture-card"
                      onChange={handleUploadChange}
                      onRemove={(file: any) => {
                        const cloneFileList = [...fileList];
                        const newList = cloneFileList.filter(
                          (item) => item.uid !== file.uid
                        );
                        setFileList(newList);
                      }}
                      beforeUpload={(file) => {
                        return false;
                      }}
                    >
                      <div>
                        <PlusOutlined />
                        <div style={{ marginTop: 8 }}>Upload</div>
                      </div>
                    </Upload>
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
      </div>
    </div>
  );
};

export default HotelCreate;
