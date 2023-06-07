// import { message } from "antd";
import { ConfigContext } from "antd/lib/config-provider";
import { useContext, useEffect, useState } from "react";

interface IWillFollowYouProps {
  errorMessage: string;
}

const IWillFollowYou: React.FC<IWillFollowYouProps> = ({ errorMessage }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const { getPrefixCls } = useContext(ConfigContext);
  const prefixCls = getPrefixCls("message");

  const errorBorderColor = "red"; // Adjust the border color based on your styling
  const errorBackgroundColor = "rgba(255, 0, 0, 0.1)"; // Adjust the background color based on your styling
  const errorTextColor = "red"; // Adjust the text color based on your styling

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
      notification.style.left = `${position.x}px`;
      notification.style.top = `${position.y}px`;
    }
  }, [position]);

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
        position: "absolute",
        left: 0,
        top: 0,
        zIndex: 9999,
        padding: "10px 16px",
        borderRadius: "8px",
        border: `1px solid ${errorBorderColor}`,
        backgroundColor: errorBackgroundColor,
        color: errorTextColor,
        display: "flex",
        alignItems: "center",
      }}
      className={`${prefixCls}-notice ${prefixCls}-notice-closable`}
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
