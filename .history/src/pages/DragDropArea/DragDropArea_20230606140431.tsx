import { InboxOutlined } from "@ant-design/icons";
import { Upload, UploadFile, message } from "antd";
import { UploadProps } from "antd/lib/upload";
import React from "react";

const { Dragger } = Upload;

let uid = 0; // Unique ID generator for fileList items

const handleFileUpload = (file: File) => {
  const uploadFile: UploadFile<any> = {
    uid: `${uid++}`, // Assign a unique ID
    name: file.name,
    size: file.size,
    type: file.type,
    status: "done",
    response: "Server response",
    thumbUrl: URL.createObjectURL(file), // Generate thumbnail URL
  };

  // Handle the file upload logic for a single file here
  console.log(uploadFile);
};

const props: UploadProps<any> = {
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
    const droppedFiles = Array.from(e.dataTransfer.files) as File[];
    const newFiles: File[] = [];

    droppedFiles.forEach((file) => {
      const isFileRedundant = newFiles.some(
        (newFile) => newFile.name === file.name
      );

      if (!isFileRedundant) {
        newFiles.push(file);
      } else {
        message.error(`${file.name} file already exists.`);
      }
    });

    newFiles.forEach((file) => handleFileUpload(file));
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
