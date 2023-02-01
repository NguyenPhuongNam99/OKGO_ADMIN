import { Button, Form, Modal, Select, Table, Upload } from "antd";
import { lazy } from "react";

import axios from "axios";
import { Formik } from "formik";
import { useEffect, useMemo, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { validateCreateHotel } from "../../utils/Utils";
import {
  cityApi,
  cityCallApi,
  provincesApi,
  provincesApiData,
} from "../tour/tourApi";
import { AutoCompleteType } from "../tour/type";
import "../voucher-create/voucherCreateStyles.scss";
import "../hotel-create/hotelCreateStyles.scss";
import { PlusOutlined } from "@ant-design/icons";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { editorConfiguration } from "../../utils/Utils";
// import Editor from "ckeditor5-custom-build/build/ckeditor";
import { current } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useNavigate } from "react-router-dom";

// const CKEditor =  lazy(()=> import('@ckeditor/ckeditor5-react'));
const uploadURl = "http://206.189.37.26:8080/uploadImageCloud";

const HotelCreate = () => {
  const [timeStart, setTimeStart] = useState<string>();
  const [timeFinish, setTimeFinish] = useState<string>();
  const [isSelectedCity, setIsSelectCity] = useState<boolean>(false);
  const [provinces, setProvinces] = useState<AutoCompleteType[]>([]);
  const [form] = Form.useForm();
  const [cities, setCities] = useState<AutoCompleteType[]>([]);
  const [fileList, setFileList] = useState<any>([]);
  const [isPageReady, setIsPageReady] = useState<boolean>(false);
  const [CKEditorDataDB, setCKEditorDataDB] = useState<string>("");
  const [valueForm, setValueForm] = useState({
    cityForm: "",
    districtForm: "",
    type: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [rooms, setRooms] = useState<any>([]);
  const [roomThumbnail, setRoomThumbnail] = useState<any>([]);
  const navigate = useNavigate();

  const columns = useMemo(
    () => [
      {
        title: "Tên phòng",
        dataIndex: "room_name",
        key: "room_name",
      },
      {
        title: "Giá",
        dataIndex: "room_price",
        key: "room_price",
        render: (text: string) =>
          `${text}`.replace(/\B(?=(\d{3})+(?!\d))/g, ","),
      },
      {
        title: "Số người",
        dataIndex: "room_quantity",
        key: "room_quantity",
      },
    ],
    []
  );

  useEffect(() => {
    if (!isPageReady) {
      setIsPageReady(true);
    }
  }, []);

  useEffect(() => {
    const listCity = cityCallApi();
    Promise.all([listCity]).then((values) => {
      const convertList = convertDataCity(values[0]);
      setCities(convertList);
    });
  }, []);

  const convertDataCity = (data: any) => {
    return data?.map((item: any) => {
      return {
        label: item.name,
        value: item.cityId,
      };
    });
  };

  // modal function //
  const showModal = () => {
    setOpen(true);
  };

  const handleOk = async (values: any, setErrors: any) => {
    let flag = true;
    const errors: any = {};
    if (!values.room_name) {
      errors.room_name = "Tên phòng đang để trống";
      flag = false;
    }
    if (!values.room_price) {
      errors.room_price = "Giá phòng đang để trống";
      flag = false;
    }
    if (!values.room_quantity) {
      errors.room_quantity = "Số lượng người đang để trống";
      flag = false;
    }
    // if (!values.upload) {
    //   errors.upload = "Thumbnail đang để trống";
    //   flag = false;
    // }


    setConfirmLoading(true);

    if (flag) {
      //call api here
      await setRooms((current: any) => {
        const filterList = current.filter(
          (item: any) =>
            item.room_name.toLowerCase() === values.room_name.toLowerCase()
        );
        if (filterList.length > 0) {
          errors.room_name = "Tên phòng đang trùng";
          flag = false;
          return current;
        } else {
          return [
            ...current,
            {
              key: uuid(),
              room_name: values.room_name,
              room_price: values.room_price,
              room_quantity: values.room_quantity,
              room_status: false,
              room_description: values.room_description,
              room_thumbnail: roomThumbnail[0]?.url
            },
          ];
        }
      });
    }
    setErrors(errors);
    return flag;
  };

  const handleCancel = () => {
    setOpen(false);
  };

  // modal function //

  const convertDataSource = (data: any) => {
    return data?.map((item: any) => {
      return {
        label: item.name,
        value: item.districtId,
      };
    });
  };

  const handleSelectCity = (id: string) => {
    setIsSelectCity(true);
    provincesApiData(id)
      .then((value) => {
        const provincesList = value;
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
        room: rooms,
      };

      await axios.post(
        `http://206.189.37.26:8080/v1/hotel/createHotel`,
        obj,
        config
      );
      toast.success("🦄 Tạo khách sạn thành công!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setTimeout(() => {
        navigate(-1)
      }, 3000);
      form.setFieldsValue({
        provinces: "",
        city: "",
      });
      resetForm();
      setTimeStart("");
      setTimeFinish("");
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

  const handleUploadChangeRoom = (uploadInfo: any) => {
    if (uploadInfo.file.status !== "removed") {
      const formData = new FormData();
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
          console.log(value);
          setRoomThumbnail([{
            uid: '1',
            // name: 'room_thumbnail',
            // status: 'done',
            url: value.url,
          }])
          // setFieldValue("room_thumbnail", value.url);
        })
        .catch(() => {})
        .finally(() => {});
    }
  };

  return (
    <div className="containerRestaurant">
      <div className="blockContentRestaurant">
        <div className="headerTitleRestaurant">
          <h5 className="titleRestaurant">Thêm mới khách sạn</h5>
        </div>
        <div style={{zIndex: 99}}>
        <ToastContainer />

        </div>
        <Formik
          initialValues={{
            name: "",
            address_detail: "",
            price: "",
            room_name: "",
            room_price: "",
            room_quantity: "",
            amount: "",
            room_description: "",
            room_thumbnail: "",
          }}
          validationSchema={validateCreateHotel}
          onSubmit={async (values, { resetForm }) => {
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
            setFieldValue,
            setErrors,
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

                <div className="formBlock">
                  {/* <p className="vouchername">Tạo phòng khách sạn</p> */}

                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <Button
                      type="primary"
                      onClick={() => {
                        setFieldValue("room_name", "");
                        setFieldValue("room_price", "");
                        setFieldValue("room_quantity", "");
                        setFieldValue("room_description", "");
                        setRoomThumbnail([])
                        showModal();
                      }}
                    >
                      Tạo phòng khách sạn
                    </Button>
                    <Modal
                      title="Tạo phòng khách sạn"
                      open={open}
                      onOk={() => {
                        handleOk(values, setErrors).then((value) => {
                          if (value) {
                            setConfirmLoading(false);
                            toast.success("🦄 Tạo phòng thành công!", {
                              position: "top-right",
                              autoClose: 5000,
                              hideProgressBar: false,
                              closeOnClick: true,
                              pauseOnHover: true,
                              draggable: true,
                              progress: undefined,
                              theme: "colored",
                            });
                            setFieldValue("room_name", "");
                            setFieldValue("room_price", "");
                            setFieldValue("room_quantity", "");
                            setFieldValue("room_description", "");
                            setRoomThumbnail([])
                          } else {
                            setConfirmLoading(false);
                          }
                        });
                      }}
                      confirmLoading={confirmLoading}
                      onCancel={handleCancel}
                    >
                      {/* <p>{modalText}</p> */}
                      <div className="createRoomContainer">
                        <div>
                          <span className="title">Tên phòng</span>
                          <input
                            className="inputContent values"
                            placeholder="Nhập tên phòng"
                            name="room_name"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.room_name}
                          />
                          {errors && errors.room_name && (
                            <div className="error">{errors.room_name}</div>
                          )}
                        </div>

                        <div>
                          <span className="title">Giá</span>
                          <input
                            type="number"
                            className="inputContent values"
                            placeholder="Nhập giá"
                            name="room_price"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.room_price}
                          />
                          {errors && errors.room_price && (
                            <div className="error">{errors.room_price}</div>
                          )}
                        </div>

                        <div>
                          <span className="title">Số người</span>
                          <input
                            type="number"
                            className="inputContent values"
                            placeholder="Nhập số lượng người"
                            name="room_quantity"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.room_quantity}
                          />
                          {errors && errors.room_quantity && (
                            <div className="error">{errors.room_quantity}</div>
                          )}
                        </div>
                        <div>
                          <span className="title">Nhập miêu tả phòng</span>
                          <input
                            className="inputContent values"
                            placeholder="Nhập miêu tả phòng"
                            name="room_description"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.room_description}
                          />
                          {errors && errors.room_description && (
                            <div className="error">
                              {errors.room_description}
                            </div>
                          )}
                        </div>

                        <div>
                          <span className="title">Thumbnail</span>
                          <Upload
                            multiple
                            maxCount={1}
                            accept="image/png, image/jpeg"
                            fileList={roomThumbnail}
                            // action={uploadURl}
                            listType="picture-card"
                            onChange={handleUploadChangeRoom}
                            onRemove={(file: any) => {
                              setRoomThumbnail([])
                              // setFieldValue("room_thumbnail", "");
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

                          {errors && errors.room_thumbnail && (
                            <div className="error">{errors.room_thumbnail}</div>
                          )}
                        </div>
                      </div>
                    </Modal>
                  </div>

                  <div>
                    <Table
                      columns={columns}
                      dataSource={rooms}
                      pagination={{ defaultPageSize: 5 }}
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
      </div>
    </div>
  );
};

export default HotelCreate;
