import { ArrowLeft, Smartphone, Tablet, Laptop, Shield, Clock3 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { MainLayout } from '../../components/templates/Layout'
import { Header } from '../../components/organisms/Navbar'
import { Badge } from '../../components/atoms/Badge'

const connectedDevices = [
  {
    id: 'dev-1',
    name: 'iPhone 13 - Rizki',
    type: 'mobile',
    lastActive: 'Aktif sekarang',
    trusted: true
  },
  {
    id: 'dev-2',
    name: 'MacBook Pro Office',
    type: 'laptop',
    lastActive: '2 jam lalu',
    trusted: true
  }
]

function DeviceIcon({ type }) {
  if (type === 'laptop') {
    return <Laptop size={18} className="text-gray-400" />
  }

  if (type === 'tablet') {
    return <Tablet size={18} className="text-gray-400" />
  }

  return <Smartphone size={18} className="text-gray-400" />
}

export default function Devices() {
  const navigate = useNavigate()

  return (
    <MainLayout className="px-4 pt-4">
      <Header
        title="Perangkat Terhubung"
        subtitle="Pantau sesi perangkat Anda"
        leftAction={
          <button
            type="button"
            onClick={() => navigate('/settings')}
            className="text-gray-300 hover:text-white transition-colors"
            aria-label="Kembali ke pengaturan"
          >
            <ArrowLeft size={20} />
          </button>
        }
      />

      <div className="py-4 space-y-4">
        <div className="bg-gray-900 rounded-xl border border-gray-800 divide-y divide-gray-800">
          {connectedDevices.map((device) => (
            <div key={device.id} className="p-4 flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-gray-800 border border-gray-700 flex items-center justify-center">
                <DeviceIcon type={device.type} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm text-white font-medium truncate">{device.name}</p>
                  {device.trusted && <Badge variant="success" size="sm">Trusted</Badge>}
                </div>
                <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                  <span className="inline-flex items-center gap-1">
                    <Clock3 size={12} />
                    {device.lastActive}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Shield size={12} />
                    Aman
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  )
}
