import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  Maximize,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Camera,
  Download,
  Settings2,
  Info,
  Calendar,
  Video,
  Zap,
  Wifi,
  Battery,
  MapPin,
  Eye,
  Thermometer
} from 'lucide-react'
import { AnimatePresence } from 'framer-motion'
import { MainLayout } from '../../components/templates/Layout'
import { Header } from '../../components/organisms/Navbar'
import { TabBar } from '../../components/molecules/TabBar'
import { Toggle } from '../../components/molecules/Toggle'
import { Button } from '../../components/atoms/Button'
import { Badge } from '../../components/atoms/Badge'
import { useCCTVStore } from '../../store/cctvStore'
import { formatRelativeTime } from '../../api/utils'

// PTZ Control Component
function PTZControls({ onDirection }) {
  return (
    <div className="grid grid-cols-3 gap-2 w-40">
      <div />
      <Button
        variant="secondary"
        size="sm"
        onClick={() => onDirection?.('up')}
        className="aspect-square"
      >
        ↑
      </Button>
      <div />
      <Button
        variant="secondary"
        size="sm"
        onClick={() => onDirection?.('left')}
        className="aspect-square"
      >
        ←
      </Button>
      <div className="flex items-center justify-center">
        <div className="w-3 h-3 bg-gray-600 rounded-full" />
      </div>
      <Button
        variant="secondary"
        size="sm"
        onClick={() => onDirection?.('right')}
        className="aspect-square"
      >
        →
      </Button>
      <div />
      <Button
        variant="secondary"
        size="sm"
        onClick={() => onDirection?.('down')}
        className="aspect-square"
      >
        ↓
      </Button>
      <div />
    </div>
  )
}

// Tab Icons
const tabIcons = {
  live: Video,
  recordings: Calendar,
  settings: Settings2,
  info: Info
}

export default function CameraDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { cameras, selectedCamera, updateCamera } = useCCTVStore()

  const [activeTab, setActiveTab] = useState('live')
  const [isMuted, setIsMuted] = useState(false)
  const [isMicOn, setIsMicOn] = useState(false)
  const [zoom, setZoom] = useState(1)
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])

  const camera = cameras.find(c => c.id === id) || selectedCamera

  if (!camera) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-screen">
          <p className="text-gray-500">Kamera tidak ditemukan</p>
        </div>
      </MainLayout>
    )
  }

  const tabs = [
    { id: 'live', label: 'Live', icon: tabIcons.live },
    { id: 'recordings', label: 'Rekaman', icon: tabIcons.recordings },
    { id: 'settings', label: 'Pengaturan', icon: tabIcons.settings },
    { id: 'info', label: 'Info', icon: tabIcons.info }
  ]

  const handlePTZ = (direction) => {
    console.log('PTZ Direction:', direction)
    // In real app, send PTZ command to camera
  }

  const tabs_content = {
    live: (
      <div className="space-y-4">
        {/* Live Stream Area */}
        <div className="relative bg-black rounded-xl overflow-hidden aspect-video">
          <img
            src={camera.thumbnail}
            alt={camera.name}
            className="w-full h-full object-cover"
            style={{ transform: `scale(${zoom})` }}
          />
          
          {/* HUD Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/40">
            {/* Top Bar */}
            <div className="absolute top-0 left-0 right-0 p-3 flex items-center justify-between">
              <Badge variant="live" size="sm" className="animate-pulse">
                LIVE
              </Badge>
              {camera.isRecording && (
                <Badge variant="danger" size="sm">
                  <span className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse" />
                  REC
                </Badge>
              )}
            </div>

            {/* Bottom Controls */}
            <div className="absolute bottom-0 left-0 right-0 p-3 flex items-center justify-between">
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsMuted(!isMuted)}
                  className="text-white"
                >
                  {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsMicOn(!isMicOn)}
                  className="text-white"
                >
                  {isMicOn ? <Mic size={18} /> : <MicOff size={18} />}
                </Button>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="text-white"
              >
                <Maximize size={18} />
              </Button>
            </div>
          </div>
        </div>

        {/* PTZ Controls */}
        <div className="flex items-center justify-center gap-6">
          <PTZControls onDirection={handlePTZ} />
          
          {/* Zoom Slider */}
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs text-gray-500">Zoom</span>
            <input
              type="range"
              min="1"
              max="4"
              step="0.1"
              value={zoom}
              onChange={(e) => setZoom(parseFloat(e.target.value))}
              className="w-24 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
            />
            <span className="text-xs text-gray-400">{zoom.toFixed(1)}x</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <Button
            variant="secondary"
            leftIcon={<Camera size={18} />}
            onClick={() => console.log('Snapshot taken')}
          >
            Snapshot
          </Button>
          <Button
            variant={camera.isRecording ? 'danger' : 'primary'}
            leftIcon={<Video size={18} />}
            onClick={() => updateCamera(camera.id, { isRecording: !camera.isRecording })}
          >
            {camera.isRecording ? 'Stop Rec' : 'Record'}
          </Button>
        </div>
      </div>
    ),

    recordings: (
      <div className="space-y-4">
        {/* Date Picker */}
        <div className="bg-gray-900 rounded-xl p-4 border border-gray-800">
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full bg-gray-800 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        {/* Timeline */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-gray-400">Rekaman Hari Ini</h3>
          {[
            { time: '10:30', duration: '15 min', type: 'motion' },
            { time: '09:45', duration: '30 min', type: 'continuous' },
            { time: '08:00', duration: '60 min', type: 'continuous' },
            { time: '06:15', duration: '10 min', type: 'motion' }
          ].map((rec, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-4 bg-gray-900 rounded-xl p-3 border border-gray-800 cursor-pointer hover:bg-gray-800 transition-colors"
            >
              <div className="w-1 bg-blue-600 rounded-full h-12" />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-white font-medium">{rec.time}</span>
                  <Badge
                    variant={rec.type === 'motion' ? 'warning' : 'info'}
                    size="sm"
                  >
                    {rec.type === 'motion' ? 'Motion' : 'Continuous'}
                  </Badge>
                </div>
                <p className="text-gray-500 text-sm">{rec.duration}</p>
              </div>
              <Button variant="ghost" size="sm">
                <Download size={18} />
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    ),

    settings: (
      <div className="space-y-4">
        {/* Camera Settings */}
        <div className="bg-gray-900 rounded-xl border border-gray-800 divide-y divide-gray-800">
          <div className="p-4">
            <Toggle
              label="Night Vision"
              description="Mode penglihatan malam"
              enabled={camera.settings.nightVision}
              onChange={() => {}}
            />
          </div>
          <div className="p-4">
            <Toggle
              label="Motion Detection"
              description="Deteksi gerakan otomatis"
              enabled={camera.settings.motionDetection}
              onChange={() => {}}
            />
          </div>
          <div className="p-4">
            <Toggle
              label="Motion Heatmap"
              description="Visualisasi area gerakan"
              enabled={camera.settings.motionHeatmap}
              onChange={() => {}}
            />
          </div>
        </div>

        {/* Quality Settings */}
        <div className="bg-gray-900 rounded-xl p-4 border border-gray-800">
          <h3 className="text-sm font-medium text-white mb-3">Kualitas Video</h3>
          <div className="flex gap-2">
            {['720p', '1080p', '4K'].map((quality) => (
              <Button
                key={quality}
                variant="outline"
                size="sm"
                className="flex-1"
              >
                {quality}
              </Button>
            ))}
          </div>
        </div>
      </div>
    ),

    info: (
      <div className="space-y-4">
        {/* Camera Info Cards */}
        <div className="bg-gray-900 rounded-xl border border-gray-800 divide-y divide-gray-800">
          <InfoRow icon={MapPin} label="Lokasi" value={camera.location} />
          <InfoRow icon={Wifi} label="Status WiFi" value={`${camera.wifiSignal}%`} />
          <InfoRow icon={Battery} label="Baterai" value={`${camera.batteryLevel}%`} />
          <InfoRow icon={Zap} label="IP Address" value={camera.ip} />
          <InfoRow icon={Settings2} label="MAC Address" value={camera.mac} />
        </div>

        {/* Device Info */}
        <div className="bg-gray-900 rounded-xl p-4 border border-gray-800">
          <h3 className="text-sm font-medium text-white mb-3">Informasi Perangkat</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Model</span>
              <span className="text-white">MJ-Cam Pro X1</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Firmware</span>
              <span className="text-white">v2.4.1</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Last Sync</span>
              <span className="text-white">{formatRelativeTime(new Date())}</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <MainLayout className="px-4 pt-4">
      {/* Header */}
      <Header
        title={camera.name}
        subtitle={camera.location}
        leftAction={
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/cameras')}
          >
            <ArrowLeft size={20} />
          </Button>
        }
      />

      <div className="py-4">
        {/* Tab Bar */}
        <TabBar
          tabs={tabs}
          activeTab={activeTab}
          onChange={setActiveTab}
        />

        {/* Tab Content */}
        <div className="mt-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {tabs_content[activeTab]}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </MainLayout>
  )
}

// Info Row Component
function InfoRow({ icon: IconComponent, label, value }) {
  if (!IconComponent) return null
  return (
    <div className="flex items-center justify-between p-4">
      <div className="flex items-center gap-3">
        <IconComponent size={18} className="text-gray-500" />
        <span className="text-sm text-gray-400">{label}</span>
      </div>
      <span className="text-sm font-medium text-white">{value}</span>
    </div>
  )
}
