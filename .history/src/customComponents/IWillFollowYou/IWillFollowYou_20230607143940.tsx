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
        const rect = messageElement.getBoundingClientRect();
        const messageWidth = rect.width;
        const messageHeight = rect.height;

        const left = clientX + 10;
        const top = clientY + 10;

        messageElement.style.left = `${left}px`;
        messageElement.style.top = `${top}px`;

        // Check if the message goes beyond the viewport width
        if (left + messageWidth > window.innerWidth) {
          messageElement.style.left = `${window.innerWidth - messageWidth}px`;
        }

        // Check if the message goes beyond the viewport height
        if (top + messageHeight > window.innerHeight) {
          messageElement.style.top = `${window.innerHeight - messageHeight}px`;
        }
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
