# MobileJaga - Platform Monitoring Keamanan Terpusat

<div align="center">

![MobileJaga Banner](https://img.shields.io/badge/MobileJaga-Security%20Monitoring-blue?style=for-the-badge)

**Progressive Web App (PWA) untuk Monitoring CCTV dan Keamanan**

[![React](https://img.shields.io/badge/React-19.2.4-61dafb?style=flat-square&logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.0.3-646cff?style=flat-square&logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.2.2-38bdf8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![PWA](https://img.shields.io/badge/PWA-Enabled-007AFF?style=flat-square)](https://web.dev/progressive-web-apps/)

</div>

---

## 📋 Daftar Isi

- [Tentang](#-tentang)
- [Fitur Utama](#-fitur-utama)
- [Tech Stack](#-tech-stack)
- [Arsitektur](#-arsitektur)
- [Instalasi](#-instalasi)
- [Penggunaan](#-penggunaan)
- [Struktur Folder](#-struktur-folder)
- [Komponen](#-komponen)
- [State Management](#-state-management)
- [API & Services](#-api--services)
- [PWA Configuration](#-pwa-configuration)
- [Development](#-development)
- [Build & Deployment](#-build--deployment)
- [Demo Credentials](#-demo-credentials)
- [Screenshots](#-screenshots)
- [Troubleshooting](#-troubleshooting)
- [License](#-license)

---

## 📱 Tentang

**MobileJaga** adalah platform monitoring keamanan terpusat yang dikembangkan sebagai Progressive Web App (PWA). Aplikasi ini memungkinkan pengguna untuk memantau kamera CCTV, menerima alert keamanan, dan mengelola sistem keamanan mereka dari mana saja melalui browser.

### Keunggulan

- 🎯 **Mobile-First Design** - Optimized untuk pengalaman mobile
- 📲 **PWA Ready** - Dapat diinstall di homescreen tanpa app store
- 🌐 **Offline Support** - Tetap berfungsi tanpa koneksi internet
- ⚡ **Real-time Updates** - Simulasi data streaming real-time
- 🎨 **Dark Mode UI** - Interface modern dengan dark theme
- 🔐 **Multi-Auth** - Login via Email, WhatsApp, atau Telepon

---

## ✨ Fitur Utama

### 🔐 Authentication
- **3 Metode Login**: Email, WhatsApp, Nomor Telepon
- **Halaman OTP Terpisah**: Verifikasi OTP di halaman khusus (`/login/otp`)
- **OTP Box 6 Digit**: Input OTP model kotak per digit dengan auto-focus
- **Mock OTP**: Gunakan kode `123456` untuk flow WhatsApp/Telepon
- **Mock Resend OTP**: Fitur kirim ulang OTP dengan countdown
- **Validasi Real-time**: Format validation saat mengetik
- **Shake Animation**: Feedback visual saat error
- **Demo Mode**: Bypass login untuk testing
- **Persistent Session**: Auto-login dengan localStorage

### 🏠 Dashboard
- **Armed/Disarmed Toggle**: Aktifkan/nonaktifkan sistem keamanan
- **Quick Stats**: Total, Online, Recording, Offline cameras
- **Quick Actions**: Toggle Motion Detection, Recording, dll
- **Live Preview Grid**: 2x2 grid camera previews
- **Activity Chart**: Grafik aktivitas 7 hari terakhir

### 📹 Monitoring CCTV
- **Dual View Mode**: Grid (visual) dan List (detail)
- **Search & Filter**: Cari kamera dan filter by status
- **Status Bar**: Ringkasan kamera aktif vs total
- **4-Tab Detail System**:
  - **Live**: PTZ controls, zoom, snapshot, record
  - **Rekaman**: Calendar picker, timeline history
  - **Pengaturan**: Night Vision, Motion Detection, Heatmap
  - **Info**: Technical specs (IP, MAC, WiFi, Battery)

### 🔔 Alerts & Notifications
- **Severity Categories**:
  - 🔴 **Tinggi (Merah)**: Gerakan terdeteksi/Penyusup
  - 🟡 **Sedang (Kuning)**: Baterai Kritis/Offline
  - 🔵 **Rendah (Biru)**: Info sistem/Update
- **Swipe to Delete**: Interaksi swipe untuk hapus alert
- **Go to Camera**: Klik untuk navigasi ke kamera terkait
- **Summary Cards**: Quick overview per severity

### ⚙️ Settings
- **Profile Page**: Halaman profil terpisah dari menu Pengaturan
- **Connected Devices Page**: Halaman perangkat terhubung terpisah dari menu Pengaturan
- **Notification Toggles**: Push, Motion, Offline, Battery alerts
- **System Settings**: Dark Mode, Auto Arm, Cloud Backup
- **Danger Zone**: Logout functionality

### 📲 Native App Install Notice
- **Install Button**: Tampil jika dibuka dari Google Chrome versi terbaru dan browser siap install PWA
- **Smart Suggestion**: Jika bukan Chrome terbaru, muncul saran ringan (non-intrusive)
- **Dismissable Banner**: Notice bisa ditutup agar tidak mengganggu

---

## 🛠 Tech Stack

| Category | Technology | Version |
|----------|-----------|---------|
| **Framework** | React | 19.2.4 |
| **Build Tool** | Vite | 8.0.3 |
| **Styling** | Tailwind CSS | 4.2.2 |
| **State Management** | Zustand | 5.0.12 |
| **Routing** | React Router | 7.13.2 |
| **Animations** | Framer Motion | 12.38.0 |
| **Charts** | Recharts | 3.8.1 |
| **Icons** | Lucide React | 1.7.0 |
| **PWA** | vite-plugin-pwa | 1.2.0 |
| **Utilities** | clsx, tailwind-merge | Latest |

---

## 🏗 Arsitektur

### Design Patterns

#### 1. Atomic Design Pattern
Komponen dibagi menjadi hierarki yang jelas:
```
├── Atoms       → Button, Input, Badge, Spinner
├── Molecules   → FormField, CameraCard, StatItem, Toggle
├── Organisms   → Navbar, CameraGrid, AlertList, ActivityChart, InstallAppNotice
├── Templates   → MainLayout, AuthLayout
└── Pages       → Login, OtpVerify, Dashboard, Cameras, Alerts, Settings, Profile, Devices
```

#### 2. Strategy Pattern (Authentication)
```javascript
// Single interface untuk multiple auth methods
authenticate('email', credentials)
authenticate('whatsapp', credentials)
authenticate('phone', credentials)
```

#### 3. Observer Pattern (Real-time Simulation)
```javascript
// Components subscribe to store updates
useCCTVStore().cameras // Auto-update saat data berubah
```

### State Management Flow
```
┌─────────────┐     ┌──────────────┐     ┌─────────────┐
│   Pages     │────▶│   Zustand    │────▶│   API       │
│             │◀────│    Store     │◀────│   Service   │
└─────────────┘     └──────────────┘     └─────────────┘
```

---

## 📦 Instalasi

### Prerequisites
- Node.js >= 18.x
- pnpm >= 8.x (recommended) atau npm >= 9.x

### Langkah Instalasi

```bash
# Clone repository
git clone https://github.com/yourusername/mobile-jaga.git
cd mobile-jaga

# Install dependencies
pnpm install

# Copy environment file (if needed)
cp .env.example .env
```

### Dependencies

```json
{
  "dependencies": {
    "react": "^19.2.4",
    "react-dom": "^19.2.4",
    "react-router-dom": "^7.13.2",
    "zustand": "^5.0.12",
    "framer-motion": "^12.38.0",
    "recharts": "^3.8.1",
    "lucide-react": "^1.7.0",
    "clsx": "^2.1.1",
    "tailwind-merge": "^3.5.0"
  },
  "devDependencies": {
    "vite": "^8.0.3",
    "tailwindcss": "^4.2.2",
    "@tailwindcss/vite": "^4.2.2",
    "vite-plugin-pwa": "^1.2.0",
    "eslint": "^9.39.4"
  }
}
```

---

## 💻 Penggunaan

### Development Server

```bash
# Start development server
pnpm run dev

# Access at http://localhost:3000
```

### Production Build

```bash
# Build for production
pnpm run build

# Preview production build
pnpm run preview
```

### Linting

```bash
# Run ESLint
pnpm run lint
```

---

## 📁 Struktur Folder

```
mobile-jaga/
├── public/
│   ├── favicon.svg          # App icon
│   └── icons.svg            # Icon sprite sheet
├── src/
│   ├── api/
│   │   ├── authService.js   # Auth strategy pattern
│   │   └── utils.js         # Utility functions
│   ├── components/
│   │   ├── atoms/           # Basic UI components
│   │   │   ├── Button.jsx
│   │   │   ├── Input.jsx
│   │   │   ├── Badge.jsx
│   │   │   └── Spinner.jsx
│   │   ├── molecules/       # Combined atoms
│   │   │   ├── FormField.jsx
│   │   │   ├── CameraCard.jsx
│   │   │   ├── StatItem.jsx
│   │   │   ├── Toggle.jsx
│   │   │   └── TabBar.jsx
│   │   ├── organisms/       # Complex components
│   │   │   ├── Navbar.jsx
│   │   │   ├── CameraGrid.jsx
│   │   │   ├── AlertList.jsx
│   │   │   ├── ActivityChart.jsx
│   │   │   └── InstallAppNotice.jsx
│   │   └── templates/       # Layout templates
│   │       └── Layout.jsx
│   ├── hooks/               # Custom React hooks
│   ├── pages/               # Page components
│   │   ├── Login/
│   │   ├── OtpVerify/
│   │   ├── Dashboard/
│   │   ├── Cameras/
│   │   ├── Alerts/
│   │   ├── Settings/
│   │   ├── Profile/
│   │   └── Devices/
│   ├── store/               # Zustand stores
│   │   ├── authStore.js
│   │   ├── cctvStore.js
│   │   └── alertsStore.js
│   ├── assets/              # Images, fonts, etc.
│   ├── App.jsx              # Main app component
│   ├── main.jsx             # Entry point
│   └── index.css            # Global styles
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── pnpm-lock.yaml
├── README.md
└── vite.config.js
```

---

## 🧩 Komponen

### Atoms

#### Button
```jsx
<Button 
  variant="primary"  // primary | secondary | outline | ghost | danger
  size="md"          // sm | md | lg
  isLoading={true}
  leftIcon={<Icon />}
>
  Click Me
</Button>
```

#### Input
```jsx
<Input
  type="email"
  label="Email"
  error="Invalid email"
  leftIcon={<Mail />}
  placeholder="nama@email.com"
/>
```

#### Badge
```jsx
<Badge 
  variant="success"  // default | success | warning | danger | info | live
  size="sm"
  dot={true}
>
  Online
</Badge>
```

### Molecules

#### CameraCard
```jsx
<CameraCard
  camera={cameraData}
  onClick={() => navigate('/cameras/1')}
  size="default"
/>
```

#### Toggle
```jsx
<Toggle
  enabled={true}
  onChange={(value) => setEnabled(value)}
  label="Night Vision"
  description="Enable night mode"
/>
```

---

## 🗄 State Management

### Auth Store
```javascript
import { useAuthStore } from './store/authStore'

const { 
  user, 
  isAuthenticated, 
  isLoading, 
  error,
  login,
  logout 
} = useAuthStore()
```

### CCTV Store
```javascript
import { useCCTVStore } from './store/cctvStore'

const {
  cameras,
  selectedCamera,
  armed,
  viewMode,
  filterStatus,
  getFilteredCameras,
  getStats,
  toggleArmed,
  setViewMode
} = useCCTVStore()
```

### Alerts Store
```javascript
import { useAlertsStore } from './store/alertsStore'

const {
  alerts,
  unreadCount,
  getAlerts,
  markAsRead,
  deleteAlert,
  getSeverityColor
} = useAlertsStore()
```

---

## 🔌 API & Services

### Authentication Service

```javascript
import { authenticate, validators } from './api/authService'

// Validate input
const emailError = validators.email('test@example.com')

// Authenticate with strategy pattern
const result = await authenticate('email', {
  email: 'user@example.com',
  password: 'password123'
})
```

### Utility Functions

```javascript
import { 
  formatDate, 
  formatTime, 
  formatRelativeTime,
  getBatteryColor,
  generateActivityData 
} from './api/utils'

// Format date to Indonesian locale
formatDate(new Date()) // "2 April 2026"

// Get relative time
formatRelativeTime(new Date(Date.now() - 3600000)) // "1 jam yang lalu"

// Generate chart data
const data = generateActivityData()
```

---

## 📲 PWA Configuration

### Manifest Configuration
```javascript
// vite.config.js
VitePWA({
  manifest: {
    name: 'MobileJaga - Security Monitoring',
    short_name: 'MobileJaga',
    description: 'Platform monitoring keamanan terpusat',
    theme_color: '#000000',
    background_color: '#000000',
    display: 'standalone',
    start_url: '/',
    icons: [{
      src: 'favicon.svg',
      sizes: 'any',
      type: 'image/svg+xml'
    }]
  }
})
```

### Install PWA
1. Buka aplikasi di browser (Chrome/Edge/Safari)
2. Klik icon **Install** di address bar
3. Atau melalui menu browser: **Add to Home Screen**
4. App akan muncul di homescreen seperti native app

### Install Notice Behavior
- Jika user membuka app di Google Chrome versi terbaru dan event install tersedia, tombol **Install App** akan muncul.
- Jika user membuka app di browser lain atau Chrome versi lama, app menampilkan saran halus untuk memakai Chrome terbaru.
- Notice bersifat non-intrusive dan bisa di-dismiss oleh user.

### Offline Support
- Service Worker caching semua assets
- App tetap bisa dibuka tanpa internet
- Data terakhir di-cache untuk offline viewing

---

## 🧪 Development

### Running Tests
```bash
# Run tests (coming soon)
pnpm run test
```

### Code Style
```bash
# Check linting
pnpm run lint

# Fix auto-fixable issues
pnpm run lint -- --fix
```

### Debug Mode
```javascript
// Enable debug logging in stores
useCCTVStore.subscribe((state) => {
  console.log('CCTV State:', state)
})
```

---

## 🚀 Build & Deployment

### Production Build
```bash
# Build optimized production bundle
pnpm run build

# Output: /dist folder
```

### Deployment Options

#### Vercel
```bash
npm i -g vercel
vercel
```

#### Netlify
```bash
# Connect GitHub repo to Netlify
# Build command: pnpm run build
# Publish directory: dist
```

#### Self-Hosted
```bash
# Build and copy to web server
pnpm run build
cp -r dist/* /var/www/html/
```

### Environment Variables
```env
# .env.example
VITE_APP_TITLE=MobileJaga
VITE_API_URL=https://api.mobilejaga.id
VITE_VERSION=1.0.0
```

---

## 🔑 Demo Credentials

### Demo Account
```
Email: rizki@mobilejaga.id
Password: password123
```

### Features Available in Demo
- ✅ Full dashboard access
- ✅ All camera controls
- ✅ Alert management
- ✅ Settings configuration
- ✅ PWA installation

---

## 📸 Screenshots

### Login
```
┌─────────────────────────────────┐
│         🛡 MobileJaga           │
│  Platform monitoring keamanan   │
│                                 │
│  [Email] [WhatsApp] [Telepon]  │
│                                 │
│  📧 Email                       │
│  ┌─────────────────────────┐   │
│  │ rizki@mobilejaga.id     │   │
│  └─────────────────────────┘   │
│                                 │
│  🔒 Password                    │
│  ┌─────────────────────────┐   │
│  │ ••••••••••••            │   │
│  └─────────────────────────┘   │
│                                 │
│  ┌─────────────────────────┐   │
│  │         MASUK           │   │
│  └─────────────────────────┘   │
└─────────────────────────────────┘
```

### Dashboard
```
┌─────────────────────────────────┐
│ Dashboard        [Armed 🔵]    │
│ Halo, Rizki                     │
│                                 │
│ ┌────┐ ┌────┐ ┌────┐ ┌────┐   │
│ │ 4  │ │ 3  │ │ 2  │ │ 1  │   │
│ │Total│ │On │ │Rec│ │Off│   │
│ └────┘ └────┘ └────┘ └────┘   │
│                                 │
│ Live Preview                    │
│ ┌──────────┐ ┌──────────┐      │
│ │ CAM 1 🔴 │ │ CAM 2 🔴 │      │
│ │  LIVE    │ │  LIVE    │      │
│ └──────────┘ └──────────┘      │
│ ┌──────────┐ ┌──────────┐      │
│ │ CAM 3 ⚫ │ │ CAM 4 🔴 │      │
│ │ OFFLINE  │ │  LIVE    │      │
│ └──────────┘ └──────────┘      │
└─────────────────────────────────┘
```

---

## 🔧 Troubleshooting

### Common Issues

#### 1. Build Fails
```bash
# Clear cache and reinstall
rm -rf node_modules dist
pnpm install
pnpm run build
```

#### 2. PWA Not Installing
- Ensure HTTPS is enabled
- Check manifest.json is valid
- Verify service worker is registered
- Clear browser cache
- Use Google Chrome versi terbaru untuk kompatibilitas install prompt terbaik

#### 3. State Not Persisting
```javascript
// Check localStorage
console.log(localStorage.getItem('auth-storage'))
console.log(localStorage.getItem('cctv-storage'))
```

#### 4. Styles Not Loading
```bash
# Rebuild Tailwind
pnpm run dev --force
```

#### 5. ESLint Errors
```bash
# Update eslint config
# Or add eslint-disable comment
// eslint-disable-next-line no-unused-vars
```

---

## 📄 License

```
MIT License

Copyright (c) 2026 MobileJaga

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 👥 Contributing

Kami menyambut kontribusi! Silakan:

1. Fork repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

---

## 📞 Contact

- **Website**: https://mobilejaga.id
- **Email**: support@mobilejaga.id
- **Demo**: https://demo.mobilejaga.id

---

<div align="center">

**Dibuat dengan ❤️ menggunakan React + Vite**

© 2026 MobileJaga. All rights reserved.

</div>
