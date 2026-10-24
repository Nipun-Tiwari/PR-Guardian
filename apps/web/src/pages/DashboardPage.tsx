import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext.js';
import { getRepositories, type RepositoryV1 } from '../api/repositories.js';
import { ApiError } from '../api/client.js';
import { ErrorDisplay } from '../components/ErrorDisplay.js';
import { LoadingCard } from '../components/LoadingSkeleton.js';

const GITHUB_APP_NAME = import.meta.env['VITE_GITHUB_APP_NAME'] ?? '';

export function DashboardPage() {
  const { user } = useAuth();
  const [repos, setRepos] = useState<RepositoryV1[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ApiError | Error | null>(null);

  useEffect(() => {
    setLoading(true);
    getRepositories()
      .then((data) => {
        setRepos(data.repositories);
        setLoading(false);
      })
      .catch((err: unknown) => {
        setError(err instanceof Error ? err : new Error(String(err)));
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome, <span className="text-blue-600">@{user?.githubUsername}</span>
        </h1>
        <p className="text-sm text-gray-500 mt-1">Your connected repositories</p>
      </div>

      {loading && (
        <div className="space-y-3">
          <LoadingCard />
          <LoadingCard />
        </div>
      )}

      {error && <ErrorDisplay error={error} />}

      {!loading && !error && repos !== null && repos.length === 0 && (
        <div className="rounded-lg border-2 border-dashed border-gray-200 bg-white p-12 text-center">
          <div className="text-4xl mb-4">🔌</div>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            No repositories connected yet
          </h2>
          <p className="text-sm text-gray-600 mb-6 max-w-sm mx-auto">
            Install the PR Guardian GitHub App on a repository to start getting automated code
            reviews.
          </p>
          {GITHUB_APP_NAME ? (
            <a
              href={`https://github.com/apps/${GITHUB_APP_NAME}/installations/new`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors"
            >
              Install GitHub App
            </a>
          ) : (
            <p className="text-xs text-gray-400">
              Set <code className="bg-gray-100 px-1 rounded">VITE_GITHUB_APP_NAME</code> in your
              .env to enable the install link.
            </p>
          )}
        </div>
      )}

      {!loading && !error && repos !== null && repos.length > 0 && (
        <div className="space-y-3">
          {repos.map((repo) => (
            <div
              key={repo.id}
              className="rounded-lg border border-gray-200 bg-white p-4 flex items-center justify-between"
            >
              <div>
                <p className="font-medium text-gray-900">{repo.fullName}</p>
                <p className="text-xs text-gray-400 mt-0.5">Connected</p>
              </div>
              <span className="text-xs bg-green-100 text-green-800 border border-green-200 px-2 py-0.5 rounded-full">
                Active
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
