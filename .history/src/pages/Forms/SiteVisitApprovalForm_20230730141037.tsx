import { Button, Form, Input, Modal, Upload } from "antd";
import { RcFile } from "antd/es/upload";
import { UploadChangeParam, UploadFile } from "antd/lib/upload/interface";
import React, { useState } from "react";
import IWillFollowYou from "../../customComponents/IWillFollowYou/IWillFollowYou";
import { acceptedFileTypes } from "../../customConstants/dragDropFileTypes";
import "./forms.css";

const { Dragger } = Upload;

interface FileListProps extends UploadFile<any> {
  className?: string;
  size?: number;
  uploadDate?: Date;
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
}) => {
  const [form] = Form.useForm();

  const handleSubmit = (values: any) => {
    // Handle form submission logic here
    console.log("Form values:", values);
  };
  // const { colorBgBase } = theme;

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [inputIcValue, setInputIcValue] = useState("");

  const [fileList, setFileList] = useState<FileListProps[]>([]);
  const [selectedIdType, setSelectedIdType] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [isErrorMessageVisible, setIsErrorMessageVisible] = useState(false);

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

    // Set the file information for display in the modal
    setFileInfo({
      name: file.name,
      size: file.size,
      uploadDate: file.uploadDate,
    });
  };

  const [fileInfo, setFileInfo] = useState<{
    name?: string;
    size?: number;
    uploadDate?: Date;
  }>({});

  const formatBytes = (bytes: number) => {
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    if (bytes === 0) return "0 Byte";
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)).toString());
    return Math.round(bytes / Math.pow(1024, i)) + " " + sizes[i];
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

    // Calculate the file size and set the size property
    const calculateFileSize = (file: File): number => {
      return file.size;
    };

    // Set the uploadDate property to the current date
    const getCurrentDate = (): Date => {
      return new Date();
    };

    setFileList(
      newFileList.map((file) => {
        if (file.status === "error") {
          return {
            ...file,
            thumbUrl: "../../icons/icon_error_sm.png",
            className: "ant-upload-list-item-error",
          };
        }
        // Calculate the file size and set the size property
        const fileSize = file.originFileObj
          ? calculateFileSize(file.originFileObj)
          : 0;
        // Set the uploadDate property to the current date
        const uploadDate = getCurrentDate();

        return {
          ...file,
          size: fileSize,
          uploadDate,
        };
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
          uploadDate: new Date(), // Set the uploadDate property

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

    const existingFileNames = fileList.map((file) => file.name);
    const redundantFiles = validFiles.filter((file) =>
      existingFileNames.includes(file.name)
    );

    if (redundantFiles.length > 0) {
      handleError(
        `${redundantFiles[0].name} is redundant. Please remove the duplicate file.`
      );
      return;
    }

    const updatedFileList = [...fileList, ...newFileList];

    if (updatedFileList.length > 5) {
      updatedFileList.splice(5);
    }

    setFileList(updatedFileList);
  };

  // Define the maximum allowed files as a constant variable
  const MAX_FILES = 5;

  const fileCounter = (
    <div style={{ marginTop: 8 }}>
      <p>
        {fileList.length}{" "}
        {fileList.length < MAX_FILES
          ? `out of ${MAX_FILES} files uploaded.`
          : "Files Limit Reached. Please review & confirm the file lists below."}
      </p>
    </div>
  );

  const fileCounterSquare = (
    <div style={{ marginTop: 8 }}>
      <p>
        {fileList.length}{" "}
        {fileList.length < MAX_FILES
          ? `out of ${MAX_FILES} files uploaded.`
          : "files finished uploading. Please review & confirm the file lists below."}
      </p>
    </div>
  );

  const isUploadDisabled = fileList.length >= 5;

  // Refactor the upload button components to a single component
  const UploadButton: React.FC<{ isSquare: boolean }> = ({ isSquare }) => (
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
          marginTop: isSquare ? -48 : -36,
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
          files as needed. {<br />}{" "}
          <span style={{ fontSize: 9, fontWeight: 600 }}>
            ( only PNG, JPG & PDF files are allowed. )
          </span>
        </p>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          bottom: "16",
          left: "50%",
          fontSize: 12,
          transform: "translate(-50%, 0%)",
          height: "auto",
          width: "80%",
          padding: 8,
          borderRadius: 8,
          border: "1px dashed #00a991",
          opacity: isUploadDisabled ? 0.5 : 1,
          pointerEvents: isUploadDisabled ? "none" : "auto",
          marginTop: isSquare ? -10 : -30,
        }}
      >
        {isSquare ? fileCounterSquare : fileCounter}
      </div>
    </div>
  );

  // Remove duplicate code and use the UploadButton component
  const uploadButton = <UploadButton isSquare={false} />;
  const uploadButtonSquare = <UploadButton isSquare={true} />;

  const getListItemClassName = (file: FileListProps): string => {
    return file.status === "done" ? "ant-upload-list-item-done" : "";
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
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
                onRemove={handleRemove}
                listType="picture"
                showUploadList={{ showRemoveIcon: true }}
                accept=".pdf,.png, .jpg"
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
            <Form.Item
              name="siteName"
              label="Site Name"
              rules={[
                {
                  required: true,
                  message: "Site Name is required",
                },
              ]}
            >
              <Input />
            </Form.Item>
            {/* Add more form fields as needed */}
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
            &nbsp;
          </div>
        </div>
      </div>
      <Modal open={previewOpen} footer={null} onCancel={handleCancel}>
        {previewImage && (
          <>
            <img alt="example" style={{ width: "100%" }} src={previewImage} />
            <p>
              {" "}
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
                File Name: {fileInfo.name}
              </div>
            </p>
            <p>File Size: {formatBytes(fileInfo.size || 0)}</p>
            <p>Upload Date: {fileInfo.uploadDate?.toLocaleString()}</p>
          </>
        )}
      </Modal>
    </Form>
  );
};

export default SiteVisitApprovalForm;
