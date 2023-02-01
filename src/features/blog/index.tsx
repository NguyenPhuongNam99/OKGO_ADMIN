import React, { useState } from "react";
import "./index.scss";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
// import Editor from "ckeditor5-custom-build/build/ckeditor";
import {
  Form,
  Input,
  Upload,
  Button,
} from "antd";

import { PlusOutlined } from "@ant-design/icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const uploadURl = "http://206.189.37.26:8080/uploadImageCloud";

const Blog: React.FC = () => {
  const [form] = Form.useForm();
  const [CKEditorDataDB, setCKEditorDataDB] = useState<string>("");
  const navigate = useNavigate()
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

  const onFinish = async (values: any) => {
    if (values && CKEditorDataDB) {
      const finalData: any = {
        title: values.title,
        thumbnail: values.thumbnail.file?.response.url,
        description: CKEditorDataDB,
      };
      let config = {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("Name"),
        },
      };

      try {
        const response = await axios.post(
          "http://206.189.37.26:8080/blog/createBlog",
          finalData,
          config
        );
        toast.success("🦄 Tạo tin tức thành công!", {
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
        },3000)
      } catch (error) {
        toast.success("🦄 Tạo tin tức chưa thành công!", {
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
        },3000)
      }
      // Lấy chi tiết lịch trình
    }
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
        <div style={{ zIndex: 99 }}>
          <ToastContainer />
        </div>

        <div className="tourContainer-create-first">
          <Form.Item
            label="Tiêu đề"
            name="title"
            rules={[{ required: true, message: "Please input your title!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Thumbnail"
            name="thumbnail"
            valuePropName="fileList1"
            rules={[{ required: true, message: "Please input thumbnail" }]}
          >
            <Upload
              multiple
              maxCount={1}
              name="upload"
              accept="image/png, image/jpeg"
              action={uploadURl}
              listType="picture-card"
            >
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            </Upload>
          </Form.Item>
        </div>
        <div className="tourContainer-create-second">
          <CKEditor
            editor={ClassicEditor}
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
      </div>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Blog;
