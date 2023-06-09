import { Upload } from "antd";
import { useState } from "react";
import IWillFollowYou from "../../customComponents/IWillFollowYou/IWillFollowYou"; // Import the IWillFollowYou component

const acceptedFileTypes = [
  ".pdf",
  ".doc",
  ".docx",
  ".csv",
  "image/jpeg",
  "image/png",
  "image/jpg",
];

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const handleFileUpload = (files) => {
  files.forEach((file) => {
    // Handle the file upload logic for each file here
    console.log(file);
  });
};

const DragDropArea2 = () => {
  const [fileList, setFileList] = useState([]);
  const [errorMessage, setErrorMessage] = useState(""); // Error message state
  const [isErrorMessageVisible, setIsErrorMessageVisible] = useState(false); // Visibility state of error message

  const handlePreview = async (file) => {
    if (file.status === "error") {
      // handleError(`File '${file.name}' encountered an error during upload.`);
      return;
    }

    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    // Handle preview logic here
  };

  const handleError = (errorMsg) => {
    setErrorMessage(errorMsg);
    setIsErrorMessageVisible(true);

    setTimeout(() => {
      setIsErrorMessageVisible(false);
    }, 5000); // Show error message for 5 seconds
  };

  const handleChange = (info) => {
    const { fileList: newFileList } = info;

    if (newFileList.length > 8) {
      newFileList.splice(8); // Limit the fileList to 8 files
    }

    newFileList.forEach((file) => {
      if (file.status === "error" && !file.url && !file.preview) {
        file.preview = "placeholder.png"; // Set a default thumbnail for error files
      }
    });

    // Update the fileList state
    setFileList(newFileList);
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
          height: "32px",
          width: "auto",
          padding: "0 8px",
          borderRadius: 8,
          border: "1px dashed #00a991",
          opacity: isUploadDisabled ? 0.5 : 1,
          pointerEvents: isUploadDisabled ? "none" : "auto",
        }}
      >
        {fileList.length >= 8 ? (
          <p style={{ margin: 0, fontSize: "50px" }}>FULL</p>
        ) : (
          fileCounter
        )}
      </div>
    </div>
  );

  const uploadDragger =
    fileList.length < 8 ? (
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
    ) : null;

  return (
    <>
      {uploadDragger}

      {isErrorMessageVisible && <IWillFollowYou errorMessage={errorMessage} />}

      {/* Rest of the code */}
    </>
  );
};

export default DragDropArea2;
