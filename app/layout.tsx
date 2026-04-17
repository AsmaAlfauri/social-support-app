import type { Metadata } from "next";

import "./globals.css";
import { WizardProvider } from "@/store/wizard.context";
import AppLayout from "@/components/layout/AppLayout";

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
      <body className="min-h-full flex flex-col"><WizardProvider><AppLayout>{children}</AppLayout></WizardProvider> </body>
    </html>
  );
}
