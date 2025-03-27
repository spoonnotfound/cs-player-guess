import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Counter Strikle - The Wordle of CS. Guess the mystery player",
  description: "Do you want to test your Counter Strike player knowledge? Put it to the test and guess the mystery player of the day on BLAST.tv.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-['TT_Norms_Pro'] bg-background text-foreground custom-scrollbar">
        {children}
      </body>
    </html>
  );
}
