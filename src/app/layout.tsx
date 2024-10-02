import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from 'sonner';
import './globals.css';

export const metadata: Metadata = {
  title: 'BoardOne',
  description: 'Poptávka autobusové dopravy',
};

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="cs">
      <Toaster richColors closeButton position="top-center" />
      <body className={inter.className}>{children}</body>
    </html>
  );
}
