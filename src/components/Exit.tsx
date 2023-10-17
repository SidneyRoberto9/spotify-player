'use client';
import { LogOut } from 'lucide-react';

import { useSpotify } from '@/context/useSpotify';

export default function Exit() {
  const { isAuth, logout } = useSpotify();

  if (isAuth) {
    return (
      <LogOut
        onClick={logout}
        size={25}
        className="absolute top-0 right-0 m-4 text-zinc-600 hover:text-emerald-400 hover:brightness-150 transition-all duration-200 ease-out cursor-pointer bg-transparent"
      />
    );
  }

  return <></>;
}
