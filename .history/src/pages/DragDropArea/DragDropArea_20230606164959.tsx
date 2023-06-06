import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  LoadingOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Modal, Upload, message } from "antd";
import type { UploadFile } from "antd/es/upload/interface";
import { useState } from "react";

const { Dragger } = Upload;

const getBase64 = (file: File): Promise<string | ArrayBuffer | null> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const DragDropArea = () => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | ArrayBuffer | null>(
    ""
  );
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([
    {
      uid: "-1",
      name: "image.png",
      status: "done",
      url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    },
    {
      uid: "-2",
      name: "image.png",
      status: "done",
      url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    },
    {
      uid: "-3",
      name: "image.png",
      status: "done",
      url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    },
    {
      uid: "-4",
      name: "image.png",
      status: "done",
      url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    },
    {
      uid: "-xxx",
      percent: 50,
      name: "image.png",
      status: "uploading",
      url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    },
    {
      uid: "-5",
      name: "image.png",
      status: "error",
    },
  ]);

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as File);
    }

    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name ||
        (file.url?.substring(file.url.lastIndexOf("/") + 1) as string)
    );
  };

  const handleChange = ({
    fileList: newFileList,
  }: {
    fileList: UploadFile[];
  }) => setFileList(newFileList);

  const props = {
    accept: ".pdf,.doc,.docx,.csv,image/*",
    beforeUpload: (file: File) => {
      const isFileRedundant = fileList.some(
        (existingFile) =>
          existingFile.name === file.name && existingFile.size === file.size
      );

      if (isFileRedundant) {
        message.error(`${file.name} file is redundant.`);
        return Upload.LIST_IGNORE;
      }

      return true;
    },
    fileList,
    onPreview: handlePreview,
    onChange: handleChange,
  };

  const getFileStatusIcon = (file: UploadFile) => {
    if (file.status === "uploading") {
      return <LoadingOutlined />;
    } else if (file.status === "done") {
      return <CheckCircleOutlined style={{ color: "green" }} />;
    } else if (file.status === "error") {
      return <CloseCircleOutlined style={{ color: "red" }} />;
    }
  };

  return (
    <>
      <Dragger {...props}>
        <p className="ant-upload-drag-icon">
          <PlusOutlined />
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
            className="file-item"
            onMouseEnter={() => handlePreview(file)}
            onMouseLeave={handleCancel}
          >
            <div className="thumbnail">
              {file.type?.includes("image") ? (
                <img src={file.preview as string} alt="Preview" />
              ) : (
                getFileStatusIcon(file)
              )}
            </div>
            <span>{file.name}</span>
          </div>
        ))}
      </div>
      <Modal
        visible={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img
          alt="Preview"
          style={{ width: "100%" }}
          src={previewImage as string}
        />
      </Modal>
    </>
  );
};

export default DragDropArea;
