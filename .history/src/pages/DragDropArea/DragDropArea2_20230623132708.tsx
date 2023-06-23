import { Modal, Upload } from "antd";
import { RcFile } from "antd/es/upload";
import { UploadChangeParam, UploadFile } from "antd/lib/upload/interface";
import { crc32 } from "crc";
import React, { useState } from "react";
import IWillFollowYou from "../../customComponents/IWillFollowYou/IWillFollowYou";
import CustomerIcNameBoard from "../../customComponents/Notification/CustomerIcNameBoard";
import IdTypeBoard from "../../customComponents/Notification/IdTypeBoard";
import IdType from "../../customComponents/Select/IdType";
import "../../customComponents/Select/IdType.css";
import { acceptedFileTypes } from "../../customConstants/dragDropFileTypes";
import CustomerInfo, { Country } from "../Forms/CustomerInfo";
import "./DragDropArea2.css";

const { Dragger } = Upload;

interface FileListProps extends UploadFile<any> {
  className?: string;
}

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
  const [inputIcValue, setInputIcValue] = useState("");

  const [fileList, setFileList] = useState<FileListProps[]>([]);
  const [selectedIdType, setSelectedIdType] = useState("");
  const [customerTitle, setCustomerTitle] = useState<string | undefined>(
    undefined
  );
  const [customerName, setCustomerName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [homeNumber, setHomeNumber] = useState("");
  const [alternativeNumber, setAlternativeNumber] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);

  const handleCustomerTitleChange = (value: string | undefined) => {
    setCustomerTitle(value);
  };

  const handleCustomerNameChange = (value: string) => {
    setCustomerName(value);
  };

  const handleOptionChange = (value: string) => {
    setSelectedIdType(value);
  };

  const handleInputIcChange = (value: string) => {
    setInputIcValue(value);
  };

  const handleCountryChange = (selectedOption: Country | null) => {
    setSelectedCountry(selectedOption);
  };

  const handleError = (errorMsg: string) => {
    setErrorMessage(errorMsg);
    setIsErrorMessageVisible(true);

    setTimeout(() => {
      setIsErrorMessageVisible(false);
    }, 5000);
  };

  const handleChange = async (info: UploadChangeParam<FileListProps>) => {
    const newFileList = [...info.fileList];

    if (newFileList.length > 8) {
      newFileList.splice(8);
    }

    newFileList.forEach((file) => {
      if (file.status === "error" && !file.url && !file.preview) {
        file.preview = "placeholder.png";
      }
    });

    const duplicateFiles: FileListProps[] = [];
    const redundantFiles: FileListProps[] = [];
    const checksumMap: Map<number, FileListProps> = new Map();

    for (const file of newFileList) {
      const checksum = await getChecksum(file.originFileObj as RcFile);
      if (checksumMap.has(checksum)) {
        const duplicateFile = checksumMap.get(checksum);
        if (duplicateFile && !duplicateFiles.includes(duplicateFile)) {
          duplicateFiles.push(duplicateFile);
        }
        duplicateFiles.push(file);
      } else {
        checksumMap.set(checksum, file);
      }
    }

    if (duplicateFiles.length > 0) {
      handleError(
        `${duplicateFiles[0].name} already exists. For security reasons, please delete the file manually and reupload a new version.`
      );
      return;
    }

    if (redundantFiles.length > 0) {
      handleError(
        `${redundantFiles[0].name} is redundant. Please remove the duplicate file.`
      );
      return;
    }

    setFileList(
      newFileList.map((file) => {
        if (file.status === "error") {
          return {
            ...file,
            thumbUrl: "../../icons/icon_error_sm.png",
            className: "ant-upload-list-item-error",
          };
        }
        return file;
      })
    );
  };

  const handleRemove = (file: FileListProps) => {
    setFileList((prevFileList) =>
      prevFileList.filter((item) => item.uid !== file.uid)
    );
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = e.dataTransfer.files;

    const unsupportedFiles: File[] = [];
    const validFiles: RcFile[] = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (acceptedFileTypes.includes(file.type)) {
        validFiles.push(file as RcFile);
      } else {
        unsupportedFiles.push(file);
      }
    }

    if (unsupportedFiles.length > 0) {
      handleError("Unsupported file type. Please upload a valid file.");
      return;
    }

    const newFileList: FileListProps[] = [];
    const duplicateFiles: FileListProps[] = [];
    const checksumMap: Map<number, FileListProps> = new Map();

    for (const file of validFiles) {
      const checksum = await getChecksum(file);
      if (checksumMap.has(checksum)) {
        const duplicateFile = checksumMap.get(checksum);
        if (duplicateFile && !duplicateFiles.includes(duplicateFile)) {
          duplicateFiles.push(duplicateFile);
        }
        duplicateFiles.push(file as FileListProps);
      } else {
        checksumMap.set(checksum, file as FileListProps);
        const uploadFile: FileListProps = {
          uid: file.name,
          name: file.name,
          status: "done",
          size: file.size,
          type: file.type,
          originFileObj: file as RcFile,
        };
        newFileList.push(uploadFile);
      }
    }

    if (duplicateFiles.length > 0) {
      handleError(
        `${duplicateFiles[0].name} already exists. For security reasons, please delete the file manually and reupload a new version.`
      );
      return;
    }

    const updatedFileList = [...fileList, ...newFileList];

    if (updatedFileList.length > 8) {
      updatedFileList.splice(8);
    }

    setFileList(updatedFileList);
  };

  const fileCounter = (
    <div style={{ marginTop: 8 }}>
      <p>
        {fileList.length}{" "}
        {fileList.length < 8
          ? "out of 8 files uploaded."
          : "files finished uploading. "}{" "}
        {fileList.length === 8 &&
          " Please review & confirm the file lists below."}
      </p>
    </div>
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
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "0 16",
          marginTop: -48,
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
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          bottom: "10",
          left: "50%",
          transform: "translate(-50%, 0%)",
          height: "auto",
          width: "80%",
          borderRadius: 8,
          border: "1px dashed #00a991",
          opacity: isUploadDisabled ? 0.5 : 1,
          pointerEvents: isUploadDisabled ? "none" : "auto",
          marginTop: -10,
        }}
      >
        {fileCounter}
      </div>
    </div>
  );

  const getListItemClassName = (file: FileListProps): string => {
    if (file.status === "done") {
      return "ant-upload-list-item-done";
    }
    return "";
  };

  return (
    <div className="drag-drop-container">
      <div className="top-section">
        <IdType
          onChange={handleOptionChange}
          onInputChange={handleInputIcChange}
        />
      </div>
      <div className="content-container" style={{ display: "flex" }}>
        <div className="left-section" style={{}}>
          <div
            className="upload-area"
            style={{
              width: "250",
              display: "inline-block",
              flexDirection: "column",
              height: "450",
            }}
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
          >
            <Dragger
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange}
              onRemove={handleRemove}
              listType="picture-card"
              showUploadList={{ showRemoveIcon: true }}
              accept=".pdf,.doc,.docx,.csv,image/*"
              style={{ marginRight: 8 }}
              multiple
            >
              <div
                style={{
                  display: "block",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                {uploadButton}
              </div>
            </Dragger>
          </div>
          {isErrorMessageVisible && (
            <IWillFollowYou errorMessage={errorMessage} />
          )}
        </div>
        <div
          className="right-section"
          style={{
            flex: 1,
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div style={{ flex: 1, height: "" }}>
            <CustomerIcNameBoard
              customerTitle={customerTitle}
              customerName={customerName}
              selectedOption={selectedIdType}
              inputIcNumber={inputIcValue}
            />
            &nbsp;
            <div
              style={{
                flex: 1,
                boxSizing: "border-box",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <IdTypeBoard selectedOption={selectedIdType} />
            </div>
            &nbsp;
            <CustomerInfo
              customerTitle={customerTitle}
              customerName={customerName}
              inputIcNumber={inputIcValue}
              mobileNumber={mobileNumber}
              homeNumber={homeNumber}
              alternativeNumber={alternativeNumber}
              onCustomerTitleChange={handleCustomerTitleChange}
              onCustomerNameChange={handleCustomerNameChange}
              onMobileNumberChange={setMobileNumber}
              onHomeNumberChange={setHomeNumber}
              onAlternativeNumberChange={setAlternativeNumber}
              selectedCountry={selectedCountry}
              onCountryChange={handleCountryChange}
            />
          </div>
        </div>
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
  );
};

export default DragDropArea2;
