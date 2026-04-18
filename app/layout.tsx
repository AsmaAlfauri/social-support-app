import type { Metadata } from "next";
import "./globals.css";
import { WizardProvider } from "@/store/wizard.context";
import AppLayout from "@/components/layout/AppLayout";

export const metadata: Metadata = {
  title: "Social Support Portal",
  description: "Apply for financial assistance easily and quickly",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 antialiased">
        <WizardProvider>
          <AppLayout>{children}</AppLayout>
        </WizardProvider>
      </body>
    </html>
  );
}