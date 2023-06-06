import { InboxOutlined } from "@ant-design/icons";
import { Upload, message } from "antd";
import {
  RcFile,
  UploadChangeParam,
  UploadFile,
  UploadProps,
} from "antd/lib/upload/interface";
import React, { useState } from "react";

const { Dragger } = Upload;

const handleFileUpload = (files: File[]) => {
  files.forEach((file) => {
    // Handle the file upload logic for each file here
    console.log(file);
  });
};

const DragDropArea: React.FC = () => {
  const [fileList, setFileList] = useState<UploadFile<any>[]>([]);

  const props: UploadProps = {
    accept: ".pdf,.doc,.docx,.csv",
    beforeUpload: (file: RcFile, fileList: RcFile[]) => {
      const isFileRedundant = fileList.some(
        (existingFile) =>
          existingFile.name === file.name || existingFile.size === file.size
      );

      if (isFileRedundant) {
        message.error(`${file.name} file is redundant.`);
        return false; // Reject the file upload
      }

      return true; // Allow the file upload
    },
    fileList,
    onChange: (info: UploadChangeParam<UploadFile<any>>) => {
      const { file, fileList } = info;
      if (file.status !== "uploading") {
        console.log(fileList);
      }
      if (file.status === "done") {
        message.success(`${file.name} file uploaded successfully.`);
      } else if (file.status === "error") {
        message.error(`${file.name} file upload failed.`);
      }
      setFileList(fileList);
    },
  };

  return (
    <Dragger {...props}>
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">
        Click or drag file to this area to upload
      </p>
      <p className="ant-upload-hint">
        Support for a single or bulk upload. Strictly prohibited from uploading
        company data or other banned files.
      </p>
    </Dragger>
  );
};

export default DragDropArea;
