import { useEffect, useMemo, useState } from 'react'
import { Download, X } from 'lucide-react'
import { Button } from '../atoms/Button'

const DISMISS_KEY = 'mobilejaga-install-notice-dismissed-v1'
const LATEST_CHROME_MAJOR = 120

function getBrowserInfo() {
  const ua = navigator.userAgent
  const chromeMatch = ua.match(/Chrome\/(\d+)/)
  const isEdge = /Edg\//.test(ua)
  const isOpera = /OPR\//.test(ua)
  const isSamsung = /SamsungBrowser\//.test(ua)
  const isChrome = Boolean(chromeMatch) && !isEdge && !isOpera && !isSamsung
  const chromeVersion = chromeMatch ? Number(chromeMatch[1]) : 0

  return {
    isChrome,
    chromeVersion,
    isLatestChrome: isChrome && chromeVersion >= LATEST_CHROME_MAJOR
  }
}

export function InstallAppNotice() {
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [isInstalled, setIsInstalled] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  const browser = useMemo(() => {
    if (typeof window === 'undefined') {
      return { isChrome: false, chromeVersion: 0, isLatestChrome: false }
    }
    return getBrowserInfo()
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true
    const isDismissed = window.localStorage.getItem(DISMISS_KEY) === '1'

    setIsInstalled(isStandalone)
    setDismissed(isDismissed)

    const onBeforeInstallPrompt = (event) => {
      event.preventDefault()
      setDeferredPrompt(event)
    }

    const onAppInstalled = () => {
      setIsInstalled(true)
      setDeferredPrompt(null)
    }

    window.addEventListener('beforeinstallprompt', onBeforeInstallPrompt)
    window.addEventListener('appinstalled', onAppInstalled)

    return () => {
      window.removeEventListener('beforeinstallprompt', onBeforeInstallPrompt)
      window.removeEventListener('appinstalled', onAppInstalled)
    }
  }, [])

  if (isInstalled || dismissed) {
    return null
  }

  const canInstallNow = Boolean(deferredPrompt) && browser.isLatestChrome
  const shouldSuggestChrome = !browser.isLatestChrome

  if (!canInstallNow && !shouldSuggestChrome) {
    return null
  }

  const dismissNotice = () => {
    setDismissed(true)
    window.localStorage.setItem(DISMISS_KEY, '1')
  }

  const handleInstall = async () => {
    if (!deferredPrompt) {
      return
    }

    deferredPrompt.prompt()
    const choice = await deferredPrompt.userChoice

    if (choice?.outcome === 'accepted') {
      setDeferredPrompt(null)
      setDismissed(true)
    }
  }

  return (
    <aside className="fixed left-4 right-4 bottom-24 z-50 md:left-auto md:w-[360px]">
      <div className="rounded-xl border border-gray-700 bg-gray-900/95 backdrop-blur p-3 shadow-lg">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-sm font-medium text-white">Install MobileJaga App</p>
            {canInstallNow ? (
              <p className="text-xs text-gray-400 mt-1">
                Pakai Chrome terbaru. Install agar akses lebih cepat seperti native app.
              </p>
            ) : (
              <p className="text-xs text-gray-400 mt-1">
                Untuk tombol install yang optimal, buka dari Google Chrome versi terbaru.
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={dismissNotice}
            aria-label="Tutup notifikasi install"
            className="text-gray-500 hover:text-gray-300"
          >
            <X size={16} />
          </button>
        </div>

        {canInstallNow && (
          <div className="mt-3 flex justify-end">
            <Button
              type="button"
              size="sm"
              variant="primary"
              onClick={handleInstall}
              leftIcon={<Download size={14} />}
            >
              Install App
            </Button>
          </div>
        )}
      </div>
    </aside>
  )
}

export default InstallAppNotice