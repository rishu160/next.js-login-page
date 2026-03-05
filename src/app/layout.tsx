import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Crow - Email Verification",
  description: "Secure email verification portal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
