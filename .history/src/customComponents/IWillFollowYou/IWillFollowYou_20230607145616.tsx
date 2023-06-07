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
    const notification = document.getElementById("error-notification");

    if (notification) {
      const left = position.x + 10; // Adjust the left position
      const top = position.y + 10; // Adjust the top position
      notification.style.left = `${left}px`;
      notification.style.top = `${top}px`;
    }
  }, [position]);

  return (
    <div id="error-notification" style={{}}>
      {errorMessage}
    </div>
  );
};

export default IWillFollowYou;
