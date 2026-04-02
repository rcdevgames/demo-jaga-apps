import { create } from 'zustand'

// Mock CCTV data
const mockCameras = [
  {
    id: '1',
    name: 'Kamera Depan',
    location: 'Pintu Utama',
    status: 'online',
    isRecording: true,
    batteryLevel: 85,
    wifiSignal: 92,
    ip: '192.168.1.101',
    mac: 'AA:BB:CC:DD:EE:01',
    thumbnail: 'https://images.unsplash.com/photo-1558002038-1091a166111c?w=400&h=300&fit=crop',
    settings: {
      nightVision: true,
      motionDetection: true,
      motionHeatmap: false
    }
  },
  {
    id: '2',
    name: 'Kamera Belakang',
    location: 'Taman Belakang',
    status: 'online',
    isRecording: true,
    batteryLevel: 72,
    wifiSignal: 78,
    ip: '192.168.1.102',
    mac: 'AA:BB:CC:DD:EE:02',
    thumbnail: 'https://images.unsplash.com/photo-1516156008625-3a9d6067fab5?w=400&h=300&fit=crop',
    settings: {
      nightVision: true,
      motionDetection: true,
      motionHeatmap: true
    }
  },
  {
    id: '3',
    name: 'Kamera Garasi',
    location: 'Garasi Mobil',
    status: 'offline',
    isRecording: false,
    batteryLevel: 15,
    wifiSignal: 0,
    ip: '192.168.1.103',
    mac: 'AA:BB:CC:DD:EE:03',
    thumbnail: 'https://images.unsplash.com/photo-1558002038-1091a166111c?w=400&h=300&fit=crop',
    settings: {
      nightVision: false,
      motionDetection: false,
      motionHeatmap: false
    }
  },
  {
    id: '4',
    name: 'Kamera Ruang Tamu',
    location: 'Inside',
    status: 'online',
    isRecording: false,
    batteryLevel: 95,
    wifiSignal: 88,
    ip: '192.168.1.104',
    mac: 'AA:BB:CC:DD:EE:04',
    thumbnail: 'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=400&h=300&fit=crop',
    settings: {
      nightVision: false,
      motionDetection: true,
      motionHeatmap: false
    }
  }
]

// Mock recordings data
const mockRecordings = [
  { id: '1', cameraId: '1', date: '2026-04-02', time: '10:30', duration: '00:15:00', type: 'motion' },
  { id: '2', cameraId: '1', date: '2026-04-02', time: '09:45', duration: '00:30:00', type: 'continuous' },
  { id: '3', cameraId: '1', date: '2026-04-02', time: '08:00', duration: '01:00:00', type: 'continuous' },
  { id: '4', cameraId: '2', date: '2026-04-02', time: '11:00', duration: '00:10:00', type: 'motion' },
  { id: '5', cameraId: '2', date: '2026-04-01', time: '23:30', duration: '00:45:00', type: 'motion' },
  { id: '6', cameraId: '1', date: '2026-04-01', time: '14:00', duration: '02:00:00', type: 'continuous' },
]

export const useCCTVStore = create((set, get) => ({
  cameras: mockCameras,
  selectedCamera: null,
  viewMode: 'grid', // 'grid' or 'list'
  filterStatus: 'all', // 'all', 'online', 'offline'
  searchQuery: '',
  armed: true,
  isLoading: false,

  // Get filtered cameras
  getFilteredCameras: () => {
    const { cameras, filterStatus, searchQuery } = get()
    return cameras.filter(camera => {
      const matchesFilter = filterStatus === 'all' || camera.status === filterStatus
      const matchesSearch = camera.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          camera.location.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesFilter && matchesSearch
    })
  },

  // Get camera stats
  getStats: () => {
    const { cameras } = get()
    return {
      total: cameras.length,
      online: cameras.filter(c => c.status === 'online').length,
      recording: cameras.filter(c => c.isRecording).length,
      offline: cameras.filter(c => c.status === 'offline').length
    }
  },

  setSelectedCamera: (camera) => {
    set({ selectedCamera: camera })
  },

  setViewMode: (mode) => {
    set({ viewMode: mode })
  },

  setFilterStatus: (status) => {
    set({ filterStatus: status })
  },

  setSearchQuery: (query) => {
    set({ searchQuery: query })
  },

  toggleArmed: () => {
    set((state) => ({ armed: !state.armed }))
  },

  toggleMotionDetection: (cameraId) => {
    set((state) => ({
      cameras: state.cameras.map(camera =>
        camera.id === cameraId
          ? { ...camera, settings: { ...camera.settings, motionDetection: !camera.settings.motionDetection } }
          : camera
      )
    }))
  },

  toggleNightVision: (cameraId) => {
    set((state) => ({
      cameras: state.cameras.map(camera =>
        camera.id === cameraId
          ? { ...camera, settings: { ...camera.settings, nightVision: !camera.settings.nightVision } }
          : camera
      )
    }))
  },

  toggleMotionHeatmap: (cameraId) => {
    set((state) => ({
      cameras: state.cameras.map(camera =>
        camera.id === cameraId
          ? { ...camera, settings: { ...camera.settings, motionHeatmap: !camera.settings.motionHeatmap } }
          : camera
      )
    }))
  },

  updateCamera: (cameraId, updates) => {
    set((state) => ({
      cameras: state.cameras.map(camera =>
        camera.id === cameraId ? { ...camera, ...updates } : camera
      )
    }))
  },

  getRecordings: (cameraId) => {
    return mockRecordings.filter(r => r.cameraId === cameraId)
  },

  // Simulate real-time updates (Observer Pattern)
  simulateRealTimeUpdates: () => {
    setInterval(() => {
      const { cameras } = get()
      const randomCamera = cameras[Math.floor(Math.random() * cameras.length)]
      if (randomCamera.status === 'online') {
        // Simulate battery drain
        const newBattery = Math.max(0, randomCamera.batteryLevel - Math.floor(Math.random() * 3))
        get().updateCamera(randomCamera.id, { batteryLevel: newBattery })
      }
    }, 30000) // Update every 30 seconds
  }
}))
