import "../tour.scss";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import Editor from "ckeditor5-custom-build/build/ckeditor";
import { useState, useEffect, useRef } from "react";
import {
  Form,
  Input,
  InputNumber,
  Select,
  Upload,
  DatePicker,
  Button,
  ConfigProvider,
} from "antd";
import {
  cityApi,
  provincesApi,
  listHotelApi,
  listRestaurentApi,
  getTourScheduleApi,
  updateTourApi,
  createTourApi,
} from "../tourApi";
import { AutoCompleteType, ListIdType, TourDetailType, TourTimeLineScheduleType, TourTimeLineType } from "../type";
import { PlusOutlined } from "@ant-design/icons";
import TourDetail from "./component/tourDetail";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { current } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";
import { useParams } from "react-router-dom";
import e from "express";
import moment from "moment";
import dayjs from "dayjs";
// import advancedFormat from 'dayjs/plugin/advancedFormat'
// import customParseFormat from 'dayjs/plugin/customParseFormat'
import weekday from "dayjs/plugin/weekday";
import weekOfYear from "dayjs/plugin/weekOfYear";
import weekYear from "dayjs/plugin/weekYear";
import localeData from "dayjs/plugin/localeData";

// dayjs.extend(customParseFormat)
// dayjs.extend(advancedFormat)
dayjs.extend(localeData);
dayjs.extend(weekday);
dayjs.extend(weekOfYear);
dayjs.extend(weekYear);
const { RangePicker } = DatePicker;

const uploadURl = "http://206.189.37.26:8080/uploadImageCloud";

const CreateTour = () => {
  const [CKEditorDataDB, setCKEditorDataDB] = useState<string>("");
  const [form] = Form.useForm();
  const [cities, setCities] = useState<AutoCompleteType[]>([]);
  const [provinces, setProvinces] = useState<AutoCompleteType[]>([]);
  const [hotelList, setHotelList] = useState<AutoCompleteType[]>([]);
  const [restaurantList, setRestaurantList] = useState<AutoCompleteType[]>([]);
  const [isPageReady, setIsPageReady] = useState<boolean>(false);
  // const [countFile, setCountFile] = useState<number>(0);
  const [fileList, setFileList] = useState<any[]>([]);
  const [uploading, setUploading] = useState(false);
  const [listLocation, setListLocation] = useState<TourDetailType[]>([]);
  const [updateID,setUpdateID] = useState<string>('');
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    if (!isPageReady) {
      setIsPageReady(true);
    }
  }, []);

  useEffect(() => {
    try {
      if (isPageReady) {
        console.log(id)
        if (!!id) {
          const fillData = async () => {
            const tour_detail:any = await getTourScheduleApi(id);
          
            const tour_detail_item = tour_detail[0]?.item
            const tour_detail_time_line = tour_detail[0]?.time_line

            setUpdateID(tour_detail_item._id)
            await handleSelectCity(tour_detail_item.city);
    
            setCKEditorDataDB(tour_detail_item.description);
            setFileList(tour_detail_item.thumbnail);
    
            const defaultTourTime: any = [];
    
            const defaultListLocation: TourDetailType[] = tour_detail_time_line.map(
              (item:TourTimeLineType) => {
                const listId: ListIdType[] = item.schedule.map((schedule_item:TourTimeLineScheduleType) => {
                  const uniId = uuid();
                  const prefix = `${item.day}_${uniId}`;
                  const testDate = dayjs(new Date(`${item.day} ${schedule_item.time_start}`));
                  console.log(testDate)
                  form.setFieldsValue({
                    [`location_${prefix}`]: schedule_item.location,
                    [`door_price_${prefix}`]: schedule_item.door_price,
                    [`description_${prefix}`]: schedule_item.description,
                    [`thumbnail_${prefix}`]: schedule_item.thumbnail,
                    [`time_${prefix}`]: [dayjs(new Date(`${item.day} ${schedule_item.time_start}`)),dayjs(new Date(`${item.day} ${schedule_item.time_end}`))],
                    // [`location_${prefix}`]: schedule_item.location,
                  });
                  return {
                    id: uniId,
                    thumbnail: schedule_item.thumbnail
                  };
                });
                defaultTourTime.push(dayjs(item.day));
                return {
                  day: item.day,
                  listId: listId,
                };
              }
            );
    
            setListLocation(defaultListLocation);
          
            form.setFieldsValue({
              tour_name: tour_detail_item.tour_name,
              price: tour_detail_item.price,
              city: tour_detail_item.city,
              provinces: tour_detail_item.provinces,
              restaurant: tour_detail_item.restaurant_id.toString(),
              hotel: tour_detail_item.hotel_id.toString(),
              thumbnail: "123123",
              tour_time: defaultTourTime,
            });
          };
    
          fillData();
        }
        const listCity = cityApi();
        Promise.all([listCity]).then((values) => {
          const listCity = values[0].data.data.data;
          const convertList = convertDataSource(listCity);
          setCities(convertList);
        });
      }
    } catch (error) {
      
    }
   
  }, [isPageReady]);

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
      uploadUrl: uploadURl,
    },
  };

  const handleAddLocation = (itemLocation: TourDetailType) => {
    const clone = [...listLocation];
    const convertList = clone.map((item) => {
      if (item.day === itemLocation.day) {
        const currentListId = item.listId;
        currentListId.push({id: uuid()});
        return {
          day: item.day,
          listId: currentListId,
        };
      }
      return { ...item };
    });
    setListLocation(convertList);
  };

  const convertDataSource = (data: any) => {
    return data?.map((item: any) => {
      return {
        label: item.name_with_type,
        value: item.code,
      };
    });
  };

  const handleSelectCity = async (id: string) => {
    const provinces = await provincesApi(id);
    const provincesList = provinces.data.data.data;
    setProvinces(convertDataSource(provincesList));

    const hotel: any = await listHotelApi(id);
    const convertData: any = [];
    hotel.forEach((element: any) => {
      if (element.city_id === id) {
        convertData.push({
          label: element.name,
          value: element.idHotel.toString(),
        });
      }
    });

    setHotelList(convertData);

    const restaurant: any = await listRestaurentApi(id);
    const convertData_2: any = [];
    restaurant.forEach((element: any) => {
      if (element.city_id === id) {
        convertData_2.push({
          label: element.name,
          value: element.idrestaurant.toString(),
        });
      }
    });
    setRestaurantList(convertData_2);
    // set nha hang hoac khach san
    form.setFieldsValue({
      city: id,
      provinces: "",
    });
  };

  const handleClearCity = () => {
    setProvinces([]);
    setHotelList([]);
    setRestaurantList([]);
    // clear nha hang hoac khach san
    form.setFieldsValue({
      provinces: "",
      hotel: "",
      restaurant: "",
    });
  };

  const onFinish = (values: any) => {
    console.log(values)
    if (values && CKEditorDataDB) {
      const finalData: any = {
        tour_name: values.tour_name,
        city: values.city,
        price: values.price,
        provinces: values.provinces,
        thumbnail: fileList.map((item) => {
          if (!!item.response) {
            return item.response;
          } else {
            return item;
          }
        }),
        is_show: true,
        time_line: [],
        description: CKEditorDataDB,
        restaurant_id: values.restaurant ? values.restaurant.toString() : " ",
        hotel_id: values.hotel ? values.hotel.toString() : " ",
      };
      // Lấy chi tiết lịch trình
  
      const listSchedule: any = [];
      listLocation.map((item) => {
        const schedule: any = {
          day: item.day,
          schedule: [],
        };
        item.listId?.map((data) => {
          const preFix = `${item.day}_${data.id}`;
          const scheduleDetail = {
            location: values[`location_${preFix}`],
            door_price: values[`door_price_${preFix}`],
            description: values[`description_${preFix}`],
            time_start: formatterHours(values[`time_${preFix}`][0]),
            time_end: formatterHours(values[`time_${preFix}`][1]),
            thumbnail: values[`thumbnail_${preFix}`],
          };
          schedule["schedule"].push(scheduleDetail);
        });
        listSchedule.push(schedule);
      });
      finalData.time_line = listSchedule;

      if(!!id){
        finalData._id = updateID;
        finalData.tour_id = id;
        updateTourApi(finalData);
      }else{
        createTourApi(finalData);

      }
    }
  };

  const handleUploadChange = ({ fileList: newFileList }: any) => {
    setFileList(newFileList);
  };

  const handleOnCalendarChange = (dates: any) => {
    if (dates && dates[0] && dates[1]) {
      const array: TourDetailType[] = [
        {
          day: formatterDate(dates[0]),
          listId: [{id: uuid()}],
        },
      ];
      const total_day = caculateStartDateAndEndDate(dates[0], dates[1]);

      for (let i = 0; i < total_day; i++) {
        const date = new Date(dates[0]);
        date.setDate(date.getDate() + (i + 1));
        array.push({
          day: formatterDate(date),
          listId: [{id:uuid()}],
        });
      }

      setListLocation(array);

      // setTotalDay(array);
    } else {
      setListLocation([]);
    }
  };

  const formatterDate = (date: any) => {
    const today = new Date(date);
    const yyyy = today.getFullYear();
    let mm: any = today.getMonth() + 1; // Months start at 0!
    let dd: any = today.getDate();
    if (dd < 10) dd = "0" + dd;
    if (mm < 10) mm = "0" + mm;
    const formatted = yyyy + "-" + mm + "-" + dd;
    return formatted;
  };

  const formatterHours = (date: any) => {
    const today = new Date(date);
    return today.toLocaleTimeString(navigator.language, {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const caculateStartDateAndEndDate = (start: any, end: any) => {
    const startTime = new Date(start).getTime();
    const endTime = new Date(end).getTime();
    const time = endTime - startTime;
    return Math.floor(time / (60 * 1000 * 60 * 24));
  };


  //   const handleDeleteLocation = (item: any) => {
  //   setListLocation((current) => {
  //     const clone = [...current];
  //     let index  = -1;
  //     for(let i = 0; i <current.length;i++){
        
  //       for(let k = 0; i <current[i].listId.length;i++){
       
  //       }
  //     }
  //     // const index = clone.indexOf((item));
  //     if (index > -1) {
  //       clone.splice(index, 1);
  //     }
  //     return clone;
  //   });
  // };


  // const handleAntdUpload = () => {
  //   const formData = new FormData();
  //   fileList.forEach((file) => {
  //     formData.append("files[]", file as RcFile);
  //   });
  //   setUploading(true);
  //   // You can use any AJAX library you like
  //   fetch("http://206.189.37.26:8000/uploadImageCloud", {
  //     method: "POST",
  //     body: formData,
  //   })
  //     .then((res) => res.json())
  //     .then(() => {
  //       setFileList([]);
  //     })
  //     .catch(() => {})
  //     .finally(() => {
  //       setUploading(false);
  //     });
  // };

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
              // {
              //   validator: (_, value) =>
              //     value
              //       ? Promise.resolve()
              //       : Promise.reject(new Error("Should accept agreement")),
              // },
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
              // onSelect={handleSelectProvinces}
              filterOption={(inputValue, option) =>
                option!.label
                  .toUpperCase()
                  .indexOf(inputValue.toUpperCase()) !== -1
              }
            />
          </Form.Item>

          <Form.Item
            label="Nhà hàng"
            name="restaurant"
            // rules={[
            //   { required: true, message: "Please input your restaurant!" },
            // ]}
          >
            <Select
              showSearch
              allowClear
              style={{ width: "100%" }}
              options={restaurantList}
              // onSelect={handleSelectProvinces}
              filterOption={(inputValue, option) =>
                option!.label
                  .toUpperCase()
                  .indexOf(inputValue.toUpperCase()) !== -1
              }
            />
          </Form.Item>

          <Form.Item
            label="Khách sạn"
            name="hotel"
            // rules={[{ required: true, message: "Please input your hotel!" }]}
          >
            <Select
              showSearch
              allowClear
              style={{ width: "100%" }}
              options={hotelList}
              // onSelect={handleSelectProvinces}
              filterOption={(inputValue, option) =>
                option!.label
                  .toUpperCase()
                  .indexOf(inputValue.toUpperCase()) !== -1
              }
            />
          </Form.Item>

          <Form.Item
            label="Thumbnail (4 files)"
            name="thumbnail"
            valuePropName="fileList1"
            rules={[
              { required: true, message: "Please input 4 img thumnail" },
              {
                validator: (_, value) =>
                  fileList.length === 4
                    ? Promise.resolve()
                    : Promise.reject(new Error("Please input 4 img thumnail")),
              },
            ]}
          >
            <Upload
              multiple
              maxCount={4}
              name="upload"
              accept="image/png, image/jpeg"
              fileList={fileList}
              action={uploadURl}
              listType="picture-card"
              onChange={handleUploadChange}
              onRemove={(file: any) => {
                const cloneFileList = [...fileList];
                const newList = cloneFileList.filter(
                  (item) => item.uid !== file.uid
                );
                setFileList(newList);
              }}
            >
              {fileList.length < 4 && (
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
        
      </div>

      <div className="tourContainer-create">
        <Form.Item
          labelCol={{ span: 10 }}
          label="Thời gian diễn ra chương trình"
          name="tour_time"
          rules={[{ required: true, message: "Please input time" }]}
        >
          <RangePicker
            format="YYYY-MM-DD"
            picker="week"
            onCalendarChange={handleOnCalendarChange}
          />
        </Form.Item>
      </div>

      <div className="tourContainer-create detail">
        {listLocation?.map((item) => (
          <TourDetail
            handleAddLocation={handleAddLocation}
            form={form}
            key={item.day}
            location={item}
          />
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
