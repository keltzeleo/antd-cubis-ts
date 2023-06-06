import { Modal, Upload, UploadProps, message } from "antd";
import type { RcFile } from "antd/es/upload";
import React, { useState } from "react";

const acceptedFileTypes = [
  ".pdf",
  ".doc",
  ".docx",
  ".csv",
  "image/jpeg",
  "image/png",
];

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const DragDropArea2: React.FC = () => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState<any[]>([
    {
      uid: "-1",
      name: "image1.png",
      status: "done",
      url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    },
    {
      uid: "-2",
      name: "image2.png",
      status: "done",
      url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    },
    {
      uid: "-3",
      name: "image3.png",
      status: "done",
      url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    },
    {
      uid: "-4",
      name: "image4.png",
      status: "done",
      url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    },
    {
      uid: "-xxx",
      percent: 50,
      name: "image5.png",
      status: "uploading",
      url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    },
    {
      uid: "-5",
      name: "image6.png",
      status: "error",
    },
  ]);

  const handleCancel = () => setPreviewOpen(false);

  const props = {
    accept: ".pdf,.doc,.docx,.csv,image/*",
    beforeUpload: (file: File) => {
      const isFileRedundant = fileList.some(
        (existingFile: any) =>
          existingFile.name === file.name && existingFile.size === file.size
      );
  
      if (isFileRedundant) {
        message.error(
          `${file.name} file is redundant. Only one file is allowed.`
        );
        return false; // Prevent the file from being added to the fileList
      }
  
      const updatedFileList = fileList.filter(
        (existingFile: any) =>
          existingFile.name !== file.name || existingFile.size !== file.size
      );
  
      setFileList([...updatedFileList, file]); // Add the file to the fileList
  
      return false; // Prevent the default file upload behavior of Ant Design Upload component
    },

      setFileList([file, ...updatedFileList]); // Add the file to the fileList
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

  const handlePreview = async (file: any) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url!.substring(file.url!.lastIndexOf("/") + 1)
    );
  };

  const handleChange: UploadProps<any>["onChange"] = ({
    fileList: newFileList,
    file,
  }) => {
    const isValidFileType =
      file.type === "application/pdf" ||
      file.type === "application/msword" ||
      file.type ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
      file.type === "text/csv" ||
      file.type === "image/jpeg" ||
      file.type === "image/png";

    if (!isValidFileType) {
      message.error({
        content:
          "Invalid file type. Only .pdf, .doc, .docx, .csv, image files are allowed.",
        duration: 3, // Display duration in seconds
        style: {
          marginTop: "20px", // Adjust the top margin
        },
      });
      // Filter out the invalid file from newFileList
      const validFiles = newFileList.filter(
        (file) =>
          file.type === "application/pdf" ||
          file.type === "application/msword" ||
          file.type ===
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
          file.type === "text/csv" ||
          file.type === "image/jpeg" ||
          file.type === "image/png"
      );
      setFileList(validFiles);
      return;
    }

    setFileList(newFileList);
  };

  const uploadButton = (
    <div
      style={{
        width: "450px",
        height: "450px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
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
    </div>
  );

  return (
    <>
      <div
        style={{
          width: "450px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Upload.Dragger
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          fileList={fileList}
          onPreview={handlePreview}
          onChange={handleChange}
          listType="picture-card"
          showUploadList={{ showRemoveIcon: true }}
          accept=".pdf,.doc,.docx,.csv,image/*" // Accepted file types
          style={{ marginRight: 16 }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",

              width: "450px",
              height: "450px",
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
    </>
  );
};

export default DragDropArea2;
