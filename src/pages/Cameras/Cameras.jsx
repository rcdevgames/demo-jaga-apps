import { useState } from 'react'
import { Search, Grid, List as ListIcon, Filter } from 'lucide-react'
import { MainLayout } from '../../components/templates/Layout'
import { Header } from '../../components/organisms/Navbar'
import { CameraGrid, CameraList } from '../../components/organisms/CameraGrid'
import { CameraCard } from '../../components/molecules/CameraCard'
import { Button } from '../../components/atoms/Button'
import { Badge } from '../../components/atoms/Badge'
import { Input } from '../../components/atoms/Input'
import { useCCTVStore } from '../../store/cctvStore'
import { useNavigate } from 'react-router-dom'
import { cn } from '../../api/utils'

export default function Cameras() {
  const navigate = useNavigate()
  const {
    getFilteredCameras,
    viewMode,
    setViewMode,
    filterStatus,
    setFilterStatus,
    searchQuery,
    setSearchQuery,
    setSelectedCamera
  } = useCCTVStore()

  const [showFilters, setShowFilters] = useState(false) // eslint-disable-line no-unused-vars
  const cameras = getFilteredCameras()

  const filters = [
    { id: 'all', label: 'Semua' },
    { id: 'online', label: 'Online' },
    { id: 'offline', label: 'Offline' }
  ]

  const handleCameraClick = (camera) => {
    setSelectedCamera(camera)
    navigate(`/cameras/${camera.id}`)
  }

  const onlineCount = cameras.filter(c => c.status === 'online').length
  const totalCount = cameras.length

  return (
    <MainLayout className="px-4 pt-4">
      {/* Header */}
      <Header
        title="Kamera"
        subtitle={`${onlineCount}/${totalCount} aktif`}
        rightAction={
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setViewMode('grid')}
              className={cn(viewMode === 'grid' ? 'text-blue-500' : 'text-gray-500')}
            >
              <Grid size={20} />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setViewMode('list')}
              className={cn(viewMode === 'list' ? 'text-blue-500' : 'text-gray-500')}
            >
              <ListIcon size={20} />
            </Button>
          </div>
        }
      />

      <div className="py-4 space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Input
            type="text"
            placeholder="Cari kamera..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            leftIcon={<Search size={18} />}
          />
        </div>

        {/* Filter Pills */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setFilterStatus(filter.id)}
              className={cn(
                'px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors',
                filterStatus === filter.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              )}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Status Bar */}
        <div className="flex items-center justify-between bg-gray-900 rounded-lg px-3 py-2 border border-gray-800">
          <span className="text-xs text-gray-400">
            Menampilkan {cameras.length} kamera
          </span>
          <div className="flex gap-2">
            <Badge variant="success" size="sm" dot>
              {onlineCount} Online
            </Badge>
            <Badge variant="danger" size="sm" dot>
              {totalCount - onlineCount} Offline
            </Badge>
          </div>
        </div>

        {/* Camera List/Grid */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-2 gap-3">
            {cameras.map((camera) => (
              <CameraCard
                key={camera.id}
                camera={camera}
                onClick={() => handleCameraClick(camera)}
                size="default"
              />
            ))}
          </div>
        ) : (
          <CameraList
            cameras={cameras}
            onCameraClick={handleCameraClick}
          />
        )}

        {/* Empty State */}
        {cameras.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search size={32} className="text-gray-600" />
            </div>
            <h3 className="text-white font-medium">Tidak ada kamera ditemukan</h3>
            <p className="text-gray-500 text-sm mt-1">
              Coba ubah filter atau kata kunci pencarian
            </p>
          </div>
        )}
      </div>
    </MainLayout>
  )
}
