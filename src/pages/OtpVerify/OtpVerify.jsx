import { useEffect, useMemo, useRef, useState } from 'react'
import { ArrowLeft, MessageCircle, Smartphone, Shield } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { AuthLayout } from '../../components/templates/Layout'
import { Button } from '../../components/atoms/Button'
import { useAuthStore } from '../../store/authStore'

const OTP_LENGTH = 6
const RESEND_SECONDS = 30

export default function OtpVerify() {
  const navigate = useNavigate()
  const { pendingOtp, verifyOtp, requestOtp, isLoading, error, clearError } = useAuthStore()

  const [otpDigits, setOtpDigits] = useState(Array(OTP_LENGTH).fill(''))
  const [secondsLeft, setSecondsLeft] = useState(RESEND_SECONDS)
  const inputRefs = useRef([])

  useEffect(() => {
    if (!pendingOtp) {
      navigate('/login', { replace: true })
    }
  }, [pendingOtp, navigate])

  useEffect(() => {
    if (secondsLeft <= 0) {
      return
    }

    const timer = window.setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)

    return () => {
      window.clearInterval(timer)
    }
  }, [secondsLeft])

  const otpValue = useMemo(() => otpDigits.join(''), [otpDigits])
  const canSubmit = otpValue.length === OTP_LENGTH
  const canResend = secondsLeft === 0 && !isLoading

  const handleChange = (index, nextValue) => {
    const digit = nextValue.replace(/\D/g, '').slice(-1)
    const nextDigits = [...otpDigits]
    nextDigits[index] = digit
    setOtpDigits(nextDigits)
    clearError()

    if (digit && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index, event) => {
    if (event.key === 'Backspace' && !otpDigits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }

    if (event.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }

    if (event.key === 'ArrowRight' && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handlePaste = (event) => {
    event.preventDefault()
    const pasted = event.clipboardData.getData('text').replace(/\D/g, '').slice(0, OTP_LENGTH)
    if (!pasted) {
      return
    }

    const nextDigits = Array(OTP_LENGTH).fill('')
    pasted.split('').forEach((digit, idx) => {
      nextDigits[idx] = digit
    })
    setOtpDigits(nextDigits)

    const focusIndex = Math.min(pasted.length, OTP_LENGTH - 1)
    inputRefs.current[focusIndex]?.focus()
    clearError()
  }

  const handleVerify = async (event) => {
    event.preventDefault()
    if (!pendingOtp || !canSubmit) {
      return
    }

    const result = await verifyOtp({
      phone: pendingOtp.phone,
      otp: otpValue
    })

    if (result.success) {
      navigate('/', { replace: true })
    }
  }

  const handleResend = async () => {
    if (!pendingOtp || !canResend) {
      return
    }

    const result = await requestOtp({
      phone: pendingOtp.phone,
      method: pendingOtp.method
    })

    if (result.success) {
      setOtpDigits(Array(OTP_LENGTH).fill(''))
      setSecondsLeft(RESEND_SECONDS)
      inputRefs.current[0]?.focus()
    }
  }

  const methodLabel = pendingOtp?.method === 'whatsapp' ? 'WhatsApp' : 'SMS'
  const MethodIcon = pendingOtp?.method === 'whatsapp' ? MessageCircle : Smartphone

  return (
    <AuthLayout>
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Shield size={40} className="text-white" />
        </div>
        <h1 className="text-2xl font-bold text-white">Verifikasi OTP</h1>
        <p className="text-gray-400 text-sm mt-1">
          Masukkan 6 digit kode OTP Anda
        </p>
      </div>

      <div className="bg-gray-800/50 rounded-lg p-3 text-xs text-gray-300 mb-6">
        <p className="flex items-center gap-2 mb-1">
          <MethodIcon size={14} />
          Kode dikirim via {methodLabel} ke {pendingOtp?.phone}
        </p>
        <p className="text-gray-400">Mock OTP: gunakan kode 123456</p>
      </div>

      <form onSubmit={handleVerify} className="space-y-6">
        <div className="flex items-center justify-center gap-2 sm:gap-3" onPaste={handlePaste}>
          {otpDigits.map((digit, index) => (
            <input
              key={index}
              ref={(el) => {
                inputRefs.current[index] = el
              }}
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength={1}
              value={digit}
              onChange={(event) => handleChange(index, event.target.value)}
              onKeyDown={(event) => handleKeyDown(index, event)}
              className="w-11 h-14 sm:w-12 sm:h-14 text-center text-xl font-semibold rounded-xl border border-gray-700 bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
              disabled={isLoading}
            />
          ))}
        </div>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          isLoading={isLoading}
          disabled={!canSubmit}
          className="w-full"
        >
          Verifikasi OTP
        </Button>
      </form>

      {error && (
        <div className="bg-red-900/30 border border-red-800 rounded-lg p-3 text-sm text-red-400 text-center mt-4">
          {error}
        </div>
      )}

      <div className="mt-6 text-center space-y-3">
        <button
          type="button"
          onClick={handleResend}
          disabled={!canResend}
          className="text-sm text-blue-500 disabled:text-gray-500 disabled:cursor-not-allowed"
        >
          {canResend ? 'Kirim Ulang OTP' : `Kirim ulang dalam ${secondsLeft} detik`}
        </button>

        <button
          type="button"
          onClick={() => navigate('/login')}
          className="w-full inline-flex items-center justify-center gap-2 text-sm text-gray-400 hover:text-white"
        >
          <ArrowLeft size={16} />
          Ganti nomor
        </button>
      </div>
    </AuthLayout>
  )
}
