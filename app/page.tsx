"use client";

import Link from "next/link";
import { useWizard } from "@/store/wizard.context";
import { translations } from "@/i18n/translations";

export default function Home() {
  const { language } = useWizard();
  const t = translations[language];

  return (
    <main className="min-h-screen bg-gray-50">

      {/* HERO */}
      <section className="max-w-3xl mx-auto px-6 pt-24 pb-16 text-center">

        {/* BADGE */}
        <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 text-xs font-medium px-3 py-1.5 rounded-full mb-6">
          <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
          Government Social Support Portal
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight tracking-tight">
          {t.home.heroTitle}
        </h1>

        <p className="text-gray-500 mt-4 text-base max-w-xl mx-auto leading-relaxed">
          {t.home.heroDesc}
        </p>

        <div className="mt-8 flex items-center justify-center gap-3">
          <Link href="/apply">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-xl text-sm font-medium hover:bg-blue-700 transition active:scale-[0.98]">
              {t.home.start}
            </button>
          </Link>
        </div>

      </section>

      {/* DIVIDER */}
      <div className="max-w-3xl mx-auto px-6">
        <div className="border-t border-gray-200" />
      </div>

      {/* FEATURES */}
      <section id="features" className="max-w-3xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-6">

        <div className="bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-sm transition">
          <div className="w-9 h-9 bg-blue-50 rounded-xl flex items-center justify-center mb-4">
            <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 className="font-semibold text-gray-900 text-sm mb-1">{t.features.fastTitle}</h3>
          <p className="text-gray-500 text-xs leading-relaxed">{t.features.fastDesc}</p>
        </div>

        <div className="bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-sm transition">
          <div className="w-9 h-9 bg-purple-50 rounded-xl flex items-center justify-center mb-4">
            <svg className="w-4 h-4 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m1.636 6.364l.707-.707M12 21v-1" />
            </svg>
          </div>
          <h3 className="font-semibold text-gray-900 text-sm mb-1">{t.features.aiTitle}</h3>
          <p className="text-gray-500 text-xs leading-relaxed">{t.features.aiDesc}</p>
        </div>

        <div className="bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-sm transition">
          <div className="w-9 h-9 bg-green-50 rounded-xl flex items-center justify-center mb-4">
            <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h3 className="font-semibold text-gray-900 text-sm mb-1">{t.features.secureTitle}</h3>
          <p className="text-gray-500 text-xs leading-relaxed">{t.features.secureDesc}</p>
        </div>

      </section>

    </main>
  );
}