import { message } from "antd";
import { useEffect, useState } from "react";

interface IWillFollowYouProps {
  errorMessage: string;
}

const IWillFollowYou: React.FC<IWillFollowYouProps> = ({ errorMessage }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const theme = useTheme();

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
    const hideMessage = message.error(errorMessage, 0); // Display the error message

    return () => {
      hideMessage(); // Hide the error message when the component unmounts
    };
  }, [errorMessage]);

  return (
    <div
      id="error-notification"
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        zIndex: 9999,
        padding: "10px 16px",
        borderRadius: "8px",
        border: `1px solid ${theme.colors.error}`, // Adjust the border color based on theme
        backgroundColor: theme.colors.errorBackground, // Adjust the background color based on theme
        color: theme.colors.text, // Adjust the text color based on theme
        display: "flex",
        alignItems: "center",
      }}
    >
      <span
        style={{
          marginRight: "8px",
        }}
      >
        {/* Add your error icon component here */}
      </span>
      {errorMessage}
    </div>
  );
};

export default IWillFollowYou;
