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
  Button,
} from "antd";
import { useState, useEffect } from "react";
import LocationDetail from "./locationDetail";
import { v4 as uuid } from "uuid";

const { TextArea } = Input;

const { RangePicker } = DatePicker;

const TourDetail = (props: any) => {
  const { location, form,handleAddLocation, handleDeleteLocation } = props;
  // const [listLocation, setListLocation] = useState<string[]>([]);

  // useEffect(() => {
  //   const id = uuid();
  //   setListLocation([id]);
  // }, []);

  // const handleAddLocation = () => {
  //   setListLocation((current) => {
  //     return [...current, uuid()];
  //   });
  // };

  // const handleDeleteLocation = (item: string) => {
  //   setListLocation((current) => {
  //     const clone = [...current];
  //     const index = clone.indexOf(item);
  //     if (index > -1) {
  //       clone.splice(index, 1);
  //     }
  //     return clone;
  //   });
  // };

  return (
    <>
      <Card style={{ marginTop: "20px" }} title={location.day} bordered={true}>
        {location?.listId?.map((item:any,index:number) => (
          <LocationDetail
            form={form}
            date={location.day}
            key={`${item.id}`}
            index={index}
            defaultThumbnail={item.thumbnail}
            id={item.id}
            handleDeleteLocation={() => handleDeleteLocation(item)}
          />
        ))}
        <Button onClick={()=>handleAddLocation(location)}>Thêm địa chỉ</Button>
      </Card>
    </>
  );
};

export default TourDetail;
