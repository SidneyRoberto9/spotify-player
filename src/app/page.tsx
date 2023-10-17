'use client';

import { useSpotify } from '@/context/useSpotify';
import { Player } from '@/components/Player';
import Exit from '@/components/Exit';
import { Login } from '@/components/login';

export default function Page() {
  const { isAuth } = useSpotify();

  return (
    <main className="flex items-center justify-center h-screen">
      {isAuth ? <Player /> : <Login />}
      <Exit />
    </main>
  );
}
