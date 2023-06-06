import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  InboxOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { Upload, message } from "antd";
import { useState } from "react";

const { Dragger } = Upload;

interface FileData {
  uid: string;
  name: string;
  size: number;
  type: string;
  dataUrl?: string;
  status?: string;
}

const DragDropArea2: React.FC = () => {
  const [fileList, setFileList] = useState<FileData[]>([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | undefined>("");

  const isFileRedundant = (file: FileData, fileList: FileData[]) =>
    fileList.some(
      (existingFile) =>
        existingFile.name === file.name && existingFile.size === file.size
    );

  const handleFileUpload = (
    file: File,
    fileList: FileData[],
    setFileList: React.Dispatch<React.SetStateAction<FileData[]>>
  ) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      const dataUrl = reader.result as string;
      const updatedFile: FileData = {
        uid: file.name,
        name: file.name,
        size: file.size,
        type: file.type,
        dataUrl: dataUrl,
      };
      setFileList([...fileList, updatedFile]);
    };
  };

  const getFileStatusIcon = (file: FileData) => {
    if (file.status === "uploading") {
      return <LoadingOutlined />;
    } else if (file.status === "done") {
      return <CheckCircleOutlined style={{ color: "green" }} />;
    } else if (file.status === "error") {
      return <CloseCircleOutlined style={{ color: "red" }} />;
    }
  };

  const handlePreview = async (file: FileData) => {
    if (file.type && file.type.includes("image")) {
      setPreviewOpen(true);
      setPreviewImage(file.dataUrl);
    }
  };

  const handleCancel = () => {
    setPreviewOpen(false);
  };

  const props = {
    accept: ".pdf,.doc,.docx,.csv,image/*",
    beforeUpload: (file: File): boolean => {
      if (isFileRedundant(file, fileList)) {
        message.error(`${file.name} file is redundant.`);
        return false;
      }
      handleFileUpload(file, fileList, setFileList);
      return false;
    },
    fileList,
    onPreview: handlePreview,
    onChange: (info: any) => {
      const { file, fileList } = info;
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
      <div style={{ display: "flex" }}>
        <Upload.Dragger {...props}>
          <div
            style={{
              width: "450px",
              height: "450px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              border: "1px dashed #ccc",
              borderRadius: "8px",
              padding: "16px",
              textAlign: "center",
            }}
          >
            <p className="ant-upload-drag-icon">
              <InboxOutlined style={{ fontSize: "48px", color: "#ccc" }} />
            </p>
            <p className="ant-upload-text">
              Click or drag file to this area to upload
            </p>
            <p className="ant-upload-hint">
              Support for a single or bulk upload. Strictly prohibited from
              uploading company data or other banned files.
            </p>
          </div>
        </Upload.Dragger>

        {/* Remaining code */}
      </div>

      {/* Remaining code */}
    </>
  );
};

export default DragDropArea2;
