"use client";

import React, { useState, useEffect } from "react";

interface PopupProps {
  popup: boolean;
  message: string;
  type: "success" | "info" | "error";
}

const PopupAlert: React.FC<PopupProps> = ({ popup, message, type }) => {
  const [popupVisible, setPopupVisible] = useState(popup);

  useEffect(() => {
    if (popup) {
      setPopupVisible(true);
      const timer = setTimeout(() => {
        setPopupVisible(false);
      }, 3000);

      return () => clearTimeout(timer); // Clean up the timer
    }
  }, [popup]);

  // Define styles and icons based on type
  const typeStyles = {
    success: {
      background: "bg-green-200",
      iconBackground: "bg-green-500",
      text: "text-green-900",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 shrink-0 fill-white"
          viewBox="0 0 512 512"
        >
          <ellipse cx="256" cy="256" rx="256" ry="255.832" />
          <path
            className="fill-green-500"
            d="m235.472 392.08-121.04-94.296 34.416-44.168 74.328 57.904 122.672-177.016 46.032 31.888z"
          />
        </svg>
      ),
    },
    info: {
      background: "bg-blue-100",
      iconBackground: "bg-blue-500",
      text: "text-blue-900",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 shrink-0 fill-white"
          viewBox="0 0 23.625 23.625"
        >
          <path d="M11.812 0C5.289 0 0 5.289 0 11.812s5.289 11.813 11.812 11.813 11.813-5.29 11.813-11.813S18.335 0 11.812 0zm2.459 18.307c-.608.24-1.092.422-1.455.548a3.838 3.838 0 0 1-1.262.189c-.736 0-1.309-.18-1.717-.539s-.611-.814-.611-1.367c0-.215.015-.435.045-.659a8.23 8.23 0 0 1 .147-.759l.761-2.688c.067-.258.125-.503.171-.731.046-.23.068-.441.068-.633 0-.342-.071-.582-.212-.717-.143-.135-.412-.201-.813-.201-.196 0-.398.029-.605.09-.205.063-.383.12-.529.176l.201-.828c.498-.203.975-.377 1.43-.521a4.225 4.225 0 0 1 1.29-.218c.731 0 1.295.178 1.692.53.395.353.594.812.594 1.376 0 .117-.014.323-.041.617a4.129 4.129 0 0 1-.152.811l-.757 2.68a7.582 7.582 0 0 0-.167.736 3.892 3.892 0 0 0-.073.626c0 .356.079.599.239.728.158.129.435.194.827.194.185 0 .392-.033.626-.097.232-.064.4-.121.506-.17l-.203.827zm-.134-10.878a1.807 1.807 0 0 1-1.275.492c-.496 0-.924-.164-1.28-.492a1.57 1.57 0 0 1-.533-1.193c0-.465.18-.865.533-1.196a1.812 1.812 0 0 1 1.28-.497c.497 0 .923.165 1.275.497.353.331.53.731.53 1.196 0 .467-.177.865-.53 1.193z" />
        </svg>
      ),
    },
    error: {
      background: "bg-red-100",
      iconBackground: "bg-red-500",
      text: "text-red-800",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 shrink-0 fill-white"
          viewBox="0 0 32 32"
        >
          <path d="M16 1a15 15 0 1 0 15 15A15 15 0 0 0 16 1zm6.36 20L21 22.36l-5-4.95-4.95 4.95L9.64 21l4.95-5-4.95-4.95 1.41-1.41L16 14.59l5-4.95 1.41 1.41-5 4.95z" />
        </svg>
      ),
    },
  };

  const { background, iconBackground, text, icon } = typeStyles[type];

  return (
    <div
      className="fixed top-10 left-1/2 transform -translate-x-1/2 mt-4 w-max z-50"
      style={{ visibility: popupVisible ? "visible" : "hidden" }}
    >
      {popupVisible && (
        <div
          className={`relative ${background} shadow-[0_3px_10px_-3px_rgba(6,81,237,0.3)] text-black flex w-max max-w-sm rounded-md overflow-hidden`}
          role="alert"
        >
          <div className={`flex items-center justify-center w-14 h-14 ${iconBackground}`}>
            {icon}
          </div>
          <div className="py-2 mx-4 flex justify-center items-center">
            <p className={`text-sm font-semibold ${text}`}>{message}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PopupAlert;
