import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider, useAuth } from '../src/context/AuthContext.js';
import { RequireAuth } from '../src/components/RequireAuth.js';

vi.mock('../src/api/auth.js', () => ({
  getMe: vi.fn(),
  logout: vi.fn(),
}));

const { getMe } = await import('../src/api/auth.js');

function TestConsumer() {
  const { user, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  if (!user) return <div>Not signed in</div>;
  return <div>Signed in as {user.githubUsername}</div>;
}

beforeEach(() => {
  vi.clearAllMocks();
});

describe('AuthContext', () => {
  it('shows loading initially', () => {
    vi.mocked(getMe).mockReturnValue(new Promise(() => undefined)); // never resolves
    render(
      <MemoryRouter>
        <AuthProvider>
          <TestConsumer />
        </AuthProvider>
      </MemoryRouter>,
    );
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('shows user when getMe resolves with a user', async () => {
    vi.mocked(getMe).mockResolvedValue({
      id: 'user-1',
      githubUserId: '12345',
      githubUsername: 'nipun',
    });
    render(
      <MemoryRouter>
        <AuthProvider>
          <TestConsumer />
        </AuthProvider>
      </MemoryRouter>,
    );
    expect(await screen.findByText('Signed in as nipun')).toBeInTheDocument();
  });

  it('shows not signed in when getMe returns null', async () => {
    vi.mocked(getMe).mockResolvedValue(null);
    render(
      <MemoryRouter>
        <AuthProvider>
          <TestConsumer />
        </AuthProvider>
      </MemoryRouter>,
    );
    expect(await screen.findByText('Not signed in')).toBeInTheDocument();
  });
});

describe('RequireAuth', () => {
  it('redirects to / when not authenticated', async () => {
    vi.mocked(getMe).mockResolvedValue(null);
    render(
      <MemoryRouter initialEntries={['/dashboard']}>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<div>Home</div>} />
            <Route
              path="/dashboard"
              element={
                <RequireAuth>
                  <div>Dashboard</div>
                </RequireAuth>
              }
            />
          </Routes>
        </AuthProvider>
      </MemoryRouter>,
    );
    await waitFor(() => {
      expect(screen.getByText('Home')).toBeInTheDocument();
    });
  });

  it('renders children when authenticated', async () => {
    vi.mocked(getMe).mockResolvedValue({
      id: 'user-1',
      githubUserId: '12345',
      githubUsername: 'nipun',
    });
    render(
      <MemoryRouter initialEntries={['/dashboard']}>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<div>Home</div>} />
            <Route
              path="/dashboard"
              element={
                <RequireAuth>
                  <div>Dashboard</div>
                </RequireAuth>
              }
            />
          </Routes>
        </AuthProvider>
      </MemoryRouter>,
    );
    expect(await screen.findByText('Dashboard')).toBeInTheDocument();
  });
});
