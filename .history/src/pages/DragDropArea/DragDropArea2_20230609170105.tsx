import { Modal, Upload } from "antd";
import { RcFile } from "antd/es/upload";
import { UploadChangeParam, UploadFile } from "antd/lib/upload/interface";
import { crc32 } from "crc";
import React, { useState } from "react";
import IWillFollowYou from "../../customComponents/IWillFollowYou/IWillFollowYou"; // Import the IWillFollowYou component
import "./DragDropArea2.css";

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

  const [errorMessage, setErrorMessage] = useState("");
  const [isErrorMessageVisible, setIsErrorMessageVisible] = useState(false);

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file: UploadFile<any>) => {
    if (file.status === "error") {
      return;
    }

    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(
      file.name ||
        (file.url ? file.url.substring(file.url.lastIndexOf("/") + 1) : "")
    );
  };

  const handleError = (errorMsg: string) => {
    setErrorMessage(errorMsg);
    setIsErrorMessageVisible(true);

    setTimeout(() => {
      setIsErrorMessageVisible(false);
    }, 5000);
  };

  const handleChange = async (info: UploadChangeParam<UploadFile<any>>) => {
    const newFileList = [...info.fileList];

    if (newFileList.length > 8) {
      newFileList.splice(8);
    }

    newFileList.forEach((file) => {
      if (file.status === "error" && !file.url && !file.preview) {
        file.preview = "placeholder.png";
      }
    });

    const checksumPromises = newFileList.map(async (file) => {
      const checksum = await getChecksum(file.originFileObj as RcFile);
      return { file, checksum };
    });

    const checksumResults = await Promise.all(checksumPromises);

    const duplicateFiles = checksumResults.filter(
      (result, index) =>
        checksumResults.findIndex(
          (item) => item.checksum === result.checksum
        ) !== index
    );

    if (duplicateFiles.length > 0) {
      handleError(
        `${duplicateFiles[0].file.name} already exists. For security reasons,  please delete the file manually & reupload a new version.`
      );
      setFileList((prevFileList) =>
        prevFileList.filter((file) => file.uid !== duplicateFiles[0].file.uid)
      );
    }

    setFileList(
      newFileList.map((file) => {
        // Set a custom error icon for files with status 'error'
        if (file.status === "error") {
          return {
            ...file,
            thumbUrl: "../../icons/icon_error_sm.png", // Replace 'error.png' with the path to your error icon
          };
        }
        return file;
      })
    );
  };

  const handleRemove = (file: UploadFile<any>) => {
    setFileList((prevFileList) =>
      prevFileList.filter((item) => item.uid !== file.uid)
    );
  };

  const fileCounter = (
    <p>
      {fileList.length} out of{" "}
      {fileList.length >= 8 ? "Maximum limit reached" : "8"} files uploaded
    </p>
  );

  const isUploadDisabled = fileList.length >= 8;

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
      <p className="ant-upload-hint" style={{ padding: 16 }}>
        Support individual and bulk file uploads, please submit the required
        files as needed.
      </p>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          bottom: "2",
          left: "50%",
          transform: "translate(-50%, -50%)",
          height: "auto",
          width: "80%",
          padding: "0 8px",
          borderRadius: 8,
          border: "1px dashed #00a991",
          opacity: isUploadDisabled ? 0.5 : 1,
          pointerEvents: isUploadDisabled ? "none" : "auto",
        }}
      >
        {fileCounter}
      </div>
    </div>
  );

  const getListItemClassName = (file: UploadFile<any>): string => {
    if (file.status === "done") {
      return "ant-upload-list-item-done"; // Apply the desired CSS class for files with status "done"
    }
    return "";
  };

  return (
    <>
      <div
        style={{
          width: 320,
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
          onRemove={handleRemove}
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
          accept=".pdf,.doc,.docx,.csv,image/*"
          style={{ marginRight: 16 }}
          multiple
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            {uploadButton}
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
