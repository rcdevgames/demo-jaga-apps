import { AnimatePresence, motion } from 'framer-motion'
import { X, ChevronRight, AlertTriangle, AlertCircle, Info } from 'lucide-react'
import { Badge } from '../atoms/Badge'
import { Button } from '../atoms/Button'
import { useAlertsStore } from '../../store/alertsStore'
import { useNavigate } from 'react-router-dom'
import { formatRelativeTime } from '../../api/utils'
import { cn } from '../../api/utils'

/**
 * AlertItem Organism Component
 * Single alert with swipe-to-delete functionality
 */
function AlertItem({ alert, onDismiss, onNavigate }) {
  const severityConfig = {
    high: {
      color: 'border-red-500',
      bgColor: 'bg-red-900/20',
      iconColor: 'text-red-500',
      Icon: AlertTriangle
    },
    medium: {
      color: 'border-yellow-500',
      bgColor: 'bg-yellow-900/20',
      iconColor: 'text-yellow-500',
      Icon: AlertCircle
    },
    low: {
      color: 'border-blue-500',
      bgColor: 'bg-blue-900/20',
      iconColor: 'text-blue-500',
      Icon: Info
    }
  }

  const config = severityConfig[alert.severity]
  const Icon = config.Icon

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      className={cn(
        'relative bg-gray-800 rounded-xl border-l-4 p-4 cursor-pointer',
        config.color
      )}
      onClick={() => onNavigate?.(alert.cameraId)}
    >
      <div className="flex items-start gap-3">
        {/* Thumbnail */}
        {alert.thumbnail && (
          <div className="w-16 h-12 rounded-lg overflow-hidden shrink-0 bg-gray-700">
            <img
              src={alert.thumbnail}
              alt={alert.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1">
              <h4 className="text-white font-medium text-sm">{alert.title}</h4>
              <p className="text-gray-400 text-xs mt-0.5 line-clamp-2">
                {alert.message}
              </p>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation()
                onDismiss?.(alert.id)
              }}
              className="text-gray-500 hover:text-gray-300 transition-colors shrink-0"
            >
              <X size={16} />
            </button>
          </div>

          <div className="flex items-center justify-between mt-2">
            <span className="text-xs text-gray-500">
              {formatRelativeTime(alert.timestamp)}
            </span>
            <div className="flex items-center gap-2">
              <Icon size={14} className={config.iconColor} />
              <ChevronRight size={14} className="text-gray-600" />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

/**
 * AlertList Organism Component
 * List of all alerts with filtering
 */
export function AlertList({ filter = 'all' }) {
  const navigate = useNavigate()
  const { getAlerts, deleteAlert } = useAlertsStore()

  let alerts = getAlerts()

  if (filter !== 'all') {
    alerts = alerts.filter(alert => alert.severity === filter)
  }

  const handleDismiss = (alertId) => {
    deleteAlert(alertId)
  }

  const handleNavigate = (cameraId) => {
    navigate(`/cameras/${cameraId}`)
  }

  if (alerts.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
          <Info size={32} className="text-gray-600" />
        </div>
        <h3 className="text-white font-medium">Tidak ada peringatan</h3>
        <p className="text-gray-500 text-sm mt-1">
          Sistem berjalan dengan baik
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      <AnimatePresence>
        {alerts.map((alert) => (
          <AlertItem
            key={alert.id}
            alert={alert}
            onDismiss={handleDismiss}
            onNavigate={handleNavigate}
          />
        ))}
      </AnimatePresence>
    </div>
  )
}

export default AlertList
