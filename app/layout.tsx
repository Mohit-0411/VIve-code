import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Sahityik",
  description: "A celebration of words, stories, and the literary spirit.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-stone-950">
        <Navbar />
        {children}
      </body>
    </html>
  );
}