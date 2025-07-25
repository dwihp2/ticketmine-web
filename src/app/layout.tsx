
import type { Metadata } from "next";
import "./globals.css";
import ReactQueryProvider from './ReactQueryProvider';
import { Toaster } from "@/components/ui/sonner";
import { ReactScan } from "@/components/ReactScan";

export const metadata: Metadata = {
  title: "TicketMine - Discover Amazing Events",
  description: "Book tickets for concerts, festivals, sports, and more in your city",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ReactScan />
      <body className="font-sans antialiased">
        <ReactQueryProvider>
          {children}
          <Toaster />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
