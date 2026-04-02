import { useState } from 'react'
import { Input } from '../atoms/Input'
import { Eye, EyeOff } from 'lucide-react'

/**
 * FormField Molecule Component
 * Combines Input with validation and optional password toggle
 */
export function FormField({
  type = 'text',
  label,
  value,
  onChange,
  onBlur,
  error,
  validate,
  placeholder,
  disabled = false,
  showPasswordToggle = false,
  leftIcon,
  className
}) {
  const [showPassword, setShowPassword] = useState(false)
  const [touched, setTouched] = useState(false)
  const [localError, setLocalError] = useState('')

  const handleChange = (e) => {
    const newValue = e.target.value
    onChange?.(e)
    
    if (validate && touched) {
      const validationError = validate(newValue)
      setLocalError(validationError || '')
    }
  }

  const handleBlur = (e) => {
    setTouched(true)
    onBlur?.(e)
    
    if (validate) {
      const validationError = validate(e.target.value)
      setLocalError(validationError || '')
    }
  }

  const displayError = error || localError

  return (
    <Input
      type={showPasswordToggle && showPassword ? 'text' : type}
      label={label}
      value={value}
      onChange={handleChange}
      onBlur={handleBlur}
      error={displayError}
      disabled={disabled}
      placeholder={placeholder}
      leftIcon={leftIcon}
      rightIcon={showPasswordToggle ? (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="hover:text-gray-300 transition-colors focus:outline-none"
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      ) : undefined}
      className={className}
    />
  )
}

export default FormField
