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
        messageElement.style.transform = `translate(${clientX + 10}px, ${
          clientY + 10
        }px)`;
      }
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const hideMessage = message.error(errorMessage, 5); // Display the error message for 5 seconds

    return () => {
      hideMessage(); // Hide the error message when the component unmounts
    };
  }, [errorMessage]);

  return (
    <div
      ref={messageRef}
      style={{
        position: "relative",
        left: 10,
        top: 10,
        pointerEvents: "none",
      }}
    />
  );
};

export default IWillFollowYou;
