import type { Metadata } from "next";
import "./globals.css";
import { DM_Serif_Display, Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { QueryProvider } from "@/components/providers/QueryProvider";
import { Toaster } from "sonner";

const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-serif",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "SnippetVault",
  description: "A modern code snippet manager — capture, organise, share.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn(dmSerif.variable, inter.variable)}>
      <head>
        <style dangerouslySetInnerHTML={{__html: `
          @view-transition {
            navigation: auto;
          }
        `}} />
      </head>
      <body className={cn("antialiased", inter.className)}>
        <QueryProvider>
          {children}
          <Toaster richColors position="top-right" />
        </QueryProvider>
      </body>
    </html>
  );
}
