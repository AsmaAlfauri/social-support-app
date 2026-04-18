"use client";

import { useWizard } from "@/store/wizard.context";

export default function HtmlWrapper({ children }: { children: React.ReactNode }) {
  const { language } = useWizard();

  return (
    <html lang={language} dir={language === "ar" ? "rtl" : "ltr"}>
      {children}
    </html>
  );
}