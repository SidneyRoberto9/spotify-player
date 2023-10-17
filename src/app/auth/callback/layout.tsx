import { ReactNode } from 'react';

export interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return <div className="antialiased relative bg-zinc-800 h-screen">{children}</div>;
}
