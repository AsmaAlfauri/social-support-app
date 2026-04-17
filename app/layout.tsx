import type { Metadata } from "next";

import "./globals.css";
import { WizardProvider } from "@/store/wizard.context";

export const metadata: Metadata = {
  title: "Social support app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-full flex flex-col"> <WizardProvider>{children}</WizardProvider></body>
    </html>
  );
}
