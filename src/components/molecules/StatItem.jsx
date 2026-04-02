import { cn } from '../../api/utils'

/**
 * StatItem Molecule Component
 * Displays a single statistic with icon and label
 */
export function StatItem({
  icon: Icon,
  label,
  value,
  subValue,
  color = 'blue',
  className
}) {
  const colors = {
    blue: 'bg-blue-900/30 text-blue-400 border-blue-800',
    green: 'bg-green-900/30 text-green-400 border-green-800',
    yellow: 'bg-yellow-900/30 text-yellow-400 border-yellow-800',
    red: 'bg-red-900/30 text-red-400 border-red-800',
    gray: 'bg-gray-800 text-gray-400 border-gray-700'
  }

  return (
    <div className={cn(
      'flex flex-col items-center justify-center p-4 rounded-xl border',
      colors[color],
      className
    )}>
      {Icon && (
        <div className={cn('mb-2', colors[color].split(' ')[1])}>
          <Icon size={24} />
        </div>
      )}
      <span className="text-2xl font-bold text-white">{value}</span>
      <span className="text-xs text-gray-400 mt-1">{label}</span>
      {subValue && (
        <span className="text-xs text-gray-500 mt-0.5">{subValue}</span>
      )}
    </div>
  )
}

export default StatItem
