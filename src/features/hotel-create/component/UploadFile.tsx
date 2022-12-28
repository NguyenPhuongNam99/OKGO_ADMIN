import { Upload, UploadFile, UploadProps } from "antd";
import { UploadChangeParam } from "antd/es/upload";
import React, { useState } from "react";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import "../hotelCreateStyles.scss";

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

  const handleChangeView: UploadProps["onChange"] = async (
    info: UploadChangeParam<UploadFile>
  ) => {
    if (info?.file.status === "uploading") {
      setLoading(true);
    }
    if (info?.file.status === "done") {
      setLoading(false);
      console.log("file", info?.file?.response?.url);
      setValueFile([...valueFile, info?.file?.response?.url]);
    }
  };
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  return (
    <Upload
      name="upload"
      listType="picture-card"
      className="avatar-uploader"
      showUploadList={false}
      action="http://206.189.37.26:8080/uploadImageCloud"
      onChange={handleChangeView}
    >
      {valueFile[Number(index)] && valueFile[Number(index)] ? (
        <img
          src={valueFile[Number(index)]}
          alt="avatar"
          style={{
            width: "100%",
            height: "100%",
            overflow: "hidden",
          }}
        />
      ) : (
        uploadButton
      )}
    </Upload>
  );
};

export default UploadFileComponent;
