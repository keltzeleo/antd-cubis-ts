import { InboxOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { message, Upload } from "antd";
import React from "react";

const { Dragger } = Upload;

const handleFileUpload = (file: File) => {
  // Handle the file upload logic here
  console.log(file);
};

const DragDropArea: React.FC = () => {
  const props: UploadProps = {
    accept: ".pdf,.doc,.docx",
    beforeUpload: (file) => {
      handleFileUpload(file);
      return false; // Prevent default upload behavior
    },
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
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
      <p className="ant-upload-hint">Support for a single or bulk upload.</p>
    </Dragger>
  );
};

export default DragDropArea;
