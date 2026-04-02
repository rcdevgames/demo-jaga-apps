import { cn } from '../../api/utils'

/**
 * Input Atom Component
 * @param {Object} props
 * @param {string} props.type - 'text' | 'email' | 'password' | 'tel' | 'number'
 * @param {string} props.label - Label text
 * @param {string} props.error - Error message
 * @param {boolean} props.disabled - Disabled state
 * @param {React.ReactNode} props.leftIcon - Icon on the left
 * @param {React.ReactNode} props.rightIcon - Icon on the right
 * @param {string} props.className - Additional CSS classes
 */
export function Input({
  type = 'text',
  label,
  error,
  disabled = false,
  leftIcon,
  rightIcon,
  className,
  id,
  ...props
}) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-')
  
  const baseStyles = 'w-full bg-gray-800 border rounded-lg px-4 py-2.5 text-white placeholder-gray-500 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed'
  
  const errorStyles = error ? 'border-red-500 focus:ring-red-500' : 'border-gray-700'

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-gray-300 mb-1.5">
          {label}
        </label>
      )}
      <div className="relative">
        {leftIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
            {leftIcon}
          </div>
        )}
        <input
          id={inputId}
          type={type}
          className={cn(baseStyles, errorStyles, leftIcon && 'pl-10', rightIcon && 'pr-10', className)}
          disabled={disabled}
          {...props}
        />
        {rightIcon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
            {rightIcon}
          </div>
        )}
      </div>
      {error && (
        <p className="mt-1.5 text-sm text-red-500 flex items-center gap-1">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </p>
      )}
    </div>
  )
}

export default Input
