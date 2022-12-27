import "../../tour.scss";
import { PlusOutlined } from "@ant-design/icons";
import {
  Form,
  Input,
  InputNumber,
  Select,
  Upload,
  DatePicker,
  Card,
  Col,
  Row,
} from "antd";
import { useState } from "react";
import Icon, { DeleteOutlined } from "@ant-design/icons";
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';

const { TextArea } = Input;

const { RangePicker } = DatePicker;
const uploadURl = "http://206.189.37.26:8080/uploadImageCloud";

const LocationDetail = (props: any) => {
  const { date, index, item, handleDeleteLocation, form } = props;

  const [countFile, setCountFile] = useState<number>(0);

  const handleUploadChange = (uploadInfo: any) => {
    setCountFile(uploadInfo.fileList.length);

    if(uploadInfo.file.status !== "removed"){
        const formData = new FormData();
        formData.append("upload", uploadInfo.file);
        // setUploading(true);
        // // You can use any AJAX library you like
        fetch(uploadURl, {
          method: "POST",
          body: formData,
        })
          .then((res) => {
    
            return res.json();
          }).then((value)=>{
            form.setFieldsValue({
                [`thumbnail_${date}_${item}`]: value.url,
              });
          })
          .catch(() => {})
          .finally(() => {
            // setUploading(false);
          }); 
    }        

  };

  return (
    <Row
      className={index !== 0 ? "tourContainer-create-location" : ""}
      gutter={[8, 8]}
    >
      {index !== 0 ? (
        <Col span={24} offset={23}>
          <DeleteOutlined
            onClick={handleDeleteLocation}
            className="tourContainer-create-icon"
          />{" "}
        </Col>
      ) : null}

      <Col span={12}>
        <Form.Item
          label="Địa điểm"
          labelCol={{ span: 3 }}
          wrapperCol={{ span: 12 }}
          name={`location_${date}_${item}`}
          rules={[{ required: true, message: "Please input your location!" }]}
        >
          <Input />
        </Form.Item>
      </Col>

      <Col span={12}>
        <Form.Item
          label="Thời gian"
          name={`time_${date}_${item}`}
          labelCol={{ span: 3 }}
          wrapperCol={{ span: 12 }}
          rules={[{ required: true, message: "Please input your time!" }]}
        >
          <RangePicker format='HH:mm:ss' picker="time"  />
        </Form.Item>
      </Col>

      <Col span={12}>
        <Form.Item
          labelCol={{ span: 3 }}
          wrapperCol={{ span: 12 }}
          label="Giá vào cửa"
          name={`door_price_${date}_${item}`}
          rules={[{ required: true, message: "Please input your price!" }]}
        >
          <InputNumber
            style={{ width: "100%" }}
            prefix="VND"
            formatter={(value) =>
              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
          />
        </Form.Item>
      </Col>

      <Col span={12}>
        <Form.Item
          label="Thumbnail"
          name={`thumbnail_${date}_${item}`}
          labelCol={{ span: 3 }}
          wrapperCol={{ span: 12 }}
          valuePropName={`fileList1_${date}`}
          rules={[
            { required: true, message: "Please input your thumbnail!" },
            {
              validator: (_, value) => {
                let flat = false;
                if(value && typeof value === 'string'){
                    flat=true;
                }else if(typeof value === 'object' && value?.fileList?.length > 0 ){
                    flat =true
                }
               
                return flat
                  ? Promise.resolve()
                  : Promise.reject(new Error("Should accept agreement"));
              },
            },
          ]}
        >
          <Upload
            multiple
            maxCount={1}

            accept="image/png, image/jpeg"
            action={uploadURl}
            listType="picture-card"
            onChange={handleUploadChange}
            onRemove={() => {
              form.setFieldsValue({
                [`thumbnail_${date}_${item}`]: undefined,
              });
            }}
            beforeUpload={(file) => {
              // setFileList([...fileList, file]);
              return false;
            }}
          >
            {countFile < 1 && (
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            )}
          </Upload>
        </Form.Item>
      </Col>

      <Col span={12}>
        <Form.Item
          label="Description"
          name={`description_${date}_${item}`}
          labelCol={{ span: 3 }}
          wrapperCol={{ span: 21 }}
          rules={[
            { required: true, message: "Please input your description!" },
          ]}
        >
          <TextArea rows={6} />
        </Form.Item>
      </Col>
    </Row>
  );
};

export default LocationDetail;
