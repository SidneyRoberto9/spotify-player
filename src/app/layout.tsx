import type { Metadata } from 'next';
import '@/styles/globals.css';

import { ReactNode } from 'react';
import { Inter } from 'next/font/google';
import Favicon from '/public/favicon.ico';

import Providers from '@/components/Providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Spotify Player',
  description: 'Music Player Made With Spotify',
  icons: [{ rel: 'icon', url: Favicon.src }],
};

export interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={inter.className}>
      <body className="antialiased relative bg-zinc-800">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
