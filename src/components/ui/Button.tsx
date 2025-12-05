"use client";

import { useState } from "react";

export default function Button({
  label,
  onClick,
}: {
  label: string;
  onClick?: () => Promise<void>;
}) {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    if (onClick) {
      setLoading(true);
      try {
        await onClick();
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <button
      onClick={handleClick}
      className="px-7 py-3 rounded-[3.75rem] bg-white font-bold text-black border-2 border-black
                 hover:bg-black hover:text-white hover:shadow-inner transition duration-200 cursor-pointer
                 flex items-center justify-center space-x-1 min-w-[160px] min-h-[40px]"
    >
      <div
        className={`absolute flex space-x-1.5 transition-opacity duration-200 ease-in-out
            ${loading ? "opacity-100" : "opacity-0"}`}
      >
        <span className="w-2 h-2 bg-current rounded-full animate-bounce [animation-delay:0s]" />
        <span className="w-2 h-2 bg-current rounded-full animate-bounce [animation-delay:0.15s]" />
        <span className="w-2 h-2 bg-current rounded-full animate-bounce [animation-delay:0.3s]" />
      </div>
      <span
        className={`absolute transition-opacity duration-200 ease-in-out
            ${loading ? "opacity-0" : "opacity-100"}`}
      >
        {label}
      </span>
    </button>
  );
}
