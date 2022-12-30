import { Button, Form, Select, Spin, Upload } from "antd";
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
import { PlusOutlined } from "@ant-design/icons";
import _ from "lodash";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { editorConfiguration } from "../../utils/Utils";
import Editor from "ckeditor5-custom-build/build/ckeditor";

const HotelUpdate = () => {
  const params = useParams();

  const [data, setData] = useState<any>();
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
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [isPageReady, setIsPageReady] = useState<boolean>(false);
  const [CKEditorDataDB, setCKEditorDataDB] = useState<string>("");

  useEffect(() => {
    if (!isPageReady) {
      setIsPageReady(true);
    }
  }, []);

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
        description: CKEditorDataDB,
        city_id: valueForm.cityForm,
        district_id: valueForm.districtForm,
        address_detail: values.address_detail,
        image: formatFile,
        price: values.price,
        type: valueForm.type,
      };

      const response = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/v1/hotel/updateHotel/${params.id}`,
        obj,
        config
      );
      resetForm();
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

  const fetchIDHotel = async () => {
    try {
      setLoading(true);
      const response: any = await axiosClient.get(`/v1/hotel/${params.id}`);
      console.log("response new", response);
      setData(response);
      setCount(response.image.length);
      form.setFieldsValue({
        provinces: response.district_id,
        city: response.city_id,
      });
      setValueForm({
        type: response?.type,
        districtForm: response?.district_id,
        cityForm: response?.city_id,
      });
      console.log('data new', response.description)
      setCKEditorDataDB(response?.description)
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("error", error);
    }
  };

  useEffect(() => {
    fetchIDHotel();
  }, []);

  const handleUploadChange = (uploadInfo: any) => {
    setCountFile(uploadInfo.fileList.length);
    if (uploadInfo.file.status !== "removed") {
      const formData = new FormData();
      console.log(uploadInfo.file);
      formData.append("upload", uploadInfo.file);
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

  const formatDefaultList: any = [];
  data?.image.map((item: any, index: any) => {
    formatDefaultList.push({
      uid: index,
      url: item.image,
      status: "done",
    });
  });

  console.log("format", formatDefaultList.length, count);

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
                address_detail: data ? data.address_detail : "",
                price: data ? data?.price : "",
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
                        <Upload
                          multiple
                          maxCount={4}
                          defaultFileList={formatDefaultList}
                          accept="image/png, image/jpeg"
                          // action={uploadURl}
                          listType="picture-card"
                          onChange={handleUploadChange}
                          onRemove={(file: any) => {
                            setCount(count - 1);
                            console.log("count", count - 1);
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
                          {count < 4 && (
                            <div>
                              <PlusOutlined />
                              <div style={{ marginTop: 8 }}>Upload</div>
                            </div>
                          )}
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
          )}
        </div>
      </div>
    </Spin>
  );
};

export default HotelUpdate;
