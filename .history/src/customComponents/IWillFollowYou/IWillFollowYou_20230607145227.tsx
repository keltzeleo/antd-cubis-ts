import { message } from "antd";
import { useEffect, useState } from "react";

interface IWillFollowYouProps {
  errorMessage: string;
}

const IWillFollowYou: React.FC<IWillFollowYouProps> = ({ errorMessage }) => {
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
    const timeout = setTimeout(() => {
      message.error(errorMessage, 5); // Display the error message for 5 seconds
    }, 500);

    return () => {
      clearTimeout(timeout);
      message.destroy(); // Clear the message when the component unmounts
    };
  }, [errorMessage]);

  useEffect(() => {
    const errorNotification = document.getElementById("error-notification");

    if (errorNotification) {
      errorNotification.style.left = `${position.x + 10}px`;
      errorNotification.style.top = `${position.y + 10}px`;
    }
  }, [position]);

  return (
    <div
      id="error-notification"
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        display: "none",
        zIndex: 9999,
      }}
    >
      {errorMessage}
    </div>
  );
};

export default IWillFollowYou;
