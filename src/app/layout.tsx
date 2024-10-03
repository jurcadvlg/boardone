import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from 'sonner';
import './globals.css';
import { GoogleMapsProvider } from '@/components/providers';

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
      <body className={inter.className}>
        <GoogleMapsProvider>
          <Toaster richColors closeButton position="top-center" />
          {children}
        </GoogleMapsProvider>
      </body>
    </html>
  );
}
