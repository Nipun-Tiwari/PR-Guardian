import { Link } from 'react-router-dom';

export function LandingPage() {
  return (
    <div className="max-w-2xl mx-auto text-center py-16">
      <div className="mb-4">
        <span className="text-xs font-medium bg-yellow-100 text-yellow-800 border border-yellow-200 px-3 py-1 rounded-full">
          Sample data — not a real review
        </span>
      </div>

      <h1 className="text-4xl font-bold text-gray-900 mb-4">
        AI-powered code review for every pull request
      </h1>
      <p className="text-lg text-gray-600 mb-8 leading-relaxed">
        PR Guardian combines static analysis and LLM-generated insights to surface security issues,
        bugs, and code quality problems — automatically, on every PR.
      </p>

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link
          to="/demo"
          className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
        >
          View Sample Review →
        </Link>
        <button
          disabled
          title="GitHub integration coming in M2"
          className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-500 font-medium rounded-lg cursor-not-allowed opacity-60"
        >
          Connect GitHub (Coming Soon)
        </button>
      </div>

      <div className="mt-16 grid grid-cols-3 gap-6 text-left">
        <div className="p-4 rounded-lg border border-gray-200 bg-white">
          <div className="text-2xl mb-2">🔍</div>
          <h3 className="font-semibold text-gray-900 mb-1">Static Analysis</h3>
          <p className="text-sm text-gray-600">
            ESLint and Semgrep rules surface security patterns and common bugs
          </p>
        </div>
        <div className="p-4 rounded-lg border border-gray-200 bg-white">
          <div className="text-2xl mb-2">🤖</div>
          <h3 className="font-semibold text-gray-900 mb-1">AI Review</h3>
          <p className="text-sm text-gray-600">
            LLM-generated explanations with specific recommendations and test suggestions
          </p>
        </div>
        <div className="p-4 rounded-lg border border-gray-200 bg-white">
          <div className="text-2xl mb-2">📊</div>
          <h3 className="font-semibold text-gray-900 mb-1">Dashboard</h3>
          <p className="text-sm text-gray-600">
            Severity distribution, filtering by category, and shareable finding links
          </p>
        </div>
      </div>
    </div>
  );
}
