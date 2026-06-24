'use client';
import { FaArrowAltCircleUp } from 'react-icons/fa';

interface BackToTopBtnProps {
  className?: string;
}

export default function BackToTopBtn({ className = '' }: BackToTopBtnProps) {
  const backToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      onClick={backToTop}
      className={`flex justify-center items-center cursor-pointer w-full mt-16 p-6 ${className}`}
    >
      <span className="mr-2">Back to Top</span>
      <FaArrowAltCircleUp size={20} className="text-green-600" />
    </button>
  );
}
