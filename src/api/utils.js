import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Utility function to merge Tailwind CSS classes
 * Handles conditional classes and merges duplicates properly
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

/**
 * Format date to Indonesian locale
 */
export function formatDate(date, options = {}) {
  const defaultOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...options
  }
  return new Date(date).toLocaleDateString('id-ID', defaultOptions)
}

/**
 * Format time to 24-hour format
 */
export function formatTime(date) {
  return new Date(date).toLocaleTimeString('id-ID', {
    hour: '2-digit',
    minute: '2-digit'
  })
}

/**
 * Format relative time (e.g., "5 menit yang lalu")
 */
export function formatRelativeTime(date) {
  const now = new Date()
  const diff = now - new Date(date)
  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)

  if (minutes < 1) return 'Baru saja'
  if (minutes < 60) return `${minutes} menit yang lalu`
  if (hours < 24) return `${hours} jam yang lalu`
  if (days < 7) return `${days} hari yang lalu`
  
  return formatDate(date)
}

/**
 * Get battery level color
 */
export function getBatteryColor(level) {
  if (level <= 20) return 'text-red-500'
  if (level <= 50) return 'text-yellow-500'
  return 'text-green-500'
}

/**
 * Get WiFi signal strength icon
 */
export function getWiFiStrength(signal) {
  if (signal >= 80) return 'strong'
  if (signal >= 50) return 'medium'
  if (signal > 0) return 'weak'
  return 'none'
}

/**
 * Generate chart data for activity
 */
export function generateActivityData() {
  const days = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min']
  
  return days.map((day) => ({
    day,
    motions: Math.floor(Math.random() * 20) + 5,
    alerts: Math.floor(Math.random() * 5)
  }))
}

/**
 * Sleep utility for simulating async operations
 */
export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * Check if user is in demo mode
 */
export function isDemoMode(email) {
  return email === 'rizki@mobilejaga.id'
}

export default {
  cn,
  formatDate,
  formatTime,
  formatRelativeTime,
  getBatteryColor,
  getWiFiStrength,
  generateActivityData,
  sleep,
  isDemoMode
}
