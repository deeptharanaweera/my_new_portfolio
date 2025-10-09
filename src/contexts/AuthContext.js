'use client';

import { auth } from '@/lib/firebase';
import {
    signOut as firebaseSignOut,
    onAuthStateChanged,
    signInWithEmailAndPassword,
} from 'firebase/auth';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setInitializing(false);
    });
    return () => unsub();
  }, []);

  const signIn = async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const signOut = async () => {
    await firebaseSignOut(auth);
  };

  const value = useMemo(() => ({ user, initializing, signIn, signOut }), [user, initializing]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};


