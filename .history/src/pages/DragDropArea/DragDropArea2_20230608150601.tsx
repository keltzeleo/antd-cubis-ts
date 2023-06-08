import { Modal, Upload } from "antd";
import { RcFile } from "antd/es/upload";
import { UploadChangeParam, UploadFile } from "antd/lib/upload/interface";
import { crc32 } from "crc";
import React, { useState } from "react";
import IWillFollowYou from "../../customComponents/IWillFollowYou/IWillFollowYou";

const getChecksum = async (file: RcFile): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const arrayBuffer = reader.result as ArrayBuffer;
      const crc = crc32(arrayBuffer);
      resolve(crc.toString());
    };
    reader.onerror = (error) => {
      reject(error);
    };
    reader.readAsArrayBuffer(file);
  });
};

const getCroppedImage = async (file: File): Promise<string> => {
  // Implement the logic to get the cropped image preview here
  return new Promise<string>((resolve, reject) => {
    // Example code to generate a placeholder image URL
    const placeholderImage = `https://via.placeholder.com/300x300?text=${encodeURIComponent(
      file.name
    )}`;
    resolve(placeholderImage);
  });
};

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

const DragDropArea2: React.FC = () => {
  const [previewOpen, setPreviewOpen] = useState<boolean>(false);
  const [previewImage, setPreviewImage] = useState<string>("");
  const [previewTitle, setPreviewTitle] = useState<string>("");
  const [fileList, setFileList] = useState<UploadFile<any>[]>([]);

  const [errorMessages, setErrorMessages] = useState<ErrorItem[]>([]);
  const [isErrorMessageVisible, setIsErrorMessageVisible] =
    useState<boolean>(false);

  const handleError = (errorMsg: string) => {
    setErrorMessages((prevMessages) => [
      ...prevMessages,
      { id: Date.now(), message: errorMsg },
    ]);
    setIsErrorMessageVisible(true);

    setTimeout(() => {
      setIsErrorMessageVisible(false);
      setErrorMessages((prevMessages) =>
        prevMessages.filter((error) => error.message !== errorMsg)
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

  const handlePreview = async (file: UploadFile<any>) => {
    if (file.status === "error") {
      setPreviewImage("");
      setPreviewTitle("");
      return;
    }

    if (!file.url && !file.preview) {
      file.preview = await getCroppedImage(file.originFileObj as File);
    }

    setPreviewImage(file.preview || file.url || "");
    setPreviewTitle(file.name || "");
  };

  const handleCancel = () => {
    setPreviewOpen(false);
  };

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
          listType="picture-card"
          showUploadList={{ showRemoveIcon: true }}
          className="custom-upload-dragger"
          accept=".pdf,.doc,.docx,.csv,image/*"
          style={{ marginRight: 16, position: "relative" }}
          multiple
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

        <div className="file-list">
          {fileList.map((file: UploadFile<any>) => (
            <div key={file.uid} className="file-item">
              {file.status === "error" ? (
                <div className="error-thumbnail">
                  <span className="error-icon">X</span>
                </div>
              ) : (
                <div className="thumbnail-container">
                  <img
                    src={file.url || file.preview}
                    alt={file.name}
                    className="thumbnail"
                    onClick={() => handlePreview(file)}
                  />
                </div>
              )}
              <span className="file-name">{file.name}</span>
            </div>
          ))}
        </div>

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
