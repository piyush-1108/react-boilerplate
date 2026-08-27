import { Menu } from 'lucide-react';

export default function Header({ mobileOpen, setMobileOpen }) {
  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-6">
      {/* Mobile menu trigger & Left Section */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle mobile menu"
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>
        <h2 className="text-sm font-semibold text-slate-700">App Header</h2>
      </div>

      {/* Right Section Placeholder */}
      <div className="flex items-center gap-3">
        {/* Placeholder for actions, search, notifications, or profile */}
      </div>
    </header>
  );
}
