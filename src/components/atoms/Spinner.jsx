import { cn } from '../../api/utils'

/**
 * Spinner Atom Component
 * @param {Object} props
 * @param {string} props.size - 'sm' | 'md' | 'lg'
 * @param {string} props.color - Color of the spinner
 * @param {string} props.className - Additional CSS classes
 */
export function Spinner({
  size = 'md',
  color = 'blue',
  className,
  ...props
}) {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  }
  
  const colors = {
    blue: 'text-blue-600',
    white: 'text-white',
    gray: 'text-gray-400'
  }

  return (
    <svg
      className={cn('animate-spin', sizes[size], colors[color], className)}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      {...props}
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  )
}

/**
 * LoadingOverlay Component
 * Full screen loading overlay
 */
export function LoadingOverlay({ message = 'Memuat...' }) {
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="text-center">
        <Spinner size="lg" color="white" className="mx-auto mb-4" />
        <p className="text-white text-sm">{message}</p>
      </div>
    </div>
  )
}

export default Spinner
