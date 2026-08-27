import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center text-center">
      <h1 className="text-4xl font-bold text-slate-900">404</h1>
      <p className="mt-2 text-sm text-slate-500">Page not found</p>
      <Link
        to="/"
        className="mt-4 rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-800"
      >
        Back to Home
      </Link>
    </div>
  );
}
