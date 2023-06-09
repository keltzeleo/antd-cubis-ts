const DragDropArea2: React.FC = () => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState<UploadFile<any>[]>([]);

  const [errorMessage, setErrorMessage] = useState(""); // Error message state
  const [isErrorMessageVisible, setIsErrorMessageVisible] = useState(false); // Visibility state of error message

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file: UploadFile<any>) => {
    if (file.status === "error") {
      // handleError(`File '${file.name}' encountered an error during upload.`);
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
    }, 5000); // Show error message for 5 seconds
  };

  const handleChange = async (info: UploadChangeParam<UploadFile<any>>) => {
    const newFileList = [...info.fileList];

    if (newFileList.length >= 8) {
      return; // Return early if maximum upload file number is reached
    }

    newFileList.forEach((file) => {
      if (file.status === "error" && !file.url && !file.preview) {
        file.preview = "placeholder.png"; // Set a default thumbnail for error files
      }
    });

    // Calculate checksum for each file
    const checksumPromises = newFileList.map(async (file) => {
      const checksum = await getChecksum(file.originFileObj as RcFile);
      return { file, checksum };
    });

    const checksumResults = await Promise.all(checksumPromises);

    // Check for duplicates based on checksum
    const duplicateFiles = checksumResults.filter(
      (result, index) =>
        checksumResults.findIndex(
          (item) => item.checksum === result.checksum
        ) !== index
    );

    if (duplicateFiles.length > 0) {
      handleError(
        `${duplicateFiles[0].file.name} already exists. For security reasons, please delete the file manually & reupload a new version.`
      );
      setFileList((prevFileList) =>
        prevFileList.filter((file) => file.uid !== duplicateFiles[0].file.uid)
      );
    } else {
      // Update the fileList state with the newFileList
      setFileList(newFileList);
    }
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

  return (
    <>
      <div
        style={{
          width: 380,
          display: "inline-block",
          flexDirection: "column",
          height: 450,
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
