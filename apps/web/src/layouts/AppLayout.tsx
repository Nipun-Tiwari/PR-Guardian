import { Outlet, Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.js';
import { logout } from '../api/auth.js';

const API_BASE = import.meta.env['VITE_API_BASE_URL'] ?? '';

export function AppLayout() {
  const { user, loading, refetch } = useAuth();

  async function handleLogout() {
    try {
      await logout();
    } finally {
      refetch();
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-xl font-bold text-gray-900">PR Guardian</span>
            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium">
              Beta
            </span>
          </Link>
          <nav className="flex items-center gap-4">
            <NavLink
              to="/demo"
              className={({ isActive }) =>
                `text-sm font-medium ${isActive ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'}`
              }
            >
              Demo
            </NavLink>

            {loading ? (
              <div className="w-24 h-8 bg-gray-100 rounded-md animate-pulse" />
            ) : user ? (
              <div className="flex items-center gap-3">
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) =>
                    `text-sm font-medium ${isActive ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'}`
                  }
                >
                  Dashboard
                </NavLink>
                <span className="text-sm text-gray-500">@{user.githubUsername}</span>
                <button
                  onClick={() => void handleLogout()}
                  className="text-sm font-medium text-gray-600 hover:text-gray-900 border border-gray-300 px-3 py-1.5 rounded-md hover:bg-gray-50 transition-colors"
                >
                  Sign out
                </button>
              </div>
            ) : (
              // Use href (not <Link>) — triggers full navigation to the API OAuth endpoint
              <a
                href={`${API_BASE}/api/v1/auth/github`}
                className="text-sm font-medium bg-gray-900 text-white px-3 py-1.5 rounded-md hover:bg-gray-700 transition-colors"
              >
                Connect GitHub
              </a>
            )}
          </nav>
        </div>
      </header>
      <main className="max-w-5xl mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
}
