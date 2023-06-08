import React, { useState } from "react";
import { Modal, Upload } from "antd";
import { RcFile } from "antd/es/upload";
import { UploadChangeParam, UploadFile } from "antd/lib/upload/interface";
import { crc32 } from "crc";
import IWillFollowYou from "../../customComponents/IWillFollowYou/IWillFollowYou";

interface ErrorItem {
  id: number;
  message: string;
}

const acceptedFileTypes = [
  ".pdf",
  ".doc",
  ".docx",
  ".csv",
  "image/jpeg",
  "image/png",
  "image/jpg",
];

// Rest of the code...

const DragDropArea2: React.FC = () => {
  const [previewOpen, setPreviewOpen] = useState<boolean>(false);
  const [previewImage, setPreviewImage] = useState<string>("");
  const [previewTitle, setPreviewTitle] = useState<string>("");
  const [fileList, setFileList] = useState<UploadFile<any>[]>([]);

  const [errorMessages, setErrorMessages] = useState<ErrorItem[]>([]);
  const [isErrorMessageVisible, setIsErrorMessageVisible] = useState<boolean>(false);

  const handleError = (errorMsg: string) => {
    setErrorMessages((prevMessages) => [
      ...prevMessages,
      { id: Date.now(), message: errorMsg },
    ]);
    setIsErrorMessageVisible(true);
  };

    setErrorMessages((prevMessages) => [
      ...prevMessages,
      { id: errorId, message: errorMsg },
    ]);
    setIsErrorMessageVisible(true);

    setTimeout(() => {
      setIsErrorMessageVisible(false);
      setErrorMessages((prevMessages) =>
        prevMessages.filter((error) => error.id !== errorId)
      );
    }, 5000); // Show error messages for 5 seconds
  };

  const handleChange = async (info: UploadChangeParam<UploadFile<any>>) => {
    let { file, fileList } = info;
  
    const isFileRedundant = fileList.some(
      (existingFile) =>
        existingFile.name === file.name && existingFile.uid !== file.uid
    );
  
    if (isFileRedundant) {
      const redundantFileErrorMsg = `File '${file.name}' is redundant. Please double-check.`;
      handleError(redundantFileErrorMsg);
      fileList = fileList.filter(
        (existingFile) => existingFile.uid !== file.uid
      );
    }
  
    if (file.type && !acceptedFileTypes.includes(file.type)) {
      const unsupportedFileErrorMsg =
        "Unsupported file type. Please upload a valid file.";
      handleError(unsupportedFileErrorMsg);
      fileList = fileList.filter(
        (existingFile) => existingFile.uid !== file.uid
      );
    }
  
    const checksumPromises = fileList.map(async (file) => {
      const checksum = await getChecksum(file.originFileObj as RcFile);
      return { file, checksum };
    });
  
    const checksumResults = await Promise.all(checksumPromises);
  
    const duplicateFiles = checksumResults.filter(
      ({ checksum }, index) =>
        checksumResults.findIndex((result) => result.checksum === checksum) !==
        index
    );
  
    if (duplicateFiles.length > 0) {
      const duplicatedFileErrorMsg = `${duplicateFiles[0].file.name} is duplicated. Please double-check.`;
      handleError(duplicatedFileErrorMsg);
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
          fileList={fileList}
          onPreview={handlePreview}
          onChange={handleChange}
          // onDrop={(e) => {
          //   const unsupportedFiles = Array.from(e.dataTransfer.files).filter(
          //     (file) => !acceptedFileTypes.includes(file.type)
          //   );
          //   if (unsupportedFiles.length > 0) {
          //     const unsupportedFileErrorMsg =
          //       "Unsupported file type. Please upload a valid file.";
          //     handleError(unsupportedFileErrorMsg);
          //   }
          // }}
          listType="picture-card"
          showUploadList={{ showRemoveIcon: true }}
          className="custom-upload-dragger"
          accept=".pdf,.doc,.docx,.csv,image/*" // Accepted file types
          style={{ marginRight: 16, position: "relative" }}
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
          <div>
            {errorMessages.map((error) => (
              <IWillFollowYou key={error.id} errorMessage={error.message} />
            ))}
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
