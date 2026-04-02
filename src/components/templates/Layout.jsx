import { BottomNav } from '../organisms/Navbar'
import { cn } from '../../api/utils'

/**
 * MainLayout Template
 * Standard layout for authenticated pages with bottom navigation
 */
export function MainLayout({ children, className, showNav = true }) {
  return (
    <div className="min-h-screen bg-black pb-20">
      <main className={cn('max-w-lg mx-auto', className)}>
        {children}
      </main>
      {showNav && <BottomNav />}
    </div>
  )
}

/**
 * AuthLayout Template
 * Layout for authentication pages (login, register, etc.)
 */
export function AuthLayout({ children }) {
  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 via-transparent to-transparent pointer-events-none" />
      
      <main className="flex-1 flex flex-col px-6 py-12 relative z-10">
        {children}
      </main>

      {/* Footer */}
      <footer className="py-6 text-center text-xs text-gray-600">
        <p>© 2026 MobileJaga. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default MainLayout
