import { InboxOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { message, Upload } from "antd";
import React from "react";

const { Dragger } = Upload;

const handleFileUpload = (files: File[]) => {
  files.forEach((file) => {
    // Handle the file upload logic for each file here
    console.log(file);
  });
};

const props: UploadProps = {
  accept: ".pdf,.doc,.docx,.cvs",
  beforeUpload: (file) => {
    // Check if the file already exists in the fileList
    const isFileRedundant = props.fileList?.some(
      (existingFile) => existingFile.name === file.name
    );

    if (isFileRedundant) {
      message.error(`${file.name} file already exists.`);
      return false; // Reject the file upload
    }

    handleFileUpload(file);
    return false; // Prevent default upload behavior
  },
  name: "file",
  multiple: true,
  action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
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
  onDrop(e) {
    console.log("Dropped files", e.dataTransfer.files);
  },
};

const DragDropArea: React.FC = () => {
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    const newFiles = droppedFiles.filter((file) => {
      return !props.fileList?.some(
        (existingFile) => existingFile.name === file.name
      );
    });
    handleFileUpload(newFiles);
  };
  const renderFileList =
    props.fileList?.map((file) => (
      <div key={file.uid}>
        {/* Replace this with your custom thumbnail */}
        <img src={file.thumbUrl} alt={file.name} />
        <span>{file.name}</span>
      </div>
    )) || null;

  return (
    <Dragger {...props} onDrop={handleDrop}>
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
      {renderFileList}
    </Dragger>
  );
};

export default DragDropArea;
