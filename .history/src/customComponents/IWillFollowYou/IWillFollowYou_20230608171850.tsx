import { CloseCircleFilled } from "@ant-design/icons";
import { ConfigContext } from "antd/lib/config-provider";
import { useContext, useEffect, useState } from "react";
import { CSSTransition } from "react-transition-group";
import light from "../../tokens/light.json";
import "./IWillFollowYou.css";

interface IWillFollowYouProps {
  errorMessage: string;
}

const IWillFollowYou: React.FC<IWillFollowYouProps> = ({ errorMessage }) => {
  const [position, setPosition] = useState({
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  });
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
    const timeout = setTimeout(() => {
      setIsVisible(false);
    }, 4500);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <CSSTransition
      in={isVisible}
      timeout={500}
      classNames="message-transition"
      unmountOnExit
    >
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
        }}
        className={`${prefixCls}-notice ${prefixCls}-notice-closable`}
      >
        <span style={{ marginRight: "8px" }}>
          <CloseCircleFilled />
        </span>
        {errorMessage}
      </div>
    </CSSTransition>
  );
};

export default IWillFollowYou;
