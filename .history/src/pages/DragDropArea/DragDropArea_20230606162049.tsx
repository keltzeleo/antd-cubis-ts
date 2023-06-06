import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { Upload, message } from "antd";
import { useState } from "react";

const { Dragger } = Upload;

const handleFileUpload = (files: File[]) => {
  files.forEach((file: File) => {
    // Handle the file upload logic for each file here
    console.log(file);
  });
};

const DragDropArea = () => {
  const [fileList, setFileList] = useState<any[]>([]);

  const getFileStatusIcon = (file: any) => {
    if (file.status === "uploading") {
      return <LoadingOutlined />;
    } else if (file.status === "done") {
      return <CheckCircleOutlined style={{ color: "green" }} />;
    } else if (file.status === "error") {
      return <CloseCircleOutlined style={{ color: "red" }} />;
    }
  };

  const props = {
    accept: ".pdf,.doc,.docx,.csv",
    beforeUpload: (file: File) => {
      const isFileRedundant = fileList.some(
        (existingFile: any) =>
          existingFile.name === file.name && existingFile.size === file.size
      );

      if (isFileRedundant) {
        message.error(`${file.name} file is redundant.`);
        return Upload.LIST_IGNORE; // Skip the file from being added to the fileList
      }

      return true; // Allow the file upload
    },
    fileList,
    onChange: (info: any) => {
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
        <img src="../icons/icon_upload.png" alt="Drag and Drop Icon" />
      </p>
      <p className="ant-upload-text">
        Click or drag file to this area to upload
      </p>
      <p className="ant-upload-hint">
        Support for a single or bulk upload. Strictly prohibited from uploading
        company data or other banned files.
      </p>
      <div>
        {fileList.map((file) => (
          <div key={file.uid}>
            {getFileStatusIcon(file)}
            <span>{file.name}</span>
          </div>
        ))}
      </div>
    </Dragger>
  );
};

export default DragDropArea;
