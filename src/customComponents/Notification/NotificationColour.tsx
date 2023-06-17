import { Alert } from "antd";
import React from "react";
import "./NotificationColour.css";

interface NotificationColourProps {
  type: string;
  message: string;
  description?: string;
}

const NotificationColour: React.FC<NotificationColourProps> = ({
  type,
  message,
  description,
}) => {
  const getNotificationStyle = () => {
    switch (type) {
      case "MyKad":
        return "myKad-notification";
      case "MyTentera":
        return "myTentera-notification";
      case "MyPR":
        return "myPR-notification";
      case "MyKAS":
        return "myKAS-notification";
      case "Commercial":
        return "forCommercial-notification";
      default:
        return "default-notification";
    }
  };

  return (
    <div className={`notification-container ${getNotificationStyle()}`}>
      <Alert message={message} description={description} type="info" showIcon />
    </div>
  );
};

export default NotificationColour;
