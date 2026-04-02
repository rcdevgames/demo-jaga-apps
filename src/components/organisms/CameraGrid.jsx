import { CameraCard } from '../molecules/CameraCard'
import { useCCTVStore } from '../../store/cctvStore'
import { useNavigate } from 'react-router-dom'

/**
 * CameraGrid Organism Component
 * 2x2 grid of camera previews for dashboard
 */
export function CameraGrid({ limit = 4 }) {
  const navigate = useNavigate()
  const { getFilteredCameras } = useCCTVStore()
  
  const cameras = getFilteredCameras().slice(0, limit)

  return (
    <div className="grid grid-cols-2 gap-3">
      {cameras.map((camera) => (
        <CameraCard
          key={camera.id}
          camera={camera}
          onClick={() => navigate(`/cameras/${camera.id}`)}
          size="default"
          showDetails={true}
        />
      ))}
    </div>
  )
}

/**
 * CameraList Organism Component
 * List view of all cameras
 */
export function CameraList({ cameras, onCameraClick }) {
  return (
    <div className="space-y-3">
      {cameras.map((camera) => (
        <div
          key={camera.id}
          onClick={() => onCameraClick?.(camera)}
          className="flex items-center gap-4 bg-gray-800 rounded-xl p-3 cursor-pointer hover:bg-gray-750 transition-colors"
        >
          {/* Thumbnail */}
          <div className="w-24 h-18 rounded-lg overflow-hidden shrink-0">
            <img
              src={camera.thumbnail}
              alt={camera.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <h3 className="text-white font-medium truncate">{camera.name}</h3>
            <p className="text-gray-500 text-sm">{camera.location}</p>
            <div className="flex items-center gap-2 mt-1">
              <span className={cn(
                'text-xs',
                camera.status === 'online' ? 'text-green-500' : 'text-red-500'
              )}>
                {camera.status === 'online' ? '● Online' : '● Offline'}
              </span>
              {camera.isRecording && (
                <span className="text-xs text-red-500">● Recording</span>
              )}
            </div>
          </div>

          {/* Status */}
          <div className="text-right">
            <div className={cn(
              'text-sm',
              camera.batteryLevel <= 20 ? 'text-red-500' :
              camera.batteryLevel <= 50 ? 'text-yellow-500' : 'text-green-500'
            )}>
              {camera.batteryLevel}%
            </div>
            <div className="text-xs text-gray-500">Battery</div>
          </div>
        </div>
      ))}
    </div>
  )
}

import { cn } from '../../api/utils'

export default CameraGrid
