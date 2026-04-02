import { Shield, Zap, Video, Bell, TrendingUp } from 'lucide-react'
import { MainLayout, AuthLayout } from '../../components/templates/Layout'
import { Header, ArmedToggle, CameraGrid, ActivityChart } from '../../components/organisms'
import { StatItem } from '../../components/molecules/StatItem'
import { Button } from '../../components/atoms/Button'
import { Badge } from '../../components/atoms/Badge'
import { useCCTVStore } from '../../store/cctvStore'
import { useAuthStore } from '../../store/authStore'
import { useNavigate } from 'react-router-dom'

export default function Dashboard() {
  const navigate = useNavigate()
  const { armed, toggleArmed, getStats } = useCCTVStore()
  const { user, logout } = useAuthStore()
  const stats = getStats()

  const quickActions = [
    { icon: Zap, label: 'Motion', active: true },
    { icon: Video, label: 'Record', active: false },
    { icon: Bell, label: 'Alert', active: true },
    { icon: TrendingUp, label: 'Stats', active: false }
  ]

  return (
    <MainLayout className="px-4 pt-4">
      {/* Header */}
      <Header
        title="Dashboard"
        subtitle={`Halo, ${user?.name || 'User'}`}
        rightAction={
          <ArmedToggle armed={armed} onToggle={toggleArmed} />
        }
      />

      <div className="py-4 space-y-6">
        {/* Stats Grid */}
        <section>
          <h2 className="text-sm font-medium text-gray-400 mb-3">Ringkasan Sistem</h2>
          <div className="grid grid-cols-2 gap-3">
            <StatItem
              icon={Video}
              label="Total Kamera"
              value={stats.total}
              color="blue"
            />
            <StatItem
              icon={Shield}
              label="Online"
              value={stats.online}
              subValue={`dari ${stats.total}`}
              color="green"
            />
            <StatItem
              icon={Zap}
              label="Recording"
              value={stats.recording}
              color="yellow"
            />
            <StatItem
              icon={Bell}
              label="Offline"
              value={stats.offline}
              color="red"
            />
          </div>
        </section>

        {/* Quick Actions */}
        <section>
          <h2 className="text-sm font-medium text-gray-400 mb-3">Aksi Cepat</h2>
          <div className="flex gap-2">
            {quickActions.map((action, index) => (
              <motion.button
                key={index}
                whileTap={{ scale: 0.95 }}
                className={`flex-1 flex flex-col items-center justify-center p-3 rounded-xl border transition-colors ${
                  action.active
                    ? 'bg-blue-900/30 border-blue-800 text-blue-400'
                    : 'bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-750'
                }`}
              >
                <action.icon size={20} />
                <span className="text-xs mt-1">{action.label}</span>
              </motion.button>
            ))}
          </div>
        </section>

        {/* Live Preview */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-medium text-gray-400">Live Preview</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/cameras')}
              className="text-blue-500"
            >
              Lihat Semua
            </Button>
          </div>
          <CameraGrid limit={4} />
        </section>

        {/* Activity Chart */}
        <section>
          <h2 className="text-sm font-medium text-gray-400 mb-3">Aktivitas 7 Hari</h2>
          <div className="bg-gray-900 rounded-xl p-4 border border-gray-800">
            <ActivityChart height={180} />
          </div>
        </section>

        {/* Logout Button */}
        <Button
          variant="outline"
          size="md"
          onClick={logout}
          className="w-full"
        >
          Keluar
        </Button>
      </div>
    </MainLayout>
  )
}
