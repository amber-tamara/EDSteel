'use client';

import Link from 'next/link';
import { FaFacebook } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-primary-custom-teal text-white">
      {/* CONTENT */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* TOP GRID */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8 text-sm">
          {/* Help */}
          <div>
            <h3 className="font-semibold mb-3">Help</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/delivery" className="hover:underline">
                  Delivery & Returns
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:underline">
                  Contact us
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold mb-3">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/terms" className="hover:underline">
                  Terms & conditions
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:underline">
                  Privacy policy
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="hover:underline">
                  Cookie Preferences
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* FULL WIDTH GRADIENT DIVIDER */}
      <div className="w-full h-[0.5px] bg-white/40" />

      {/* BOTTOM BAR */}
      <div className="max-w-7xl mx-auto px-6 py-4 text-sm flex flex-col md:flex-row items-center justify-between gap-2">
        <span>© E&DSteel 2026</span>

        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block hover:text-green-100 transition"
          aria-label="Facebook"
        >
          <FaFacebook size={28} />
        </a>
      </div>
    </footer>
  );
}
