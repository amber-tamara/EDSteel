"use client";
import { FaArrowAltCircleUp } from "react-icons/fa";

export default function BackToTopBtn() {
    const backToTop = () => { window.scrollTo({ top: 0, behavior: "smooth" }); }
    return (
        <div className="flex justify-center w-full mt-16 mb-8">
            <button onClick={backToTop} className="flex justify-center items-center w-30 cursor-pointer">
                <span className="mr-2">Back to Top</span>
                <FaArrowAltCircleUp size={20} className="text-green-600" />
            </button>
        </div>
    )
}