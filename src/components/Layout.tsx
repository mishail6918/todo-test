'use client';

import { useAuthStore } from '@/stores/useAuthStore';
import Header from '@/components/Header';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated === false) router.push('/');
  }, [isAuthenticated, router]);

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/list/');
    }
  }, [isAuthenticated, router]);

  return (
    <>
      {isAuthenticated && <Header />}
      <div className="container">{children}</div>
    </>
  );
}
