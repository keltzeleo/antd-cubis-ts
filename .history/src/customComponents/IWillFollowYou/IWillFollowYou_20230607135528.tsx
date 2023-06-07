import { message } from "antd";
import { useEffect, useState } from "react";

interface ErrorNotificationProps {
  errorMessage: string;
}

const ErrorNotification: React.FC<ErrorNotificationProps> = ({
  errorMessage,
}) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setPosition({ x: event.clientX, y: event.clientY });
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const notificationStyle = {
      position: "fixed",
      left: `${position.x}px`,
      top: `${position.y}px`,
    };

    const timeout = setTimeout(() => {
      message.error(errorMessage, 0);
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, [errorMessage, position]);

  return null;
};

const IWillFollowYou: React.FC = () => {
  return (
    <div>
      <h1>My App</h1>
      <ErrorNotification errorMessage="I Will Follow You Error Notification Sample." />
    </div>
  );
};
export default IWillFollowYou;
