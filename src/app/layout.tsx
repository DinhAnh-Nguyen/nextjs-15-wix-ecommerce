import type { Metadata } from "next";
import {Lora} from "next/font/google";
import "./globals.css";

const lora = Lora({subsets: ["latin"]});

export const metadata: Metadata = {
  title: {
    template: "%s | Flow Shop", // %s is for the placeholder
    absolute: "Flow Shop"
  },
  description: "A full-stack e-commerce application built with Next.js by Daniel Nguyen",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={lora.className}>{children}</body>
    </html>
  );
}
