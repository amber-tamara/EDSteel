"use client";

import Link from "next/link";
import { FaFacebook } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="border-t bg-primary-custom-teal">
      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
        
        <div className="flex flex-wrap items-center text-sm text-white gap-y-2">
          <span>© E&DSteel 2026</span>
          <span className="mx-2">|</span>

          <Link href="/terms" className="hover:underline">
            Terms & conditions
          </Link>
          <span className="mx-2">|</span>

          <Link href="/privacy" className="hover:underline">
            Privacy policy
          </Link>
          <span className="mx-2">|</span>

          <Link href="/contact" className="hover:underline">
            Contact us
          </Link>
          <span className="mx-2">|</span>

          <Link href="/cookies" className="hover:underline">
            Cookie Preferences
          </Link>
        </div>

        <div>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#117445] transition"
            aria-label="Facebook"
          >
            <FaFacebook size={30} className="text-white" />
          </a>
        </div>

      </div>
    </footer>
  );
}