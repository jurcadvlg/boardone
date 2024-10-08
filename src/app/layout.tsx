import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from 'sonner';
import './globals.css';
import { GoogleMapsProvider } from '@/components/providers';
import { Provider as JotaiProvider } from 'jotai';

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
      <head>
        <script src="/gtmScript.js" async />
      </head>
      <body className={inter.className}>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-MG38XPHV"
            height="0"
            width="0"
            className="hidden"
          ></iframe>
        </noscript>

        <JotaiProvider>
          <GoogleMapsProvider>
            <Toaster richColors closeButton position="top-center" />
            {children}
          </GoogleMapsProvider>
        </JotaiProvider>
      </body>
    </html>
  );
}
