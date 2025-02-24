import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
const CursorDot = () => {
  const { theme } = useSelector((state) => state.user);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event) => {
      setPosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      className={`cursor-dot ${theme === "dark" ? " bg-white" : " bg-amber-950"} fixed w-5 h-5 z-50 rounded-full pointer-events-none transition-transform duration-200 ease-in`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: "translate(-50%, -50%)",
      }}
    />
  );
};

export default CursorDot;
