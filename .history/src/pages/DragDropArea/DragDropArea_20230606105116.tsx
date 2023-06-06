import { InboxOutlined } from "@ant-design/icons";
import { Upload, message } from "antd";

const { Dragger } = Upload;

// Component for the drag and drop area
const DragDropArea: React.FC = () => {
  // Handle file upload
  const handleFileUpload = (file: File) => {
    // Perform actions with the uploaded file (e.g., validation, extraction, etc.)
    // You can implement your logic here or call appropriate functions/components
    console.log(file);
    message.success("File uploaded successfully.");
  };

  return (
    <Dragger
      accept=".pdf,.doc,.docx"
      beforeUpload={(file) => {
        handleFileUpload(file);
        return false; // Prevent default upload behavior
      }}
    >
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">
        Click or drag file to this area to upload
      </p>
      <p className="ant-upload-hint">Support for a single or bulk upload.</p>
    </Dragger>
  );
};

export default DragDropArea;
