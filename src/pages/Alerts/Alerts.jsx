import { useState } from 'react'
import { Bell, Check, Trash2, Filter } from 'lucide-react'
import { MainLayout } from '../../components/templates/Layout'
import { Header } from '../../components/organisms/Navbar'
import { AlertList } from '../../components/organisms/AlertList'
import { Button } from '../../components/atoms/Button'
import { Badge } from '../../components/atoms/Badge'
import { useAlertsStore } from '../../store/alertsStore'
import { cn } from '../../api/utils'

export default function Alerts() {
  const { alerts, markAllAsRead, getUnreadCount } = useAlertsStore()
  const [filter, setFilter] = useState('all')
  const unreadCount = getUnreadCount()

  const filters = [
    { id: 'all', label: 'Semua' },
    { id: 'high', label: 'Tinggi' },
    { id: 'medium', label: 'Sedang' },
    { id: 'low', label: 'Rendah' }
  ]

  return (
    <MainLayout className="px-4 pt-4">
      {/* Header */}
      <Header
        title="Peringatan"
        subtitle={unreadCount > 0 ? `${unreadCount} belum dibaca` : 'Semua sudah dibaca'}
        rightAction={
          unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={markAllAsRead}
              className="text-blue-500"
            >
              <Check size={18} />
              <span className="hidden sm:inline">Tandai Semua</span>
            </Button>
          )
        }
      />

      <div className="py-4 space-y-4">
        {/* Summary Cards */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-red-900/20 border border-red-800 rounded-xl p-3 text-center">
            <span className="text-2xl font-bold text-red-400">
              {alerts.filter(a => a.severity === 'high').length}
            </span>
            <p className="text-xs text-gray-400 mt-1">Tinggi</p>
          </div>
          <div className="bg-yellow-900/20 border border-yellow-800 rounded-xl p-3 text-center">
            <span className="text-2xl font-bold text-yellow-400">
              {alerts.filter(a => a.severity === 'medium').length}
            </span>
            <p className="text-xs text-gray-400 mt-1">Sedang</p>
          </div>
          <div className="bg-blue-900/20 border border-blue-800 rounded-xl p-3 text-center">
            <span className="text-2xl font-bold text-blue-400">
              {alerts.filter(a => a.severity === 'low').length}
            </span>
            <p className="text-xs text-gray-400 mt-1">Rendah</p>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={cn(
                'px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors',
                filter === f.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              )}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Alert List */}
        <AlertList filter={filter} />
      </div>
    </MainLayout>
  )
}
