import { motion } from 'framer-motion'
import { Battery, Wifi, WifiOff, CircleDot } from 'lucide-react'
import { Badge } from '../atoms/Badge'
import { cn, getBatteryColor, getWiFiStrength } from '../../api/utils'

/**
 * CameraCard Molecule Component
 * Displays camera preview with status overlay
 */
export function CameraCard({
  camera,
  onClick,
  size = 'default', // 'default' | 'compact'
  showDetails = true,
  className
}) {
  const isOnline = camera.status === 'online'
  const batteryColor = getBatteryColor(camera.batteryLevel)
  const wifiStrength = getWiFiStrength(camera.wifiSignal)

  const cardVariants = {
    hover: {
      scale: 1.02,
      transition: { duration: 0.2 }
    },
    tap: {
      scale: 0.98,
      transition: { duration: 0.1 }
    }
  }

  return (
    <motion.div
      className={cn(
        'relative bg-gray-800 rounded-xl overflow-hidden cursor-pointer group',
        size === 'default' ? 'aspect-video' : 'aspect-square',
        className
      )}
      variants={cardVariants}
      whileHover="hover"
      whileTap="tap"
      onClick={onClick}
    >
      {/* Camera Thumbnail/Feed */}
      <div className="absolute inset-0">
        <img
          src={camera.thumbnail}
          alt={camera.name}
          className="w-full h-full object-cover"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />
      </div>

      {/* Status Badges */}
      <div className="absolute top-3 left-3 flex gap-2">
        <Badge
          variant={isOnline ? 'success' : 'danger'}
          size="sm"
          dot
        >
          {isOnline ? 'ONLINE' : 'OFFLINE'}
        </Badge>
        {camera.isRecording && (
          <Badge variant="live" size="sm" className="animate-pulse">
            <CircleDot size={12} className="mr-1" />
            REC
          </Badge>
        )}
      </div>

      {/* Camera Info */}
      {showDetails && (
        <div className="absolute bottom-0 left-0 right-0 p-3">
          <h3 className="text-white font-medium text-sm truncate">{camera.name}</h3>
          <p className="text-gray-400 text-xs truncate">{camera.location}</p>
          
          {/* Status Icons */}
          <div className="flex items-center gap-3 mt-2">
            <div className={cn('flex items-center gap-1 text-xs', batteryColor)}>
              <Battery size={14} />
              <span>{camera.batteryLevel}%</span>
            </div>
            <div className={cn(
              'flex items-center gap-1 text-xs',
              isOnline ? 'text-gray-300' : 'text-gray-500'
            )}>
              {wifiStrength === 'none' ? (
                <WifiOff size={14} />
              ) : (
                <Wifi size={14} />
              )}
              {isOnline && (
                <span>{camera.wifiSignal}%</span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
        <span className="text-white text-sm font-medium">Lihat Detail</span>
      </div>
    </motion.div>
  )
}

export default CameraCard
