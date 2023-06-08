import { Modal, Upload } from "antd";
import { RcFile } from "antd/es/upload";
import { UploadChangeParam, UploadFile } from "antd/lib/upload/interface";
import { crc32 } from "crc";
import React, { useState } from "react";
import IWillFollowYou from "../../customComponents/IWillFollowYou/IWillFollowYou";

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

const handleFileUpload = (files: File[]) => {
  files.forEach((file) => {
    // Handle the file upload logic for each file here
    console.log(file);
  });
};

const DragDropArea2: React.FC = () => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState<UploadFile<any>[]>([]);

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
      handleError(
        `File '${file.name}' already exist. Please delete it if want to reupload the file.`
      );
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

    // Calculate checksum for each file
    const checksumPromises = fileList.map(async (file) => {
      const checksum = await getChecksum(file.originFileObj as RcFile);
      return { file, checksum };
    });

    const checksumResults = await Promise.all(checksumPromises);

    // Check for duplicates based on checksum
    const duplicateFiles = checksumResults.filter(
      ({ checksum }, index) =>
        checksumResults.findIndex((result) => result.checksum === checksum) !==
        index
    );

    if (duplicateFiles.length > 0) {
      handleError(
        `${duplicateFiles[0].file.name} is duplicated. Removed redundant file(s). Please double-check.`
      );
      fileList = fileList.filter(
        (file) => file.uid !== duplicateFiles[0].file.uid
      );
    }

    setFileList(fileList);
  };

  const uploadButton = (
    <div
      style={{
        width: "auto",
        height: "auto",
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
          width: 400,
          display: "inline-block",
          flexDirection: "column",
          height: 400,
        }}
      >
        <Upload.Dragger
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          fileList={fileList}
          onPreview={handlePreview}
          onChange={handleChange}
          onDrop={(e) => {
            const unsupportedFiles = Array.from(e.dataTransfer.files).filter(
              (file) => !acceptedFileTypes.includes(file.type)
            );
            if (unsupportedFiles.length > 0) {
              handleError("Unsupported file type. Please upload a valid file.");
            }
          }}
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
              justifyContent: "center",
            }}
          >
            {fileList.length >= 8 ? null : uploadButton}
          </div>
        </Upload.Dragger>

        {isErrorMessageVisible && (
          <div style={{ position: "relative" }}>
            <img
              src="../icons/icon_error_sm.png"
              alt="Error Icon"
              style={{
                position: "absolute",
                top: -16,
                left: 0,
                width: 16,
                height: 16,
              }}
            />
            <IWillFollowYou errorMessage={errorMessage} />
          </div>
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
