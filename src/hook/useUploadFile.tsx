import axios from "axios";
import React, { useEffect, useState } from "react";

const useUploadFile = ({ dataFile }: any) => {
  const [file, setFile] = useState();
  const uploadFile = async () => {
    try {
      const formData = new FormData();
      formData.append("file", dataFile);
      const response = await axios({
        method: "post",
        url: "http://localhost:8000/file/upload",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + localStorage.getItem("Name"),
        },
      });
      setFile(response.data);
    } catch (error) {
      console.log("error new", error);
    }
  };

  useEffect(() => {
    uploadFile();
  }, []);
  return file;
};

export default useUploadFile;
