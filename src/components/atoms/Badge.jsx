import { cn } from '../../api/utils'

/**
 * Badge Atom Component
 * @param {Object} props
 * @param {string} props.variant - 'default' | 'success' | 'warning' | 'danger' | 'info'
 * @param {string} props.size - 'sm' | 'md'
 * @param {boolean} props.dot - Show dot indicator
 * @param {string} props.className - Additional CSS classes
 */
export function Badge({
  children,
  variant = 'default',
  size = 'md',
  dot = false,
  className,
  ...props
}) {
  const baseStyles = 'inline-flex items-center font-medium rounded-full'
  
  const variants = {
    default: 'bg-gray-700 text-gray-300',
    success: 'bg-green-900/50 text-green-400 border border-green-800',
    warning: 'bg-yellow-900/50 text-yellow-400 border border-yellow-800',
    danger: 'bg-red-900/50 text-red-400 border border-red-800',
    info: 'bg-blue-900/50 text-blue-400 border border-blue-800',
    live: 'bg-red-600 text-white animate-pulse'
  }
  
  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-xs'
  }

  return (
    <span
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {dot && (
        <span className={cn(
          'w-1.5 h-1.5 rounded-full mr-1.5',
          variant === 'success' ? 'bg-green-400' :
          variant === 'warning' ? 'bg-yellow-400' :
          variant === 'danger' ? 'bg-red-400' :
          variant === 'info' ? 'bg-blue-400' :
          variant === 'live' ? 'bg-white' :
          'bg-gray-400'
        )} />
      )}
      {children}
    </span>
  )
}

export default Badge
