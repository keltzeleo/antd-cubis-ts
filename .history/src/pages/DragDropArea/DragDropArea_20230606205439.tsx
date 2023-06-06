import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  LoadingOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Modal, Upload, message } from "antd";
import { useState } from "react";

interface FileData {
  uid: string;
  name: string;
  size: number;
  type: string;
  dataUrl?: string;
  status?: string;
}

const isFileRedundant = (file: FileData, fileList: FileData[]): boolean =>
  fileList.some(
    (existingFile) =>
      existingFile.name === file.name && existingFile.size === file.size
  );

const handleFileUpload = (
  file: File,
  fileList: FileData[],
  setFileList: React.Dispatch<React.SetStateAction<FileData[]>>
): void => {
  if (file.type.includes("image")) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      const dataUrl = reader.result as string;
      const updatedFile: FileData = { ...file, dataUrl };
      setFileList([...fileList, updatedFile]);
    };
  } else {
    const newFile: FileData = {
      uid: file.uid,
      name: file.name,
      size: file.size,
      type: file.type,
    };
    setFileList([...fileList, newFile]);
  }
};

const DragDropArea2: React.FC = () => {
  const [fileList, setFileList] = useState<FileData[]>([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | undefined>("");
  const [previewTitle, setPreviewTitle] = useState("");

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
    if (file.type.includes("image")) {
      setPreviewOpen(true);
      setPreviewImage(file.dataUrl);
    }
  };

  const handleCancel = () => setPreviewOpen(false);

  const handleChange = (info: any) => {
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

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

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
    onChange: handleChange,
    listType: "picture-card" as const,
    showUploadList: { showRemoveIcon: true },
    style: { marginRight: 16 },
  };

  return (
    <>
      <div style={{ display: "flex" }}>
        <Upload.Dragger {...props}>
          <div
            style={{
              width: "350px",
              height: "350px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {fileList.length >= 8 ? null : uploadButton}
          </div>
        </Upload.Dragger>

        <Modal
          visible={previewOpen}
          title={previewTitle}
          footer={null}
          onCancel={handleCancel}
        >
          <img alt="example" style={{ width: "100%" }} src={previewImage} />
        </Modal>
      </div>

      <div>
        {fileList.map((file) => (
          <div
            key={file.uid}
            onMouseEnter={() => handlePreview(file)}
            onMouseLeave={handleCancel}
          >
            {getFileStatusIcon(file)}
            <span>{file.name}</span>
          </div>
        ))}
      </div>
    </>
  );
};

export default DragDropArea2;
