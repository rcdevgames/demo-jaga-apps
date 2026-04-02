/**
 * Authentication Strategy Pattern
 * Handles different authentication methods (Email, WhatsApp, Phone)
 */

// Validation patterns
const PATTERNS = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^(\+62|62|0)8[1-9][0-9]{7,9}$/,
  whatsapp: /^(\+62|62|0)8[1-9][0-9]{7,9}$/
}

// Validation functions
export const validators = {
  email: (value) => {
    if (!value) return 'Email wajib diisi'
    if (!PATTERNS.email.test(value)) return 'Format email tidak valid'
    return null
  },
  
  phone: (value) => {
    if (!value) return 'Nomor telepon wajib diisi'
    const digits = value.replace(/\D/g, '')
    if (digits.length < 10) return 'Nomor telepon minimal 10 digit'
    if (!PATTERNS.phone.test(value.replace(/\D/g, '').startsWith('+') ? value : `+${value}`)) {
      return 'Format nomor telepon tidak valid'
    }
    return null
  },
  
  whatsapp: (value) => {
    if (!value) return 'Nomor WhatsApp wajib diisi'
    const digits = value.replace(/\D/g, '')
    if (digits.length < 10) return 'Nomor WhatsApp minimal 10 digit'
    return null
  },
  
  password: (value) => {
    if (!value) return 'Password wajib diisi'
    if (value.length < 6) return 'Password minimal 6 karakter'
    return null
  }
}

// Strategy implementations
const authStrategies = {
  email: async (credentials) => {
    // Simulate email authentication
    await new Promise(resolve => setTimeout(resolve, 500))
    
    const emailError = validators.email(credentials.email)
    const passwordError = validators.password(credentials.password)
    
    if (emailError || passwordError) {
      throw new Error(emailError || passwordError)
    }
    
    return {
      success: true,
      type: 'email',
      user: {
        email: credentials.email,
        name: credentials.email.split('@')[0]
      }
    }
  },
  
  whatsapp: async (credentials) => {
    // Simulate WhatsApp authentication (OTP flow)
    await new Promise(resolve => setTimeout(resolve, 500))
    
    const whatsappError = validators.whatsapp(credentials.phone)
    
    if (whatsappError) {
      throw new Error(whatsappError)
    }
    
    // In real app, this would send OTP via WhatsApp
    return {
      success: true,
      type: 'whatsapp',
      requiresOTP: true,
      phone: credentials.phone
    }
  },
  
  phone: async (credentials) => {
    // Simulate phone authentication (SMS OTP flow)
    await new Promise(resolve => setTimeout(resolve, 500))
    
    const phoneError = validators.phone(credentials.phone)
    
    if (phoneError) {
      throw new Error(phoneError)
    }
    
    // In real app, this would send OTP via SMS
    return {
      success: true,
      type: 'phone',
      requiresOTP: true,
      phone: credentials.phone
    }
  }
}

// Main authenticate function (Strategy Pattern)
export const authenticate = async (type, credentials) => {
  const strategy = authStrategies[type]
  
  if (!strategy) {
    throw new Error('Metode autentikasi tidak valid')
  }
  
  return await strategy(credentials)
}

// Detect input type automatically
export const detectInputType = (value) => {
  if (!value) return 'email'
  
  if (PATTERNS.email.test(value)) {
    return 'email'
  }
  
  const digits = value.replace(/\D/g, '')
  if (digits.length >= 10 && /^(\+62|62|0)8[1-9]/.test(value.replace(/\D/g, '').startsWith('+') ? value : `+${value}`)) {
    return 'phone'
  }
  
  return 'email'
}

// Format phone number for display
export const formatPhoneNumber = (value) => {
  const digits = value.replace(/\D/g, '')
  
  if (digits.startsWith('62')) {
    return `+${digits.slice(0, 2)} ${digits.slice(2, 4)} ${digits.slice(4, 8)} ${digits.slice(8, 12)}`
  }
  
  if (digits.startsWith('0')) {
    return `0${digits.slice(0, 1)} ${digits.slice(1, 3)} ${digits.slice(3, 7)} ${digits.slice(7, 11)}`
  }
  
  return digits
}

export default {
  authenticate,
  validators,
  detectInputType,
  formatPhoneNumber
}
