import { Modal, Upload } from "antd";
import { RcFile } from "antd/es/upload";
import { UploadChangeParam, UploadFile } from "antd/lib/upload/interface";
import { crc32 } from "crc";
import React, { useState } from "react";
import IWillFollowYou from "../../customComponents/IWillFollowYou/IWillFollowYou"; // Import the IWillFollowYou component

const acceptedFileTypes = [
  ".pdf",
  ".doc",
  ".docx",
  ".csv",
  "image/jpeg",
  "image/png",
  "image/jpg",
];

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const getChecksum = (file: RcFile): Promise<number> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const data = event.target?.result;
      if (data instanceof ArrayBuffer) {
        const array = new Uint8Array(data);
        const checksum = crc32(array);
        resolve(checksum);
      } else {
        reject(new Error("Failed to read file data."));
      }
    };
    reader.onerror = (error) => reject(error);
    reader.readAsArrayBuffer(file);
  });

const DragDropArea2: React.FC = () => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState<UploadFile<any>[]>([]);
  const [isWarningVisible, setIsWarningVisible] = useState(false);

  const [errorMessage, setErrorMessage] = useState(""); // Error message state
  const [isErrorMessageVisible, setIsErrorMessageVisible] = useState(false); // Visibility state of error message

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file: UploadFile<any>) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url!.substring(file.url!.lastIndexOf("/") + 1)
    );
  };

  const handleError = (errorMsg: string) => {
    setErrorMessage(errorMsg);
    setIsErrorMessageVisible(true);

    setTimeout(() => {
      setIsErrorMessageVisible(false);
    }, 5000); // Show error message for 5 seconds
  };

  const handleChange = async (info: UploadChangeParam<UploadFile<any>>) => {
    let { file, fileList } = info;

    // Check for redundant files in the new fileList
    const isFileRedundant = fileList.some(
      (existingFile) =>
        existingFile.name === file.name && existingFile.uid !== file.uid
    );

    if (isFileRedundant) {
      handleError(`File '${file.name}' is redundant. Please double-check.`);
      fileList = fileList.filter(
        (existingFile) => existingFile.uid !== file.uid
      );
    }

    // Check for unsupported file types
    if (file.type && !acceptedFileTypes.includes(file.type)) {
      handleError("Unsupported file type. Please upload a valid file.");
      fileList = fileList.filter(
        (existingFile) => existingFile.uid !== file.uid
      );
    }

    setFileList(fileList);
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsWarningVisible(true);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsWarningVisible(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsWarningVisible(false);
    const { files } = e.dataTransfer;
    handleFileUpload(Array.from(files));
  };

  return (
    <>
      <div
        style={{
          width: "450px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {isWarningVisible && (
          <div className="warning-message">Drop files here to upload</div>
        )}

        <Upload.Dragger
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          fileList={fileList}
          onPreview={handlePreview}
          onChange={handleChange}
          listType="picture-card"
          showUploadList={{ showRemoveIcon: true }}
          accept=".pdf,.doc,.docx,.csv,image/*" // Accepted file types
          style={{ marginRight: 16 }}
          multiple // Enable multiple file upload
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

        {isErrorMessageVisible && (
          <IWillFollowYou errorMessage={errorMessage} />
        )}

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
