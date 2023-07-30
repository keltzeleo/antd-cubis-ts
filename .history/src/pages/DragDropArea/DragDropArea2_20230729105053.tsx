import { Upload } from "antd";
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
import CustomerInfo from "../Forms/CustomerInfo";
import "./DragDropArea2.css";

const { Dragger } = Upload;

interface FileListProps extends UploadFile<any> {
  className?: string;
}

interface Theme {
  [key: string]: string;
}

interface DragDropArea2Props {
  theme: Theme;
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

const DragDropArea2: React.FC<DragDropArea2Props> = ({ theme }) => {
  const { colorBgBase } = theme;

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

  const [citizenship, setCitizenship] = useState<string>("");
  const [nationality, setNationality] = useState<string | null>(null);

  const [errorMessage, setErrorMessage] = useState("");
  const [isErrorMessageVisible, setIsErrorMessageVisible] = useState(false);

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

  const handleCitizenshipChange = (value: string) => {
    setCitizenship(value);
  };

  const handleNationalityChange = (value: string | null) => {
    setNationality(value);
  };

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file: FileListProps) => {
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

    setTimeout(() => {
      setErrorMessage(null);
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

  const fileCounterSquare = (
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

  const uploadButtonSquare = (
    <div>
      <div
        style={{
          display: "flex",
          width: "180px",
          height: "130px",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginTop: -36,
        }}
      >
        <p>
          <img src="../icons/icon_upload.png" alt="Drag and Drop Icon" />
        </p>

        <span>Click or Drag to Upload</span>

        {/* <p className="ant-upload-hint" style={{ padding: 16 }}>
          Support individual and bulk file uploads, please submit the required
          files as needed.
        </p> */}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          bottom: "-30",
          left: "50%",
          padding: 6,
          transform: "translate(-50%, -50%)",
          height: "40px",
          width: "120px",
          borderRadius: 8,
          border: "1px dashed #00a991",
          opacity: isUploadDisabled ? 0.5 : 1,
          pointerEvents: isUploadDisabled ? "none" : "auto",
        }}
      >
        {fileCounterSquare}
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
    <div
      className="drag-drop-container"
      style={{
        height: "100vh",
        backgroundColor: colorBgBase,
        // overflowX: "hidden",
      }}
    >
      <div className="top-section">
        <IdType
          theme={theme}
          onChange={handleOptionChange}
          onInputChange={handleInputIcChange}
        />
      </div>
      <div className="top-section" style={{ width: "100vh" }}>
        <CustomerIcNameBoard
          theme={theme}
          customerTitle={customerTitle}
          customerName={customerName}
          selectedOption={selectedIdType}
          inputIcNumber={inputIcValue}
        />
      </div>
      <div className="content-container" style={{ display: "flex" }}>
        <div
          className="left-section"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <div
            style={{
              width: "210px",
              marginBottom: "16px",
            }}
          >
            <IdTypeBoard theme={theme} selectedOption={selectedIdType} />
          </div>
          <div
            className="upload-area"
            style={{
              width: "250px",
              display: "inline-block",
              flexDirection: "column",
              height: "450px",
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
              listType="picture"
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
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            height: "100%",
            // overflow: "hidden",
          }}
        >
          &nbsp;
          <CustomerInfo
            theme={theme}
            customerTitle={customerTitle}
            customerName={customerName}
            inputIcNumber={inputIcValue}
            mobileNumber={mobileNumber}
            homeNumber={homeNumber}
            alternativeNumber={alternativeNumber}
            citizenship={citizenship}
            nationality={nationality}
            lotNo={""}
            blockNo={""}
            premiseNo={""}
            premiseName={""}
            otherContactName={""}
            othersContactNumber={""}
            relationship={""}
            onCustomerTitleChange={handleCustomerTitleChange}
            onCustomerNameChange={handleCustomerNameChange}
            onMobileNumberChange={setMobileNumber}
            onHomeNumberChange={setHomeNumber}
            onAlternativeNumberChange={setAlternativeNumber}
            onCitizenshipChange={handleCitizenshipChange}
            onNationalityChange={handleNationalityChange}
          />
        </div>
      </div>
    </div>
  );
};

export default DragDropArea2;
