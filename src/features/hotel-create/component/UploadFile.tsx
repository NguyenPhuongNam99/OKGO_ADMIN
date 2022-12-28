import { Upload, UploadFile, UploadProps } from "antd";
import { UploadChangeParam } from "antd/es/upload";
import React, { useState } from "react";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import "../hotelCreateStyles.scss";
import axios from "axios";

interface TypeUploadFile {
  setValueFile: any;
  valueFile: any;
  index: number;
}

const UploadFileComponent: React.FC<TypeUploadFile> = ({
  setValueFile,
  valueFile,
  index,
}) => {
  const [loading, setLoading] = useState<boolean>(false);

  const handleUploadChange = (uploadInfo: any) => {
    console.log("upload", uploadInfo);
    if (uploadInfo.file.status !== "removed") {
      const formData = new FormData();
      console.log(uploadInfo.file);
      formData.append("upload", uploadInfo.file);
      fetch("http://localhost:8080/uploadImageCloud", {
        method: "POST",
        body: formData,
      })
        .then((res) => {
          return res.json();
        })
        .then((value) => {
          console.log("therer");
        })
        .catch(() => {})
        .finally(() => {});
    }
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  console.log("inde", index);

  return (
    <Upload
      // name="upload"
      beforeUpload={(file) => {
        return false;
      }}
      listType="picture-card"
      className="avatar-uploader"
      accept="image/png, image/jpeg"
      showUploadList={false}
      // action="http://206.189.37.26:8080/uploadImageCloud"
      onChange={handleUploadChange}
    >
      {uploadButton}
    </Upload>
  );
};

export default UploadFileComponent;
