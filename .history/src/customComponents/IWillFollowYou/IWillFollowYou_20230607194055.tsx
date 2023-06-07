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
  const [isVisible, setIsVisible] = useState(true);
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
    const timeout1 = setTimeout(() => {
      setIsVisible(false);
    }, 4500); // 4.5 seconds (including fade-in) to start fading out

    const timeout2 = setTimeout(() => {
      setIsVisible(true);
    }, 100); // 0.1 seconds delay before reappearing

    return () => {
      clearTimeout(timeout1);
      clearTimeout(timeout2);
    };
  }, []);

  return (
    <>
      {isVisible && (
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
            animation: "slideFadeIn 0.5s ease-in",
          }}
          className={`${prefixCls}-notice ${prefixCls}-notice-closable`}
        >
          <span style={{ marginRight: "8px" }}>
            <CloseCircleFilled />
          </span>
          {errorMessage}
        </div>
      )}
    </>
  );
};

export default IWillFollowYou;
