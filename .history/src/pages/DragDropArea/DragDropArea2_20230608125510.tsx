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

const DragDropArea2: React.FC = () => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState<UploadFile<any>[]>([]);

  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const [isErrorMessageVisible, setIsErrorMessageVisible] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [cancelUpload, setCancelUpload] = useState(false);

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
    setErrorMessages((prevMessages) => [...prevMessages, errorMsg]);
    setIsErrorMessageVisible(true);

    setTimeout(() => {
      setIsErrorMessageVisible(false);
      setErrorMessages([]);
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
        "Unsupported file type. Please upload a PDF, Word document, CSV, or image file.";
      handleError(unsupportedFileErrorMsg);
      fileList = fileList.filter(
        (existingFile) => existingFile.uid !== file.uid
      );
    }

    if (fileList.length > 5) {
      const maxFilesErrorMsg = "You can upload up to 5 files.";
      handleError(maxFilesErrorMsg);
      fileList = fileList.slice(0, 5);
    }

    if (file.status === "error") {
      const uploadErrorMsg = `File '${file.name}' failed to upload. Please try again.`;
      handleError(uploadErrorMsg);
      fileList = fileList.filter(
        (existingFile) => existingFile.uid !== file.uid
      );
    }

    setFileList(fileList);
  };

  const handleRemove = (file: UploadFile<any>) => {
    setFileList((prevFileList) =>
      prevFileList.filter((existingFile) => existingFile.uid !== file.uid)
    );
  };

  const handleUpload = async () => {
    // Set the uploading flag to true
    setUploading(true);

    // Perform the upload logic
    try {
      // Start uploading the files
      await uploadFiles();

      // Check if the upload was canceled
      if (cancelUpload) {
        console.log("Upload canceled");
        // Reset the cancelUpload flag
        setCancelUpload(false);
        return;
      }

      // Upload completed successfully
      console.log("Upload completed");
    } catch (error) {
      // Handle the error
      console.error("Upload error:", error);
    } finally {
      // Set the uploading flag to false
      setUploading(false);
    }
  };

  const uploadFiles = () => {
    return new Promise<void>((resolve, reject) => {
      // Simulate an asynchronous upload process
      setTimeout(() => {
        // Resolve or reject based on the cancelUpload flag
        if (cancelUpload) {
          reject(new Error("Upload canceled"));
        } else {
          resolve();
        }
      }, 2000); // Simulated upload duration of 2 seconds
    });
  };

  return (
    <>
      <Upload
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        onRemove={handleRemove}
      >
        {fileList.length < 5 && "+ Upload"}
      </Upload>
      <Modal
        visible={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img alt="Preview" style={{ width: "100%" }} src={previewImage} />
      </Modal>
      {isErrorMessageVisible && (
        <div>
          {errorMessages.map((errorMessage, index) => (
            <IWillFollowYou key={index} errorMessage={errorMessage} />
          ))}
        </div>
      )}
      <button onClick={handleUpload} disabled={uploading}>
        {uploading ? "Uploading..." : "Upload"}
      </button>
      {uploading && (
        <button onClick={handleCancel} disabled={!uploading}>
          Cancel Upload
        </button>
      )}
    </>
  );
};

export default DragDropArea2;
