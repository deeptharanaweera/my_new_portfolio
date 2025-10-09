'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginPage() {
  const router = useRouter();
  const { user, initializing, signIn, signOut } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // If already authenticated, don't auto-redirect. Offer actions instead.
  if (!initializing && user) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-6">
        <div className="w-full max-w-md bg-card border border-border rounded-2xl shadow-xl p-8 text-center">
          <h1 className="text-2xl font-bold mb-2">You're already signed in</h1>
          <p className="text-sm text-muted-foreground mb-6">Go to the admin dashboard or sign out to switch accounts.</p>
          <div className="flex gap-3">
            <button
              onClick={() => router.replace('/admin')}
              className="flex-1 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition"
            >
              Go to Admin
            </button>
            <button
              onClick={async () => { await signOut(); }}
              className="flex-1 px-4 py-2 rounded-lg border border-border hover:bg-muted transition"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await signIn(email, password);
      router.replace('/admin');
    } catch (err) {
      setError('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-card border border-border rounded-2xl shadow-xl p-8">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold mb-1">Admin Login</h1>
          <p className="text-sm text-muted-foreground">Sign in to manage your portfolio</p>
        </div>

        {error && (
          <div className="mb-4 px-4 py-3 rounded-lg bg-red-500 text-white text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 rounded-lg bg-background border border-input focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 rounded-lg bg-background border border-input focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-medium hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}


