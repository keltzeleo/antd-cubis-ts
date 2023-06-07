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
      notification.style.left = `${position.x + 32}px`;
      notification.style.top = `${position.y - 8}px`;
      notification.style.display = "block";
    }

    const timeout = setTimeout(() => {
      if (notification) {
        notification.style.display = "none";
      }
    }, 5000);

    return () => {
      clearTimeout(timeout);
    };
  }, [position]);

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
