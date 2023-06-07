import { message } from "antd";
import { useEffect, useRef } from "react";

interface IWillFollowYouProps {
  errorMessage: string;
}

const IWillFollowYou: React.FC<IWillFollowYouProps> = ({ errorMessage }) => {
  const messageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const { clientX, clientY } = event;
      const messageElement = messageRef.current;

      if (messageElement) {
        messageElement.style.left = `${clientX + 10}px`;
        messageElement.style.top = `${clientY + 10}px`;
      }
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

  return <div ref={messageRef} style={{ position: "fixed" }} />;
};

export default IWillFollowYou;
