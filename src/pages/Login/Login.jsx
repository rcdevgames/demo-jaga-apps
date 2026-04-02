import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Mail, Lock, Shield, Smartphone, MessageCircle } from 'lucide-react'
import { AuthLayout } from '../../components/templates/Layout'
import { Button } from '../../components/atoms/Button'
import { FormField } from '../../components/molecules/FormField'
import { Badge } from '../../components/atoms/Badge'
import { useAuthStore } from '../../store/authStore'
import { validators } from '../../api/authService'
import { cn } from '../../api/utils'

// Shake animation variant for error state
const shakeAnimation = {
  x: [-10, 10, -10, 10, 0],
  transition: { duration: 0.4 }
}

// Login method tabs
const loginMethods = [
  { id: 'email', label: 'Email', icon: Mail },
  { id: 'whatsapp', label: 'WhatsApp', icon: MessageCircle },
  { id: 'phone', label: 'Telepon', icon: Smartphone }
]

export default function Login() {
  const navigate = useNavigate()
  const { login, isLoading, error, clearError } = useAuthStore()
  
  const [method, setMethod] = useState('email')
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    password: ''
  })
  const [errors, setErrors] = useState({})
  const [hasError, setHasError] = useState(false)

  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    clearError()
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const validate = () => {
    const newErrors = {}
    
    if (method === 'email') {
      const emailError = validators.email(formData.email)
      if (emailError) newErrors.email = emailError
      const passwordError = validators.password(formData.password)
      if (passwordError) newErrors.password = passwordError
    } else {
      const validator = method === 'whatsapp' ? validators.whatsapp : validators.phone
      const phoneError = validator(formData.phone)
      if (phoneError) newErrors.phone = phoneError
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setHasError(false)

    if (!validate()) {
      setHasError(true)
      return
    }

    const credentials = method === 'email' 
      ? { email: formData.email, password: formData.password }
      : { phone: formData.phone }

    const result = await login(credentials)

    if (result.success) {
      navigate('/')
    } else {
      setHasError(true)
    }
  }

  const CurrentIcon = loginMethods.find(m => m.id === method)?.icon || Mail

  return (
    <AuthLayout>
      {/* Logo & Header */}
      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-20 h-20 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4"
        >
          <Shield size={40} className="text-white" />
        </motion.div>
        <h1 className="text-2xl font-bold text-white">MobileJaga</h1>
        <p className="text-gray-400 text-sm mt-1">
          Platform monitoring keamanan terpusat
        </p>
      </div>

      {/* Login Method Tabs */}
      <div className="flex gap-2 mb-6">
        {loginMethods.map((m) => {
          const Icon = m.icon
          return (
            <button
              key={m.id}
              onClick={() => {
                setMethod(m.id)
                clearError()
                setErrors({})
              }}
              className={cn(
                'flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-colors',
                method === m.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              )}
            >
              <Icon size={16} />
              {m.label}
            </button>
          )
        })}
      </div>

      {/* Login Form */}
      <motion.form
        key={method}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <AnimatePresence>
          {method === 'email' ? (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <FormField
                  type="email"
                  label="Email"
                  placeholder="nama@email.com"
                  value={formData.email}
                  onChange={(e) => updateFormData('email', e.target.value)}
                  error={errors.email}
                  validate={validators.email}
                  leftIcon={<Mail size={18} />}
                  disabled={isLoading}
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <FormField
                  type="password"
                  label="Password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => updateFormData('password', e.target.value)}
                  error={errors.password}
                  validate={validators.password}
                  showPasswordToggle
                  leftIcon={<Lock size={18} />}
                  disabled={isLoading}
                />
              </motion.div>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <FormField
                type="tel"
                label={method === 'whatsapp' ? 'Nomor WhatsApp' : 'Nomor Telepon'}
                placeholder={method === 'whatsapp' ? '08xx-xxxx-xxxx' : '08xx-xxxx-xxxx'}
                value={formData.phone}
                onChange={(e) => updateFormData('phone', e.target.value)}
                error={errors.phone}
                validate={method === 'whatsapp' ? validators.whatsapp : validators.phone}
                leftIcon={method === 'whatsapp' ? <MessageCircle size={18} /> : <Smartphone size={18} />}
                disabled={isLoading}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Demo Mode Info */}
        {method === 'email' && (
          <div className="bg-gray-800/50 rounded-lg p-3 text-xs text-gray-400">
            <p className="font-medium text-gray-300 mb-1">Demo Mode:</p>
            <p>Email: rizki@mobilejaga.id</p>
            <p>Password: password123</p>
          </div>
        )}

        {/* Submit Button with Shake Animation on Error */}
        <motion.div
          animate={hasError ? shakeAnimation : {}}
        >
          <Button
            type="submit"
            variant="primary"
            size="lg"
            isLoading={isLoading}
            className="w-full"
          >
            {method === 'email' ? 'Masuk' : 'Kirim Kode OTP'}
          </Button>
        </motion.div>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-900/30 border border-red-800 rounded-lg p-3 text-sm text-red-400 text-center"
          >
            {error}
          </motion.div>
        )}
      </motion.form>

      {/* Footer Links */}
      <div className="mt-8 text-center space-y-4">
        <p className="text-sm text-gray-500">
          Dengan masuk, Anda menyetujui{' '}
          <a href="#" className="text-blue-500 hover:underline">Syarat & Ketentuan</a>
        </p>
      </div>
    </AuthLayout>
  )
}
