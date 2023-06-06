import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { Modal, Upload, message } from "antd";
import { RcFile, UploadChangeParam } from "antd/lib/upload";
import { UploadFile } from "antd/lib/upload/interface";
import React, { useState } from "react";

const { Dragger } = Upload;

const DragDropArea: React.FC = () => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | undefined>("");

  const getFileStatusIcon = (file: UploadFile) => {
    if (file.status === "uploading") {
      return <LoadingOutlined />;
    } else if (file.status === "done") {
      return <CheckCircleOutlined style={{ color: "green" }} />;
    } else if (file.status === "error") {
      return <CloseCircleOutlined style={{ color: "red" }} />;
    }
  };

  const handlePreview = async (file: UploadFile) => {
    if (file.type && file.type.includes("image")) {
      setPreviewVisible(true);
      setPreviewImage(file.thumbUrl || file.url || undefined);
    }
  };

  const handleCancelPreview = () => {
    setPreviewVisible(false);
  };

  const handleDelete = (file: UploadFile) => {
    const updatedFileList = fileList.filter((f) => f.uid !== file.uid);
    setFileList(updatedFileList);
  };

  const handleChange = (info: UploadChangeParam<UploadFile>) => {
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
  };

  const uploadProps = {
    accept: ".pdf,.doc,.docx,.csv,image/*",
    fileList,
    beforeUpload: (file: RcFile, fileList: RcFile[]) => {
      const isFileRedundant = fileList.some(
        (existingFile) =>
          existingFile.name === file.name && existingFile.size === file.size
      );

      if (isFileRedundant) {
        message.error(`${file.name} file is redundant.`);
        return false; // Skip the file from being added to the fileList
      }

      const isImageFile = file.type && file.type.includes("image");
      if (isImageFile) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          const dataUrl = reader.result as string;
          const updatedFile: UploadFile = { ...file, thumbUrl: dataUrl };
          setFileList([...fileList, updatedFile]); // Add the updated file to the fileList
        };
        return false; // Skip the file from being added to the fileList immediately
      }

      setFileList([...fileList, file]); // Add the file to the fileList
      return false; // Prevent the default file upload behavior of Ant Design Upload component
    },
    onChange: handleChange,
  };

  return (
    <>
      <Dragger {...uploadProps}>
        <p className="ant-upload-drag-icon">
          <img src="../icons/icon_upload.png" alt="Drag and Drop Icon" />
        </p>
        <p className="ant-upload-text">
          Click or drag file to this area to upload
        </p>
        <p className="ant-upload-hint">
          Support for a single or bulk upload. Strictly prohibited from
          uploading company data or other banned files.
        </p>
      </Dragger>
      <div className="file-list">
        {fileList.map((file) => (
          <div
            key={file.uid}
            className="thumbnail-container"
            onMouseEnter={() => handlePreview(file)}
            onMouseLeave={handleCancelPreview}
          >
            <div className="thumbnail">
              {getFileStatusIcon(file)}
              {file.thumbUrl && <img src={file.thumbUrl} alt="Thumbnail" />}
            </div>
            <div className="filename">{file.name}</div>
            <div className="hover-buttons">
              <button
                className="preview-button"
                onClick={() => handlePreview(file)}
              >
                Preview
              </button>
              <button
                className="delete-button"
                onClick={() => handleDelete(file)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <Modal
        visible={previewVisible}
        footer={null}
        onCancel={handleCancelPreview}
      >
        <img alt="Preview" style={{ width: "100%" }} src={previewImage} />
      </Modal>
    </>
  );
};

export default DragDropArea;
