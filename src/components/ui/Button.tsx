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
                 flex items-center justify-center space-x-1"
    >
      {loading ? (
        <div className="flex space-x-1">
          <span className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:0s]"></span>
          <span className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:0.15s]"></span>
          <span className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:0.3s]"></span>
        </div>
      ) : (
        label
      )}
    </button>
  );
}
