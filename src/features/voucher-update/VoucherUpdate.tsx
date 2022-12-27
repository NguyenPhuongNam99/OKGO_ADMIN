import { Button, Modal, Spin, UploadProps } from "antd";
import axios from "axios";
import { Formik } from "formik";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import DatePickerComponent from "../../components/date/DatePickerComponent";
import { createVoucher } from "../../utils/Utils";
import "./voucherUpdate.scss";
import { useParams } from "react-router-dom";
import useFetchApi from "../../hook/useFetchApi";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import Upload, { UploadChangeParam, UploadFile } from "antd/es/upload";

interface TypeSetValue {
  name: string;
  discription: string;
  code: string;
  percentDiscount: number;
  minPrice: number;
  maxPrice: number;
  totalVoucher: number;
}

interface TypeData {
  code: string;
  decription: string;
  idVoucher: number;
  image_url: string;
  name: string;
  percent_discount: number;
  price_max_condition: number;
  price_min_condition: number;
  quantity: number;
  time_end: string;
  time_start: string;
  __v: number;
  _id: string;
}
const VoucherUpdate = () => {
  const params = useParams();
  const [data, setData] = useState<TypeData | undefined>();
  const [valueFile, setValueFile] = useState<any>();
  const [timeStart, setTimeStart] = useState<string | undefined>(
    data?.time_start
  );
  const [timeFinish, setTimeFinish] = useState<string | undefined>(
    data?.time_end
  );
  const [checkSubmit, setCheckSubmit] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleDatePickerChange = (date: any, dateString: any, id: any) => {
    setTimeStart(dateString);
  };
  const handleDatePickerChange2 = (date: any, dateString: any, id: any) => {
    setTimeFinish(dateString);
  };

  const submitForm = async (values: TypeSetValue, resetForm: any) => {
    try {
      setLoading(true);
      let config = {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("Name"),
        },
      };
      const obj = {
        name: values.name,
        decription: values.discription,
        code: values.code,
        image_url: valueFile,
        percent_discount: values.percentDiscount,
        price_min_condition: values.minPrice,
        price_max_condition: values.maxPrice,
        quantity: values.totalVoucher,
        time_start: timeStart,
        time_end: timeFinish,
      };
      const response = await axios.put(
        `http://206.189.37.26:8080/v1/voucher/getvoucher/${params.id}`,
        obj,
        config
      );
      setTimeStart("");
      setTimeFinish("");
      setValueFile(undefined);
      resetForm();
      setCheckSubmit(true);
      setLoading(false);
      toast.success("🦄 Cập nhật voucher thành công!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      fetchDataUpdate();
    } catch (error) {
      console.log("error new", error);
    }
  };

  const cancelForm = async (resetForm: any) => {
    setTimeStart("");
    setTimeFinish("");
    setValueFile(undefined);
    //  await resetForm();
    console.log("click");
  };

  const fetchDataUpdate = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://206.189.37.26:8080/v1/voucher/getUserId/${params.id}`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("Name"),
          },
        }
      );
      setLoading(false);
      console.log("response fetch", response);
      setData(response.data);
      setTimeStart(response.data?.time_start);
      setTimeFinish(response.data?.time_end);
    } catch (error) {
      console.log("error", error);
    }
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const handleChangeView: UploadProps["onChange"] = async (
    info: UploadChangeParam<UploadFile>
  ) => {
    if (info?.file.status === "uploading") {
      setLoading(true);
    }
    if (info?.file.status === "done") {
      setLoading(false);
      setValueFile(info?.file?.response?.url);
    }
  };

  React.useEffect(() => {
    fetchDataUpdate();
  }, [checkSubmit]);

  return (
    <Spin spinning={loading} tip="Loading" size="large">
      <div className="containerRestaurant">
        <div className="blockContentRestaurant">
          <ToastContainer />

          <div className="headerTitleRestaurant">
            <h6 className="titleRestaurant">Cap nhat voucher</h6>
          </div>
          {data && (
            <Formik
              enableReinitialize
              initialValues={{
                name: data?.name ? data?.name : "",
                discription: data?.decription,

                code: data?.code,
                percentDiscount: data?.percent_discount,
                minPrice: data?.price_min_condition,
                maxPrice: data?.price_max_condition,
                totalVoucher: data?.quantity,
              }}
              validationSchema={createVoucher}
              onSubmit={async (values, { resetForm }) => {
                console.log("values", values);
                await submitForm(values as any, resetForm);
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
                      <p className="vouchername">Chọn file2</p>

                      <Upload
                        name="upload"
                        listType="picture-card"
                        className="avatar-uploader"
                        showUploadList={false}
                        action="http://206.189.37.26:8080/uploadImageCloud"
                        onChange={handleChangeView}
                      >
                        {valueFile !== undefined ? (
                          <img
                            src={valueFile}
                            alt="avatar"
                            style={{
                              width: "100%",
                              height: "100%",
                              overflow: "hidden",
                            }}
                          />
                        ) : data?.image_url ? (
                          <img
                            src={data?.image_url}
                            alt="avatar"
                            style={{ width: "100%" }}
                          />
                        ) : (
                          uploadButton
                        )}
                      </Upload>
                    </div>
                    <div className="formBlock">
                      <p className="vouchername">Thời gian bắt đầu</p>
                      <DatePickerComponent
                        handleDatePickerChange={handleDatePickerChange}
                        timeValue={data.time_start}
                      />
                    </div>
                    <div className="formBlock">
                      <p className="vouchername">Thời gian kết thúc</p>
                      <DatePickerComponent
                        handleDatePickerChange={handleDatePickerChange2}
                        timeValue={data.time_end}
                      />
                    </div>
                    <div className="buttonSubmit">
                      <Button
                        type="primary"
                        danger
                        style={{ width: "40%" }}
                        onClick={() => cancelForm(resetForm)}
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

export default VoucherUpdate;
