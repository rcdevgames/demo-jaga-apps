import { create } from 'zustand'

// Mock alerts data
const mockAlerts = [
  {
    id: '1',
    cameraId: '1',
    cameraName: 'Kamera Depan',
    type: 'motion',
    severity: 'high',
    title: 'Gerakan Terdeteksi',
    message: 'Gerakan terdeteksi di area Pintu Utama',
    timestamp: new Date('2026-04-02T10:30:00'),
    isRead: false,
    thumbnail: 'https://images.unsplash.com/photo-1558002038-1091a166111c?w=200&h=150&fit=crop'
  },
  {
    id: '2',
    cameraId: '3',
    cameraName: 'Kamera Garasi',
    type: 'battery',
    severity: 'medium',
    title: 'Baterai Kritis',
    message: 'Baterai kamera tinggal 15%',
    timestamp: new Date('2026-04-02T09:15:00'),
    isRead: false,
    thumbnail: null
  },
  {
    id: '3',
    cameraId: '2',
    cameraName: 'Kamera Belakang',
    type: 'motion',
    severity: 'high',
    title: 'Penyusup Terdeteksi',
    message: 'Gerakan tidak biasa di Taman Belakang',
    timestamp: new Date('2026-04-02T08:45:00'),
    isRead: true,
    thumbnail: 'https://images.unsplash.com/photo-1516156008625-3a9d6067fab5?w=200&h=150&fit=crop'
  },
  {
    id: '4',
    cameraId: '3',
    cameraName: 'Kamera Garasi',
    type: 'offline',
    severity: 'medium',
    title: 'Kamera Offline',
    message: 'Kamera Garasi tidak terhubung ke WiFi',
    timestamp: new Date('2026-04-02T07:00:00'),
    isRead: true,
    thumbnail: null
  },
  {
    id: '5',
    cameraId: '4',
    cameraName: 'Kamera Ruang Tamu',
    type: 'info',
    severity: 'low',
    title: 'Update Sistem',
    message: 'Firmware kamera telah diperbarui ke versi terbaru',
    timestamp: new Date('2026-04-01T23:00:00'),
    isRead: true,
    thumbnail: null
  }
]

export const useAlertsStore = create((set, get) => ({
  alerts: mockAlerts,
  unreadCount: 2,

  getAlerts: () => {
    const { alerts } = get()
    return alerts.sort((a, b) => b.timestamp - a.timestamp)
  },

  getUnreadCount: () => {
    const { alerts } = get()
    return alerts.filter(a => !a.isRead).length
  },

  markAsRead: (alertId) => {
    set((state) => ({
      alerts: state.alerts.map(alert =>
        alert.id === alertId ? { ...alert, isRead: true } : alert
      )
    }))
  },

  markAllAsRead: () => {
    set((state) => ({
      alerts: state.alerts.map(alert => ({ ...alert, isRead: true }))
    }))
  },

  deleteAlert: (alertId) => {
    set((state) => ({
      alerts: state.alerts.filter(alert => alert.id !== alertId)
    }))
  },

  getSeverityColor: (severity) => {
    switch (severity) {
      case 'high': return 'border-red-500 text-red-500'
      case 'medium': return 'border-yellow-500 text-yellow-500'
      case 'low': return 'border-blue-500 text-blue-500'
      default: return 'border-gray-500 text-gray-500'
    }
  },

  getSeverityIcon: (severity) => {
    switch (severity) {
      case 'high': return 'AlertTriangle'
      case 'medium': return 'AlertCircle'
      case 'low': return 'Info'
      default: return 'Bell'
    }
  },

  addAlert: (alert) => {
    set((state) => ({
      alerts: [alert, ...state.alerts]
    }))
  }
}))
