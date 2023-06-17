import { Alert } from "antd";
import React from "react";
import "./IdTypeNotification.css";
import NotificationColour from "./NotificationColour.tsx";

interface IdTypeNotificationProps {
  selectedIdType: string;
}

const IdTypeNotification: React.FC<IdTypeNotificationProps> = ({
  selectedIdType,
}) => {
  const getNotificationContent = () => {
    if (selectedIdType === "MyKad") {
      return (
        <>
          <h3>MyKad Notification</h3>
          <p>This is a notification for MyKad.</p>
          <p>It corresponds to the selected ID type: {selectedIdType}</p>
        </>
      );
    } else if (selectedIdType === "MyTentera") {
      return (
        <>
          <h3>MyTentera Notification</h3>
          <p>This is a notification for MyTentera.</p>
          <p>It corresponds to the selected ID type: {selectedIdType}</p>
        </>
      );
    } else if (selectedIdType === "MyPR") {
      return (
        <>
          <h3>MyPR Notification</h3>
          <p>This is a notification for MyPR.</p>
          <p>It corresponds to the selected ID type: {selectedIdType}</p>
        </>
      );
    } else if (selectedIdType === "MyKAS") {
      return (
        <>
          <h3>MyKAS Notification</h3>
          <p>This is a notification for MyKAS.</p>
          <p>It corresponds to the selected ID type: {selectedIdType}</p>
        </>
      );
    } else if (selectedIdType === "Commercial") {
      return (
        <>
          <h3>Commercial Notification</h3>
          <p>This is a notification for Commercial.</p>
          <p>It corresponds to the selected ID type: {selectedIdType}</p>
        </>
      );
    } else {
      return (
        <>
          <h3>No ID Type Selected</h3>
          <p>Please select an ID type from the dropdown.</p>
        </>
      );
    }
  };

  const getNotificationStyle = () => {
    if (selectedIdType === "MyKad") {
      return { backgroundColor: "green" };
    } else if (selectedIdType === "MyTentera") {
      return { backgroundColor: "blue" };
    } else if (selectedIdType === "MyPR") {
      return { backgroundColor: "orange" };
    } else if (selectedIdType === "MyKAS") {
      return { backgroundColor: "yellow" };
    } else if (selectedIdType === "Commercial") {
      return { backgroundColor: "pink" };
    } else {
      return { backgroundColor: "gray" };
    }
  };

  return (
    <div className={`id-type-notification ${getNotificationStyle()}`}>
      <Alert
        message="Notification Board"
        description={getNotificationContent()}
        type="info"
        showIcon
      />
    </div>
    <p></p>
    <NotificationColour
  type={selectedIdType}
  message="Notification Board"
  description={getNotificationContent()}
/>

  );
};

export default IdTypeNotification;
