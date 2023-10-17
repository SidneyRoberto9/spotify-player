'use client';
import { ReactNode } from 'react';

import { SpotifyContextProvider } from '@/context/useSpotify';

interface ProvidersProps {
  children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return <SpotifyContextProvider>{children}</SpotifyContextProvider>;
}
