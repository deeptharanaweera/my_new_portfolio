'use client';

import AdminDashboard from '@/components/admin/AdminDashboard';
import { useAuth } from '@/contexts/AuthContext';
import Footer from '@/components/admin/Footer';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AdminPage() {
  const router = useRouter();
  const { user, initializing } = useAuth();

  useEffect(() => {
    if (!initializing && !user) {
      router.replace('/login');
    }
  }, [user, initializing, router]);

  if (initializing) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Checking authentication...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <>
      <AdminDashboard />
      <Footer />
    </>
  );
}
