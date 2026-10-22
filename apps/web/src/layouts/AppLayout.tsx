import { Outlet, Link, NavLink } from 'react-router-dom';

export function AppLayout() {
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
            <button
              disabled
              title="GitHub integration coming in M2"
              className="text-sm font-medium bg-gray-900 text-white px-3 py-1.5 rounded-md opacity-50 cursor-not-allowed"
            >
              Connect GitHub
            </button>
          </nav>
        </div>
      </header>
      <main className="max-w-5xl mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
}
