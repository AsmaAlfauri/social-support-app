"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white border-b sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">

        {/* LOGO */}
        <Link href="/">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-blue-600"></div>
          <h1 className="font-semibold text-gray-800">
            Social Support
          </h1>
        </div>
        </Link>


        {/* ACTION BUTTON */}
        <Link href="/apply">
          <button className="
            bg-blue-600 text-white px-4 py-2 rounded-lg
            hover:bg-blue-700 transition
            active:scale-[0.98]
          ">
            Apply Now
          </button>
        </Link>

      </div>
    </header>
  );
}