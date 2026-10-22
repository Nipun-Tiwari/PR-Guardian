import { useRouteError, Link } from 'react-router-dom';
import { ApiError } from '../api/client.js';
import { ErrorDisplay } from '../components/ErrorDisplay.js';

export function ErrorPage() {
  const error = useRouteError();
  const displayError =
    error instanceof Error ? error : new Error('An unexpected navigation error occurred');

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Page Error</h1>
        <ErrorDisplay error={displayError instanceof ApiError ? displayError : displayError} />
        <Link to="/" className="mt-4 inline-block text-sm text-blue-600 hover:underline">
          ← Back to home
        </Link>
      </div>
    </div>
  );
}
