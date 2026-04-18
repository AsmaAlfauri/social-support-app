import type { Metadata, Viewport } from "next";
import "./globals.css";
import { WizardProvider } from "@/store/wizard.context";
import AppLayout from "@/components/layout/AppLayout";
import HtmlWrapper from "@/components/layout/HtmlWrapper";

export const metadata: Metadata = {
  title: "Social Support Portal",
  description: "Apply for financial assistance easily and quickly",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <WizardProvider>
      <HtmlWrapper>
        <body className="min-h-screen bg-gray-50 antialiased">
          <AppLayout>{children}</AppLayout>
        </body>
      </HtmlWrapper>
    </WizardProvider>
  );
}