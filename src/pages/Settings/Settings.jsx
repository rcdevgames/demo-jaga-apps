import { useState } from 'react'
import {
  User,
  Bell,
  Shield,
  Wifi,
  Moon,
  Globe,
  Database,
  LogOut,
  ChevronRight,
  Camera,
  Smartphone
} from 'lucide-react'
import { MainLayout } from '../../components/templates/Layout'
import { Header } from '../../components/organisms/Navbar'
import { Toggle } from '../../components/molecules/Toggle'
import { Button } from '../../components/atoms/Button'
import { Badge } from '../../components/atoms/Badge'
import { useAuthStore } from '../../store/authStore'
import { cn } from '../../api/utils'

export default function Settings() {
  const { user, logout } = useAuthStore()
  
  const [notifications, setNotifications] = useState({
    push: true,
    motion: true,
    offline: true,
    battery: true
  })

  const [system, setSystem] = useState({
    darkMode: true,
    autoArm: false,
    cloudBackup: true
  })

  const settingsSections = [
    {
      title: 'Akun',
      items: [
        {
          icon: User,
          label: 'Profil',
          value: user?.email,
          onClick: () => {}
        },
        {
          icon: Smartphone,
          label: 'Perangkat Terhubung',
          value: '2 perangkat',
          onClick: () => {}
        }
      ]
    },
    {
      title: 'Notifikasi',
      items: [
        {
          icon: Bell,
          label: 'Push Notification',
          toggle: true,
          value: notifications.push,
          onChange: (v) => setNotifications({ ...notifications, push: v })
        },
        {
          icon: Camera,
          label: 'Deteksi Gerakan',
          toggle: true,
          value: notifications.motion,
          onChange: (v) => setNotifications({ ...notifications, motion: v })
        },
        {
          icon: Wifi,
          label: 'Kamera Offline',
          toggle: true,
          value: notifications.offline,
          onChange: (v) => setNotifications({ ...notifications, offline: v })
        },
        {
          icon: Shield,
          label: 'Baterai Kritis',
          toggle: true,
          value: notifications.battery,
          onChange: (v) => setNotifications({ ...notifications, battery: v })
        }
      ]
    },
    {
      title: 'Sistem',
      items: [
        {
          icon: Moon,
          label: 'Dark Mode',
          toggle: true,
          value: system.darkMode,
          onChange: (v) => setSystem({ ...system, darkMode: v })
        },
        {
          icon: Shield,
          label: 'Auto Arm',
          description: 'Aktifkan sistem otomatis malam hari',
          toggle: true,
          value: system.autoArm,
          onChange: (v) => setSystem({ ...system, autoArm: v })
        },
        {
          icon: Database,
          label: 'Cloud Backup',
          toggle: true,
          value: system.cloudBackup,
          onChange: (v) => setSystem({ ...system, cloudBackup: v })
        },
        {
          icon: Globe,
          label: 'Bahasa',
          value: 'Indonesia',
          onClick: () => {}
        }
      ]
    }
  ]

  return (
    <MainLayout className="px-4 pt-4">
      {/* Header */}
      <Header
        title="Pengaturan"
        subtitle="Kelola preferensi aplikasi"
      />

      <div className="py-4 space-y-6">
        {/* Profile Section */}
        <div className="bg-gray-900 rounded-xl p-4 border border-gray-800">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center">
              <User size={28} className="text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-white font-medium">{user?.name || 'User'}</h3>
              <p className="text-gray-500 text-sm">{user?.email}</p>
            </div>
            <Badge variant="success" size="sm">Active</Badge>
          </div>
        </div>

        {/* Settings Sections */}
        {settingsSections.map((section, sectionIndex) => (
          <div key={sectionIndex}>
            <h2 className="text-sm font-medium text-gray-400 mb-3 px-1">
              {section.title}
            </h2>
            <div className="bg-gray-900 rounded-xl border border-gray-800 divide-y divide-gray-800">
              {section.items.map((item, itemIndex) => (
                <div
                  key={itemIndex}
                  className={cn(
                    'flex items-center justify-between p-4',
                    item.onClick && 'cursor-pointer hover:bg-gray-800 transition-colors'
                  )}
                  onClick={item.onClick}
                >
                  <div className="flex items-center gap-3 flex-1">
                    <item.icon size={20} className="text-gray-500" />
                    <div>
                      <p className="text-white text-sm font-medium">{item.label}</p>
                      {item.description && (
                        <p className="text-gray-500 text-xs mt-0.5">{item.description}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {item.toggle ? (
                      <Toggle
                        enabled={item.value}
                        onChange={item.onChange}
                      />
                    ) : (
                      <>
                        <span className="text-gray-500 text-sm">{item.value}</span>
                        <ChevronRight size={18} className="text-gray-600" />
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Danger Zone */}
        <div>
          <h2 className="text-sm font-medium text-red-400 mb-3 px-1">
            Zona Bahaya
          </h2>
          <div className="bg-gray-900 rounded-xl border border-red-900/50 divide-y divide-gray-800">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <LogOut size={20} className="text-red-500" />
                <div>
                  <p className="text-white text-sm font-medium">Logout</p>
                  <p className="text-gray-500 text-xs">Keluar dari akun Anda</p>
                </div>
              </div>
              <Button
                variant="danger"
                size="sm"
                onClick={logout}
              >
                Logout
              </Button>
            </div>
          </div>
        </div>

        {/* App Version */}
        <div className="text-center text-xs text-gray-600 py-4">
          <p>MobileJaga v1.0.0</p>
          <p>Build 2026.04.02</p>
        </div>
      </div>
    </MainLayout>
  )
}
