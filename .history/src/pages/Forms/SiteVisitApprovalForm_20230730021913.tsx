import { DeleteOutlined, FileOutlined } from "@ant-design/icons";
import { Form, Progress, Tooltip, Upload } from "antd";
import { RcFile } from "antd/es/upload";
import { UploadChangeParam, UploadFile } from "antd/lib/upload/interface";
import React, { useState } from "react";
import IWillFollowYou from "../../customComponents/IWillFollowYou/IWillFollowYou";
import { acceptedFileTypes } from "../../customConstants/dragDropFileTypes";
import "./forms.css";

const { Dragger } = Upload;

interface FileListProps extends UploadFile<any> {
  className?: string;
  size: number; // Add file size property
  uploadDate: string; // Add upload date property
}

interface Theme {
  [key: string]: string;
}

export interface SiteVisitApprovalFormProps {
  theme: Theme;
  onSubmit: (values: any) => void; // Form submission handler prop
}

const SiteVisitApprovalForm: React.FC<SiteVisitApprovalFormProps> = ({
  theme,
  onSubmit,
}) => {
  const [form] = Form.useForm();

  // const { colorBgBase } = theme;

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [inputIcValue, setInputIcValue] = useState("");

  const [fileList, setFileList] = useState<FileListProps[]>([]);
  const [selectedIdType, setSelectedIdType] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [isErrorMessageVisible, setIsErrorMessageVisible] = useState(false);

  const handleSubmit = (values: any) => {
    // Handle form submission logic here
    onSubmit(values);
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

  // Placeholder implementation for getBase64 (replace with actual logic)
  const getBase64 = async (file: RcFile): Promise<string> => {
    return new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.addEventListener("load", () => resolve(reader.result as string));
      reader.readAsDataURL(file);
    });
  };

  // Placeholder implementation for getChecksum (replace with actual logic)
  const getChecksum = async (file: RcFile): Promise<number> => {
    // Replace this with your actual checksum generation logic
    const sum = file.name
      .split("")
      .reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return sum;
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

    if (newFileList.length > 5) {
      newFileList.splice(5);
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

        // Get the file size and upload date and store them in the file object
        const fileObj = file.originFileObj as RcFile;
        const fileSize = fileObj.size;
        const uploadDate = new Date().toLocaleString(); // Update this with actual upload date

        // Return the updated file object with the tooltip information
        return {
          ...file,
          tooltip: {
            title: file.name,
            content: (
              <div>
                <p>File Size: {fileSize} bytes</p>
                <p>Upload Date: {uploadDate}</p>
              </div>
            ),
          },
        };
      })
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
        validFiles.push(file as RcFile); // Cast 'file' to 'RcFile'
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
      const checksum = await getChecksum(file as RcFile); // Cast 'file' to 'RcFile'
      if (checksumMap.has(checksum)) {
        const duplicateFile = checksumMap.get(checksum);
        if (duplicateFile && !duplicateFiles.includes(duplicateFile)) {
          duplicateFiles.push(duplicateFile);
        }
        duplicateFiles.push(file as FileListProps); // Cast 'file' to 'FileListProps'
      } else {
        checksumMap.set(checksum, file as FileListProps); // Cast 'file' to 'FileListProps'
        const uploadFile: FileListProps = {
          uid: file.name,
          name: file.name,
          status: "done",
          size: file.size,
          type: file.type,
          originFileObj: file as RcFile, // Cast 'file' to 'RcFile'
          uploadDate: new Date().toLocaleString(), // Add 'uploadDate' property
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

    if (updatedFileList.length > 5) {
      updatedFileList.splice(5);
    }

    setFileList(updatedFileList);
  };

  const handleRemove = (file: FileListProps) => {
    setFileList((prevFileList) =>
      prevFileList.filter((item) => item.uid !== file.uid)
    );
  };

  const fileCounter = (
    <div style={{ marginTop: 5 }}>
      <p>
        {fileList.length}{" "}
        {fileList.length < 5
          ? "out of 5 files uploaded."
          : "files finished uploading. "}{" "}
        {fileList.length === 5 &&
          " Please review & confirm the file lists below."}
      </p>
    </div>
  );

  const fileCounterSquare = (
    <div style={{ marginTop: 5 }}>
      <p>
        {fileList.length}{" "}
        {fileList.length < 5
          ? "out of 5 files uploaded."
          : "files finished uploading. "}{" "}
        {fileList.length === 5 &&
          " Please review & confirm the file lists below."}
      </p>
    </div>
  );

  const isUploadDisabled = fileList.length >= 5;

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
          marginTop: -45,
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
          width: "50%",
          borderRadius: 5,
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
          width: "150px",
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
          borderRadius: 5,
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
    <Form form={form} onFinish={handleSubmit}>
      <div
        className="drag-drop-container"
        style={{
          height: "100vh",
          backgroundColor: "theme.colorBgBase",
        }}
      >
        <div className="top-section">
          <div
            style={{
              color: "#f3f6f9",
              borderRadius: 16,
              padding: "0 0 0 16",
              top: 0,
              justifyContent: "center",
              backgroundColor: "#00a991",
              fontSize: 12,
            }}
          >
            <h2>Site Visit Approval Form</h2>
          </div>
        </div>
        <div className="top-section" style={{ width: "100vh" }}></div>
        <div className="content-container" style={{ display: "flex" }}>
          <div
            className="left-section"
            style={{ display: "flex", flexDirection: "column" }}
          >
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
                action="https://www.mocky.io/v2/5cc5019d300000950a055e76"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
                onRemove={handleRemove}
                listType="picture"
                showUploadList={{ showRemoveIcon: true }}
                accept=".pdf,.png, .jpg"
                style={{ marginRight: 5 }}
                multiple
              >
                <div
                  style={{
                    display: "block",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  {/* ... Other JSX ... */}
                  {fileList.map((file) => (
                    <Tooltip key={file.uid} title={file.tooltip?.content}>
                      <div
                        className={`ant-upload-list-item ant-upload-list-item-${
                          file.status
                        } ${getListItemClassName(file)}`}
                      >
                        <div className="ant-upload-list-item-info">
                          <span>
                            <img
                              src={file.thumbUrl || "placeholder.png"}
                              alt={file.name}
                              className="ant-upload-list-item-thumbnail"
                            />
                            {file.status === "uploading" ? (
                              <Progress
                                type="circle"
                                percent={file.percent}
                                width={40}
                                strokeWidth={2}
                                showInfo={false}
                              />
                            ) : null}
                          </span>
                          <span className="ant-upload-list-item-name">
                            {file.name}
                          </span>
                          {file.status === "done" && (
                            <span className="ant-upload-list-item-actions">
                              <a
                                href={file.url || file.preview}
                                target="_blank"
                                rel="noopener noreferrer"
                                title="View file"
                              >
                                <FileOutlined />
                              </a>
                              <a
                                href="#"
                                onClick={() => handleRemove(file)}
                                title="Remove file"
                              >
                                <DeleteOutlined />
                              </a>
                            </span>
                          )}
                        </div>
                      </div>
                    </Tooltip>
                  ))}
                </div>
              </Dragger>{" "}
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
          </div>
        </div>
      </div>
    </Form>
  );
};

export default SiteVisitApprovalForm;
