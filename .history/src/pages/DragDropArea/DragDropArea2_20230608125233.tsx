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
  const [uploading, setUploading] = useState(false);
  const [cancelUpload, setCancelUpload] = useState(false);

  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const [isErrorMessageVisible, setIsErrorMessageVisible] = useState(false);

  const handleCancelUpload = () => {
    // Set the cancelUpload flag to true
    setCancelUpload(true);
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
        console.log('Upload canceled');
        // Reset the cancelUpload flag
        setCancelUpload(false);
        return;
      }

      // Upload completed successfully
      console.log('Upload completed');
    } catch (error) {
      // Handle the error
      console.error('Upload error:', error);
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
          reject(new Error('Upload canceled'));
        } else {
          resolve();
        }
      }, 2000); // Simulated upload duration of 2 seconds
    });
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
        console.log('Upload canceled');
        // Reset the cancelUpload flag
        setCancelUpload(false);
        return;
      }

      // Upload completed successfully
      console.log('Upload completed');
    } catch (error) {
      // Handle the error
      console.error('Upload error:', error);
    } finally {
      // Set the uploading flag to false
      setUploading(false);
    }
  };

  const cancelUpload = () => {
    // Set the cancelUpload flag to true
    setCancelUpload(true);
  };

  // Function to simulate file upload
  const uploadFiles = () => {
    return new Promise((resolve, reject) => {
      // Simulate an asynchronous upload process
      setTimeout(() => {
        // Resolve or reject based on the cancelUpload flag
        if (cancelUpload) {
          reject(new Error('Upload canceled'));
        } else {
          resolve();
        }
      }, 2000); // Simulated upload duration of 2 seconds
    });
  };

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
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          fileList={fileList}
          onPreview={handlePreview}
          onChange={handleChange}
          onDrop={(e) => {
            const unsupportedFiles = Array.from(e.dataTransfer.files).filter(
              (file) => !acceptedFileTypes.includes(file.type)
            );
            if (unsupportedFiles.length > 0) {
              const unsupportedFileErrorMsg =
                "Unsupported file type. Please upload a valid file.";
              handleError(unsupportedFileErrorMsg);
            }
          }}
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
            {errorMessages.map((errorMessage, index) => (
              <IWillFollowYou key={index} errorMessage={errorMessage} />
            ))}
          </div>

           <button onClick={handleUpload} disabled={uploading}>
           {uploading ? 'Uploading...' : 'Upload'}

         </button>
         {uploading && (
           <button onClick={cancelUpload} disabled={!uploading}>
             Cancel Upload
           </button>
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
