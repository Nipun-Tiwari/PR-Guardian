import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.js';

export function AuthCallbackPage() {
  const navigate = useNavigate();
  const { user, loading, refetch } = useAuth();

  // Re-check session after OAuth redirect brings us here
  // refetch intentionally omitted from deps — we only want this to run once on mount
  useEffect(() => {
    refetch();
  }, []); // eslint-disable-line

  useEffect(() => {
    if (!loading) {
      void navigate(user ? '/dashboard' : '/', { replace: true });
    }
  }, [loading, user, navigate]);

  return (
    <div className="flex items-center justify-center py-16">
      <div className="text-center">
        <div className="animate-pulse text-gray-500 text-sm">Completing sign in...</div>
      </div>
    </div>
  );
}
