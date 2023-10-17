'use client';
import { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

import { useSpotify } from '@/context/useSpotify';
import LoadingPage from '@/components/LoadingPage';

export default function page() {
  const searchParams = useSearchParams();
  const { push } = useRouter();

  const code = searchParams.get('code');

  if (code == null || code == '') {
    return <div>error</div>;
  }

  const { loginIn, isAuth } = useSpotify();

  async function redirect() {
    await loginIn(code as string);
    push('/');
  }

  useEffect(() => {
    if (!isAuth) {
      redirect();
    }
  }, []);

  if (!isAuth) {
    return <LoadingPage />;
  }

  return <LoadingPage />;
}
