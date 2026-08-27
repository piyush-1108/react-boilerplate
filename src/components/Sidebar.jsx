import { NavLink } from 'react-router-dom';
import { 
  Home, 
  LayoutDashboard, 
  Info, 
  Settings, 
  ChevronLeft, 
  ChevronRight, 
  X 
} from 'lucide-react';

const navigation = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'About', href: '/about', icon: Info },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export default function Sidebar({
  mobileOpen,
  setMobileOpen,
  collapsed,
  setCollapsed
}) {
  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
        />
      )}

      {/* Sidebar Shell */}
      <aside
        className={`
          fixed top-0 bottom-0 left-0 z-50 flex flex-col border-r border-slate-200 bg-white transition-all duration-200
          lg:static lg:z-auto
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          ${collapsed ? 'lg:w-16' : 'lg:w-60'}
          w-60
        `}
      >
        {/* Brand / Logo Header */}
        <div className="flex h-16 items-center justify-between border-b border-slate-200 px-4">
          {(!collapsed || mobileOpen) && (
            <span className="font-bold text-slate-900 text-sm">App Logo</span>
          )}
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            aria-label="Close mobile sidebar"
            className="rounded-lg p-1 text-slate-500 hover:bg-slate-100 lg:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 space-y-1 p-3">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.name}
                to={item.href}
                end={item.href === '/'}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) => `
                  flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors
                  ${
                    isActive
                      ? 'bg-slate-100 text-slate-900 font-semibold'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }
                  ${collapsed && !mobileOpen ? 'justify-center px-2' : ''}
                `}
                title={collapsed && !mobileOpen ? item.name : undefined}
              >
                <Icon className="h-5 w-5 shrink-0" />
                {(!collapsed || mobileOpen) && <span>{item.name}</span>}
              </NavLink>
            );
          })}
        </nav>

        {/* Desktop Collapse Toggle */}
        <div className="hidden lg:flex border-t border-slate-200 p-3 justify-end">
          <button
            type="button"
            onClick={() => setCollapsed(!collapsed)}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            className="rounded-lg border border-slate-200 p-1.5 text-slate-500 hover:bg-slate-100"
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </button>
        </div>
      </aside>
    </>
  );
}
