import { cn } from '../../api/utils'

/**
 * Toggle Molecule Component
 * iOS-style toggle switch
 */
export function Toggle({
  enabled,
  onChange,
  label,
  description,
  disabled = false,
  className
}) {
  return (
    <motion.div
      className={cn(
        'flex items-center justify-between py-3',
        disabled && 'opacity-50',
        className
      )}
      whileTap={disabled ? {} : { scale: 0.98 }}
    >
      <div className="flex-1">
        {label && (
          <span className="text-sm font-medium text-white">{label}</span>
        )}
        {description && (
          <p className="text-xs text-gray-500 mt-0.5">{description}</p>
        )}
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={enabled}
        disabled={disabled}
        onClick={() => !disabled && onChange?.(!enabled)}
        className={cn(
          'relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-black',
          enabled ? 'bg-blue-600' : 'bg-gray-700',
          disabled && 'cursor-not-allowed'
        )}
      >
        <span
          className={cn(
            'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
            enabled ? 'translate-x-5' : 'translate-x-0'
          )}
        />
      </button>
    </motion.div>
  )
}

export default Toggle
