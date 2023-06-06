import { Modal, Upload } from "antd";
import type { UploadFile } from "antd/es/upload/interface";
import { useState } from "react";

const { Dragger } = Upload;

const getBase64 = (file: File): Promise<string | ArrayBuffer | null> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const DragDropArea = () => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState<
    string | ArrayBuffer | undefined
  >("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([
    {
      uid: "-1",
      name: "image.png",
      status: "done",
      url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    },
    // ...
  ]);

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      const preview = await getBase64(file.originFileObj as File);
      file.preview = preview as string | undefined;
    }

    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name ||
        (file.url?.substring(file.url.lastIndexOf("/") + 1) as string)
    );
  };

  // ...

  return (
    <>
      <Dragger
        accept=".pdf,.doc,.docx,.csv,image/*"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={({ fileList: newFileList }) => setFileList(newFileList)}
      >
        {/* ... */}
      </Dragger>
      <div className="file-list">
        {fileList.map((file) => (
          <div
            key={file.uid}
            className="file-item"
            onMouseEnter={() => handlePreview(file)}
            onMouseLeave={handleCancel}
          >
            {/* ... */}
          </div>
        ))}
      </div>
      <Modal
        visible={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img
          alt="Preview"
          style={{ width: "100%" }}
          src={previewImage as string}
        />
      </Modal>
    </>
  );
};

export default DragDropArea;
