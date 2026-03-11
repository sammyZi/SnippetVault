import type { Metadata } from "next";
import "./globals.css";
import { Comic_Neue } from "next/font/google";
import { cn } from "@/lib/utils";
import { QueryProvider } from "@/components/providers/QueryProvider";

const comicNeue = Comic_Neue({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-comic-neue",
});

export const metadata: Metadata = {
  title: "SnippetVault",
  description: "A modern code snippet manager",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans", comicNeue.variable)}>
      <head>
        <style dangerouslySetInnerHTML={{__html: `
          @view-transition {
            navigation: auto;
          }
        `}} />
      </head>
      <body className={cn("antialiased", comicNeue.className)}>
        <QueryProvider>
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
