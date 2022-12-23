import "../tour.scss";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import Editor from "ckeditor5-custom-build/build/ckeditor";
import { useState, useEffect, useRef } from "react";
import { Form, Input, InputNumber, Select, Upload, DatePicker, Button } from "antd";
import { cityApi, provincesApi } from "../tourApi";
import { autoCompleteType } from "../type";
import { PlusOutlined } from "@ant-design/icons";
import TourDetail from "./component/tourDetail";

const { RangePicker } = DatePicker;

const CreateTour = () => {
  const [CKEditorDataDB, setCKEditorDataDB] = useState<string>("");
  const [form] = Form.useForm();
  const [cities, setCities] = useState<autoCompleteType[]>([]);
  const [provinces, setProvinces] = useState<autoCompleteType[]>([]);
  const [isSelectedCity, setIsSelectCity] = useState<boolean>(false);
  const [hotelList, setHotelList] = useState<autoCompleteType[]>([]);
  const [restaurantList, setRestaurantList] = useState<autoCompleteType[]>([]);
  const [isPageReady, setIsPageReady] = useState<boolean>(false);
  const [countFile, setCountFile] = useState<number>(0);
  const [totalDay, setTotalDay] = useState<string[]>([]);

  useEffect(() => {
    if (!isPageReady) {
      setIsPageReady(true);
    }
  }, []);

  useEffect(() => {
    const listCity = cityApi();
    Promise.all([listCity]).then((values) => {
      const listCity = values[0].data.data.data;
      const convertList = convertDataSource(listCity);
      setCities(convertList);
    });
  }, []);

  const editorConfiguration = {
    toolbar: {
      items: [
        "blockQuote",
        "bold",
        "imageTextAlternative",
        "link",
        "selectAll",
        "undo",
        "redo",
        "heading",
        "resizeImage:original",
        "resizeImage:25",
        "resizeImage:50",
        "resizeImage:75",
        "resizeImage",
        "imageResize",
        "imageStyle:full",
        "imageStyle:side",
        "imageUpload",
        "indent",
        "outdent",
        "italic",
        "numberedList",
        "bulletedList",
        "insertTable",
        "tableColumn",
        "tableRow",
        "mergeTableCells",
      ],

      shouldNotGroupWhenFull: true,
    },

    image: {
      styles: ["alignLeft", "alignCenter", "alignRight"],
      toolbar: [
        "imageStyle:alignLeft",
        "imageStyle:alignCenter",
        "imageStyle:alignRight",
        "|",
        "|",
        "imageTextAlternative",
      ],
    },

    ckfinder: {
      uploadUrl: 'http://localhost:8000/uploadImage',
    },
  };

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

  const onFinish = (values: any) => {
    console.log(values);
  };

  const handleUploadChange = (uploadInfo: any) => {
    setCountFile(uploadInfo.fileList.length);
  };

  const handleOnCalendarChange = (dates: any) => {
    if (dates && dates[0] && dates[1]) {
      const array = [formatterDate(dates[0])];
      const total_day = caculateStartDateAndEndDate(dates[0], dates[1]);

      for (let i = 0; i < total_day; i++) {
        const date = new Date(dates[0]);
        date.setDate(date.getDate() + (i + 1));
        array.push(formatterDate(date));
      }

      setTotalDay(array);
    }
  };

  const formatterDate = (date: any) => {
    const today = new Date(date);
    const yyyy = today.getFullYear();
    let mm: any = today.getMonth() + 1; // Months start at 0!
    let dd: any = today.getDate();
    if (dd < 10) dd = "0" + dd;
    if (mm < 10) mm = "0" + mm;
    const formatted = dd + "/" + mm + "/" + yyyy;
    return formatted;
  };

  const caculateStartDateAndEndDate = (start: any, end: any) => {
    const startTime = new Date(start).getTime();
    const endTime = new Date(end).getTime();
    const time = endTime - startTime;
    return Math.floor(time / (60 * 1000 * 60 * 24));
  };

  return (
    <Form
      form={form}
      name="basic"
      labelCol={{ span: 8 }}
      // wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      // onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <div className="tourContainer-create">
        <div className="tourContainer-create-first">
          <Form.Item
            label="Tên Tour"
            name="tour_name"
            rules={[
              { required: true, message: "Please input your tour_name!" },
              {
                validator: (_, value) =>
                  value
                    ? Promise.resolve()
                    : Promise.reject(new Error("Should accept agreement")),
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Giá"
            name="price"
            rules={[
              { required: true, message: "Please input your price!" },
              {
                validator: (_, value) =>
                  value
                    ? Promise.resolve()
                    : Promise.reject(new Error("Should accept agreement")),
              },
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

          <Form.Item
            label="Tỉnh/Thành phố"
            name="city"
            rules={[{ required: true, message: "Please input your city!" }]}
          >
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
          </Form.Item>

          <Form.Item
            label="Quận/Huyện"
            name="provinces"
            rules={[
              { required: true, message: "Please input your provinces!" },
            ]}
          >
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
          </Form.Item>
          {/* 
          <Form.Item
            label="Nhà hàng"
            name="restaurant"
            rules={[
              { required: true, message: "Please input your restaurant!" },
            ]}
          >
            <Select
            showSearch
              allowClear
              style={{ width: "100%" }}
              // options={provinces}
              onSelect={handleSelectProvinces}
              // filterOption={(inputValue, option) =>
              //   option!.label
              //     .toUpperCase()
              //     .indexOf(inputValue.toUpperCase()) !== -1
              // }
            />
          </Form.Item>

          
          <Form.Item
            label="Khách sạn"
            name="hotel"
            rules={[
              { required: true, message: "Please input your hotel!" },
            ]}
          >
           <Select
            showSearch
              allowClear
              style={{ width: "100%" }}
              // options={provinces}
              onSelect={handleSelectProvinces}
              // filterOption={(inputValue, option) =>
              //   option!.label
              //     .toUpperCase()
              //     .indexOf(inputValue.toUpperCase()) !== -1
              // }
            />
          </Form.Item> */}

          <Form.Item
            label="Thumbnail (4 files)"
            name="thumbnail"
            valuePropName="fileList1"
            // rules={[{ required: true, message: "Please input your hotel!" }]}
          >
            <Upload
              multiple
              maxCount={4}
              accept="image/png, image/jpeg"
              action="/upload.do"
              listType="picture-card"
              onChange={handleUploadChange}
            >
              {countFile < 4 && (
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              )}
            </Upload>
          </Form.Item>
        </div>
        <div className="tourContainer-create-second">
          {isPageReady && (
            <CKEditor
              editor={Editor}
              config={editorConfiguration}
              data={CKEditorDataDB}
              // onReady={(editor) => {
              // 	if (
              // 		functions.includes('function_post_list') &&
              // 		((state != undefined &&
              // 			functions.includes('function_edit_post')) ||
              // 			(state == undefined &&
              // 				functions.includes('function_create_post')))
              // 	) {
              // 		editor.isReadOnly = false;
              // 	} else {
              // 		editor.isReadOnly = true;
              // 	}
              // }}
              onChange={(event: any, editor: any) => {
                setCKEditorDataDB(editor.getData());
              }}
              // onBlur={(event, editor) => {}}
              // onFocus={(event, editor) => {}}
            />
          )}
        </div>

        {/* <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item> */}
      </div>

      <div className="tourContainer-create">
        <Form.Item
          labelCol={{ span: 10 }}
          label="Thời gian diễn ra chương trình"
          name="tour_time"
        >
          <RangePicker onCalendarChange={handleOnCalendarChange} />
        </Form.Item>
      </div>

      <div className="tourContainer-create detail">
        {totalDay?.map((item) => (
          <TourDetail key={item} date={item} />
        ))}
      </div>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>

    </Form>
  );
};

export default CreateTour;
