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
    const notification = document.getElementById("error-notification");

    if (notification) {
      notification.style.left = `${position.x + 10}px`;
      notification.style.top = `${position.y + 10}px`;
    }

    const timeout = setTimeout(() => {
      message.destroy(); // Clear any existing messages
      message.error(errorMessage, 3); // Display the error message for 3 seconds
    }, 500);

    return () => {
      clearTimeout(timeout);
      message.destroy(); // Clear the message when the component unmounts
    };
  }, [errorMessage, position]);

  return (
    <div id="error-notification" style={{ position: "fixed", display: "none" }}>
      {errorMessage}
    </div>
  );
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
