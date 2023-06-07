import { CloseCircleFilled } from "@ant-design/icons";
import { ConfigContext } from "antd/lib/config-provider";
import { useContext, useEffect, useState } from "react";
import light from "../../tokens/light.json";
import "./IWillFollowYou.css";

interface IWillFollowYouProps {
  errorMessage: string;
}

const IWillFollowYou: React.FC<IWillFollowYouProps> = ({ errorMessage }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const { getPrefixCls } = useContext(ConfigContext);
  const prefixCls = getPrefixCls("message");

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
    const fadeInTimeout = setTimeout(() => {
      setIsVisible(true);
    }, 500); // 0.5 seconds fade-in time

    const fadeOutTimeout = setTimeout(() => {
      setIsVisible(false);
    }, 4500); // 4.5 seconds display time

    return () => {
      clearTimeout(fadeInTimeout);
      clearTimeout(fadeOutTimeout);
    };
  }, []);

  return (
    <div
      id="error-notification"
      style={{
        position: "fixed",
        fontFamily: "Mulish",
        left: position.x + 10,
        top: position.y,
        zIndex: 9999,
        padding: "10px 16px",
        borderRadius: "8px",
        border: "1px solid #c7a6a6",
        backgroundColor: "rgba(255, 241, 240, 0.8)",
        color: light["red"],
        display: "flex",
        alignItems: "center",
        opacity: isVisible ? 1 : 0,
        transition: "opacity 0.5s ease-in-out",
      }}
      className={`${prefixCls}-notice ${prefixCls}-notice-closable`}
    >
      <span style={{ marginRight: "8px" }}>
        <CloseCircleFilled />
      </span>
      {errorMessage}
    </div>
  );
};

export default IWillFollowYou;
