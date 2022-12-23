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
const { TextArea } = Input;

const { RangePicker } = DatePicker;

const TourDetail = (props: any) => {
  const { date } = props;
  const [countFile, setCountFile] = useState<number>(0);

  const handleUploadChange = (uploadInfo: any) => {
    setCountFile(uploadInfo.fileList.length);
  };

  return (
    <>
      <Card style={{ marginTop: "20px" }} title={date} bordered={true}>
        <Row gutter={[8, 8]}>
          <Col span={12}>
            <Form.Item
              label="Địa điểm"
              labelCol={{ span: 3 }}
              wrapperCol={{ span: 12 }}
              name={`location_${date}`}
              rules={[
                { required: true, message: "Please input your location!" },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Thời gian"
              name={`time_${date}`}
              labelCol={{ span: 3 }}
              wrapperCol={{ span: 12 }}
              rules={[{ required: true, message: "Please input your time!" }]}
            >
              <RangePicker picker="time" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              labelCol={{ span: 3 }}
              wrapperCol={{ span: 12 }}
              label="Giá vào cửa"
              name={`door_price_${date}`}
              rules={[
                { required: true, message: "Please input your price!" },
              ]}
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
              name={`thumbnail_${date}`}
              labelCol={{ span: 3 }}
              wrapperCol={{ span: 12 }}
              valuePropName={`fileList1_${date}`}

            //   rules={[
            //     { required: true, message: "Please input your thumbnail!" },
            //   ]}
            >
              <Upload
                multiple
                maxCount={4}
                accept="image/png, image/jpeg"
                action="/upload.do"
                listType="picture-card"
                onChange={handleUploadChange}
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
              name={`description_${date}`}
              labelCol={{ span: 3 }}
              wrapperCol={{ span: 21 }}
              rules={[
                { required: true, message: "Please input your description!" },
              ]}
            >
              <TextArea rows={6}/>
            </Form.Item>
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default TourDetail;
