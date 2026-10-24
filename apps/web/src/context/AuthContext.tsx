import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { AuthUser } from '../api/auth.js';
import { getMe } from '../api/auth.js';

interface AuthState {
  user: AuthUser | null;
  loading: boolean;
  error: Error | null;
  refetch: () => void;
}

const AuthContext = createContext<AuthState | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [fetchCount, setFetchCount] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    getMe()
      .then((u) => {
        if (!cancelled) {
          setUser(u);
          setLoading(false);
        }
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setError(err instanceof Error ? err : new Error(String(err)));
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [fetchCount]);

  function refetch() {
    setFetchCount((c) => c + 1);
  }

  return (
    <AuthContext.Provider value={{ user, loading, error, refetch }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthState {
  const ctx = useContext(AuthContext);
  if (ctx === undefined) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
