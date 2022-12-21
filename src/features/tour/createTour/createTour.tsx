import "../tour.scss";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import Editor from "ckeditor5-custom-build/build/ckeditor";
import { useState, useEffect } from "react";
import {
  Button,
  Checkbox,
  Form,
  Input,
  InputNumber,
  Select,
  AutoComplete,
  Upload,
} from "antd";
import { cityApi, provincesApi } from "../tourApi";
import { autoCompleteType } from "../type";
import { PlusOutlined } from '@ant-design/icons';

const CreateTour = () => {
  const [CKEditorDataDB, setCKEditorDataDB] = useState<string>("");
  const [form] = Form.useForm();
  const [cities, setCities] = useState<autoCompleteType[]>([]);
  const [provinces, setProvinces] = useState<autoCompleteType[]>([]);
  const [isSelectedCity, setIsSelectCity] = useState<boolean>(false);
  const [hotelList,setHotelList] = useState<autoCompleteType[]>([])
  const [restaurantList,setRestaurantList] = useState<autoCompleteType[]>([])

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
      uploadUrl: `${process.env.REACT_APP_API_URL}/uploadImage`,
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


  const onFinish = (values:any) => {
    console.log(values)
  }


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

<Form.Item label="Upload" valuePropName="fileList">
          <Upload multiple maxCount={4} accept="image/png, image/jpeg" action="/upload.do" listType="picture-card">
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
          </Upload>
        </Form.Item>

        </div>
        <div className="tourContainer-create-second">
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
        </div>

        {/* <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item> */}
      </div>
    </Form>
  );
};

export default CreateTour;
