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
    const notification = document.querySelector(".ant-message");

    if (notification) {
      notification.style.left = `${position.x}px`;
      notification.style.top = `${position.y}px`;
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

  return null;
};

export default IWillFollowYou;
