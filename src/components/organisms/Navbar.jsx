import { Link, useLocation } from 'react-router-dom'
import { Home, Video, Bell, Settings, Shield } from 'lucide-react'
import { cn } from '../../api/utils'

/**
 * BottomNav Organism Component
 * Main navigation bar for mobile
 */
export function BottomNav() {
  const location = useLocation()

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/cameras', icon: Video, label: 'Kamera' },
    { path: '/alerts', icon: Bell, label: 'Peringatan', badge: true },
    { path: '/settings', icon: Settings, label: 'Settings' }
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-gray-900/95 backdrop-blur-lg border-t border-gray-800 safe-area-bottom z-40">
      <div className="flex justify-around items-center py-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path
          const Icon = item.icon

          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                'relative flex flex-col items-center justify-center px-4 py-1 rounded-lg transition-colors',
                isActive ? 'text-blue-500' : 'text-gray-500 hover:text-gray-300'
              )}
            >
              <div className="relative">
                <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                {item.badge && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    !
                  </span>
                )}
              </div>
              <span className="text-xs mt-1">{item.label}</span>
              {isActive && (
                <span className="absolute bottom-0 w-1 h-1 bg-blue-500 rounded-full" />
              )}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}

/**
 * Header Organism Component
 * Top header with title and actions
 */
export function Header({
  title,
  subtitle,
  leftAction,
  rightAction,
  className
}) {
  return (
    <header className={cn('sticky top-0 z-30 bg-black/80 backdrop-blur-lg border-b border-gray-800 px-4 py-3', className)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {leftAction}
          <div>
            <h1 className="text-lg font-semibold text-white">{title}</h1>
            {subtitle && (
              <p className="text-xs text-gray-500">{subtitle}</p>
            )}
          </div>
        </div>
        {rightAction}
      </div>
    </header>
  )
}

/**
 * ArmedToggle Organism Component
 * Security system armed/disarmed toggle
 */
export function ArmedToggle({ armed, onToggle }) {
  return (
    <div className="flex items-center gap-3 bg-gray-900 rounded-full px-4 py-2 border border-gray-800">
      <div className={cn(
        'w-2 h-2 rounded-full',
        armed ? 'bg-green-500 animate-pulse' : 'bg-red-500'
      )} />
      <span className="text-sm font-medium text-white">
        {armed ? 'Armed' : 'Disarmed'}
      </span>
      <button
        onClick={onToggle}
        className={cn(
          'relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900',
          armed ? 'bg-green-600 focus:ring-green-600' : 'bg-red-600 focus:ring-red-600'
        )}
      >
        <span
          className={cn(
            'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
            armed ? 'translate-x-5' : 'translate-x-0'
          )}
        />
      </button>
    </div>
  )
}

export default BottomNav
