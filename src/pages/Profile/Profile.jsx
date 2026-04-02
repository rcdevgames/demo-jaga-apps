import { ArrowLeft, Mail, User, CalendarDays, ShieldCheck } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { MainLayout } from '../../components/templates/Layout'
import { Header } from '../../components/organisms/Navbar'
import { Button } from '../../components/atoms/Button'
import { Badge } from '../../components/atoms/Badge'
import { useAuthStore } from '../../store/authStore'

export default function Profile() {
  const navigate = useNavigate()
  const { user } = useAuthStore()

  return (
    <MainLayout className="px-4 pt-4">
      <Header
        title="Profil"
        subtitle="Informasi akun Anda"
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
        <div className="bg-gray-900 rounded-xl p-4 border border-gray-800">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center">
              <User size={28} className="text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-white font-semibold">{user?.name || 'User'}</h2>
              <p className="text-gray-500 text-sm">{user?.email || '-'}</p>
            </div>
            <Badge variant="success" size="sm">Active</Badge>
          </div>
        </div>

        <div className="bg-gray-900 rounded-xl border border-gray-800 divide-y divide-gray-800">
          <div className="flex items-center gap-3 p-4">
            <Mail size={18} className="text-gray-500" />
            <div>
              <p className="text-xs text-gray-500">Email</p>
              <p className="text-sm text-white">{user?.email || '-'}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4">
            <ShieldCheck size={18} className="text-gray-500" />
            <div>
              <p className="text-xs text-gray-500">Status Akun</p>
              <p className="text-sm text-white">Terverifikasi</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4">
            <CalendarDays size={18} className="text-gray-500" />
            <div>
              <p className="text-xs text-gray-500">Member Sejak</p>
              <p className="text-sm text-white">April 2026</p>
            </div>
          </div>
        </div>

        <Button
          variant="outline"
          size="md"
          className="w-full"
          onClick={() => navigate('/settings')}
        >
          Kembali ke Pengaturan
        </Button>
      </div>
    </MainLayout>
  )
}
