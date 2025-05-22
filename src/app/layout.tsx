import type {Metadata} from 'next';
import { Geist, Geist_Mono } from 'next/font/google'; // Changed to specific Geist import
import './globals.css';
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({ // Using Geist directly
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'TenderMatch Pro - Company Registration',
  description: 'Comprehensive company data collection wizard for TenderMatch Pro.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
