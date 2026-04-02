import { cn } from '../../api/utils'
import { motion } from 'framer-motion'

/**
 * TabBar Molecule Component
 * Horizontal tab navigation
 */
export function TabBar({
  tabs,
  activeTab,
  onChange,
  className
}) {
  return (
    <div className={cn('flex border-b border-gray-800', className)}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange?.(tab.id)}
          className={cn(
            'flex-1 px-4 py-3 text-sm font-medium transition-colors relative',
            activeTab === tab.id
              ? 'text-white'
              : 'text-gray-500 hover:text-gray-300'
          )}
        >
          {tab.icon && (
            <span className="flex items-center justify-center gap-2">
              <tab.icon size={18} />
              {tab.label}
            </span>
          )}
          {!tab.icon && tab.label}
          {activeTab === tab.id && (
            <motion.div
              layoutId="activeTab"
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            />
          )}
        </button>
      ))}
    </div>
  )
}

export default TabBar
