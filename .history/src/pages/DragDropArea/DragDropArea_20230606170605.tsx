import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { Modal, Upload, message } from "antd";
import { useState } from "react";

const { Dragger } = Upload;

const DragDropArea = () => {
  const [fileList, setFileList] = useState<any[]>([]);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | undefined>("");

  const getFileStatusIcon = (file: any) => {
    if (file.status === "uploading") {
      return <LoadingOutlined />;
    } else if (file.status === "done") {
      return <CheckCircleOutlined style={{ color: "green" }} />;
    } else if (file.status === "error") {
      return <CloseCircleOutlined style={{ color: "red" }} />;
    }
  };

  const handlePreview = async (file: any) => {
    if (file.type.includes("image")) {
      setPreviewVisible(true);
      setPreviewImage(file.dataUrl);
    }
  };

  const handleCancelPreview = () => {
    setPreviewVisible(false);
  };

  const props = {
    accept: ".pdf,.doc,.docx,.csv,image/*",
    beforeUpload: (file: File) => {
      const isFileRedundant = fileList.some(
        (existingFile: any) =>
          existingFile.name === file.name && existingFile.size === file.size
      );

      if (isFileRedundant) {
        message.error(`${file.name} file is redundant.`);
        return Upload.LIST_IGNORE; // Skip the file from being added to the fileList
      }

      // Generate a data URL for image files to be used as thumbnail preview
      if (file.type.includes("image")) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          const dataUrl = reader.result as string;
          const updatedFile = { ...file, dataUrl };
          setFileList([...fileList, updatedFile]); // Add the updated file to the fileList
        };
        return Upload.LIST_IGNORE; // Skip the file from being added to the fileList immediately
      }

      setFileList([...fileList, file]); // Add the file to the fileList
      return false; // Prevent the default file upload behavior of Ant Design Upload component
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
    <>
      <Dragger {...props}>
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
      <div>
        {fileList.map((file) => (
          <div
            key={file.uid}
            onMouseEnter={() => handlePreview(file)}
            onMouseLeave={handleCancelPreview}
          >
            {getFileStatusIcon(file)}
            <span>{file.name}</span>
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
