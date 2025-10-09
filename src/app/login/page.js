'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginPage() {
  const router = useRouter();
  const { user, initializing, signIn, signUp, signOut } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  // If already authenticated, don't auto-redirect. Offer actions instead.
  if (!initializing && user) {
    return (
      <div 
        className="min-h-screen text-foreground flex items-center justify-center px-6 relative"
        style={{
          backgroundImage: 'url(/login_bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Overlay for better readability */}
        <div className="absolute inset-0 bg-black/40"></div>
        
        <div className="w-full max-w-md bg-card/95 backdrop-blur-sm border border-border rounded-2xl shadow-xl p-8 text-center relative z-10">
          <h1 className="text-2xl font-bold mb-2">You&apos;re already signed in</h1>
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
      if (isSignUp) {
        if (password !== confirmPassword) {
          setError('Passwords do not match');
          return;
        }
        if (password.length < 6) {
          setError('Password must be at least 6 characters');
          return;
        }
        await signUp(email, password);
      } else {
        await signIn(email, password);
      }
      router.replace('/admin');
    } catch (err) {
      if (isSignUp) {
        setError(err.message || 'Failed to create account');
      } else {
        setError('Invalid email or password');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="min-h-screen text-foreground flex items-center justify-center px-6 relative"
      style={{
        backgroundImage: 'url(/login_bg.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Overlay for better readability */}
      <div className="absolute inset-0 bg-black/40"></div>
      
      <div className="w-full max-w-md bg-card/95 backdrop-blur-sm border border-border rounded-2xl shadow-xl p-8 relative z-10">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold mb-1">
            {isSignUp ? 'Create Account' : 'Admin Login'}
          </h1>
          <p className="text-sm text-muted-foreground">
            {isSignUp ? 'Sign up to manage your portfolio' : 'Sign in to manage your portfolio'}
          </p>
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
          
          {isSignUp && (
            <div>
              <label className="block text-sm mb-1">Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full px-4 py-2 rounded-lg bg-background border border-input focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="••••••••"
              />
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-medium hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? (isSignUp ? 'Creating account...' : 'Signing in...') : (isSignUp ? 'Create Account' : 'Sign In')}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={() => {
              setIsSignUp(!isSignUp);
              setError(null);
              setEmail('');
              setPassword('');
              setConfirmPassword('');
            }}
            className="text-sm text-primary hover:underline"
          >
            {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
          </button>
        </div>
      </div>
    </div>
  );
}


