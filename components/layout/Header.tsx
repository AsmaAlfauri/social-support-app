"use client";

import Link from "next/link";
import { useWizard } from "@/store/wizard.context";

export default function Header() {
  const { language, toggleLanguage } = useWizard();

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* LOGO */}
        <Link href="/">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
            </div>
            <span className="font-semibold text-gray-900 text-sm tracking-tight">
              Social Support
            </span>
          </div>
        </Link>

        {/* LANG TOGGLE */}
        <button
          onClick={toggleLanguage}
          className="text-sm text-gray-500 hover:text-gray-900 transition px-3 py-1.5 rounded-lg hover:bg-gray-100"
        >
          {language === "en" ? "العربية" : "English"}
        </button>

      </div>
    </header>
  );
}