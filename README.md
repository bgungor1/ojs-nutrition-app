<p align="center">
  <img src="./src/assets/images/icon.png" alt="OJS Nutrition Logo" width="120" height="120" />
</p>

<h1 align="center">OJS Nutrition</h1>

<p align="center">
  <b>Bu proje, supplement (besin takviyesi) odaklı bir e-ticaret mobil uygulamasıdır. Kullanıcılar ürünleri inceleyebilir, filtreleyebilir, yorum yapabilir, sepetlerine ekleyebilir ve hesap bilgilerini yönetebilir.</b>
</p>

<p align="center">
  <a href="https://reactnative.dev/"><img src="https://img.shields.io/badge/React%20Native-0.81.5-61DAFB?logo=react&logoColor=white" alt="React Native" /></a>
  <a href="https://expo.dev/"><img src="https://img.shields.io/badge/Expo%20SDK-54-000020?logo=expo&logoColor=white" alt="Expo SDK" /></a>
  <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white" alt="TypeScript" /></a>
  <a href="https://redux-toolkit.js.org/"><img src="https://img.shields.io/badge/Redux%20Toolkit-2.11-764ABC?logo=redux&logoColor=white" alt="Redux Toolkit" /></a>
  <a href="https://www.nativewind.dev/"><img src="https://img.shields.io/badge/NativeWind-4.2-06B6D4?logo=tailwindcss&logoColor=white" alt="NativeWind" /></a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Platform-iOS%20%7C%20Android%20%7C%20Web-brightgreen" alt="Platform" />
  <img src="https://img.shields.io/badge/License-Private-red" alt="License" />
</p>

---

> **OJS Nutrition App**, [OJS Nutrition](https://github.com/bgungor1) web platformunun mobil uygulama sürümüdür. React Native ve Expo ile geliştirilmiş, modern mimari yaklaşımları ve en güncel teknolojileri kullanan cross-platform bir beslenme uygulamasıdır.

## ✨ Öne Çıkan Özellikler

- 🍎  Spor sürecinizi desteklemek için gerekli bileşenler ve  supplementler
- 🔐 Kimlik doğrulama (Auth flow)
- 🌙 Otomatik Karanlık / Aydınlık tema desteği
- 📱 iOS, Android ve Web platformlarında çalışır
- ⚡ React Native New Architecture (Fabric & TurboModules) aktif
- 🧪 React Compiler (deneysel) desteği

## 🛠️ Teknoloji Stack'i

### Core

| Teknoloji | Versiyon | Açıklama |
|---|---|---|
| [React Native](https://reactnative.dev/) | `0.81.5` | Cross-platform mobil geliştirme |
| [React](https://react.dev/) | `19.1.0` | UI kütüphanesi |
| [Expo](https://expo.dev/) | `~54.0.33` | React Native geliştirme platformu |
| [TypeScript](https://www.typescriptlang.org/) | `~5.9.2` | Statik tip güvenliği (strict mode) |

### Navigasyon

| Teknoloji | Versiyon | Açıklama |
|---|---|---|
| [Expo Router](https://docs.expo.dev/router/introduction/) | `~6.0.23` | Dosya tabanlı (file-based) routing |
| [React Navigation](https://reactnavigation.org/) | `^7.1.8` | Tab & stack navigasyon altyapısı |
| [React Native Screens](https://github.com/software-mansion/react-native-screens) | `~4.16.0` | Native ekran optimizasyonu |

### State Management & API

| Teknoloji | Versiyon | Açıklama |
|---|---|---|
| [Redux Toolkit](https://redux-toolkit.js.org/) | `^2.11.2` | Global state yönetimi |
| [RTK Query](https://redux-toolkit.js.org/rtk-query/overview) | *RTK dahili* | API istekleri & veri cache'leme |
| [React Redux](https://react-redux.js.org/) | `^9.2.0` | React-Redux bağlantı katmanı |
| [Async Storage](https://react-native-async-storage.github.io/async-storage/) | `^2.2.0` | Kalıcı yerel depolama |

### Stil & UI

| Teknoloji | Versiyon | Açıklama |
|---|---|---|
| [NativeWind](https://www.nativewind.dev/) | `^4.2.1` | Tailwind CSS for React Native |
| [clsx](https://github.com/lukeed/clsx) | `^2.1.1` | Koşullu className birleştirme |
| [tailwind-merge](https://github.com/dcastil/tailwind-merge) | `^3.4.0` | Tailwind class çakışma çözümü |
| [Expo Image](https://docs.expo.dev/versions/latest/sdk/image/) | `~3.0.11` | Performanslı görsel bileşeni |

### Form & Validasyon

| Teknoloji | Versiyon | Açıklama |
|---|---|---|
| [React Hook Form](https://react-hook-form.com/) | `^7.71.1` | Performanslı form yönetimi |
| [Zod](https://zod.dev/) | `^4.3.6` | Schema tabanlı çalışma zamanı doğrulama |

### Animasyon & Gesture

| Teknoloji | Versiyon | Açıklama |
|---|---|---|
| [Reanimated](https://docs.swmansion.com/react-native-reanimated/) | `^4.2.1` | UI thread'de yüksek performanslı animasyonlar |
| [Gesture Handler](https://docs.swmansion.com/react-native-gesture-handler/) | `~2.28.0` | Native dokunma ve jest yönetimi |
| [Expo Haptics](https://docs.expo.dev/versions/latest/sdk/haptics/) | `~15.0.8` | Dokunsal geri bildirim |

### Geliştirici Araçları

| Teknoloji | Versiyon | Açıklama |
|---|---|---|
| [ESLint](https://eslint.org/) | `^9.25.0` | Kod kalite denetimi (Expo config) |
| [Bun](https://bun.sh/) | `^1.3.9` | Hızlı paket yöneticisi & runtime |

## 📁 Proje Yapısı

```
ojs-nutrition-app/
├── src/
│   ├── app/                   # Expo Router - Dosya tabanlı routing
│   │   ├── (auth)/            # Kimlik doğrulama ekranları (route group)
│   │   ├── (tabs)/            # Ana tab navigasyonu (route group)
│   │   │   ├── _layout.tsx    # Tab bar layout yapılandırması
│   │   │   ├── index.tsx      # Ana sayfa (Home)
│   │   │   └── explore.tsx    # Keşfet ekranı
│   │   ├── _layout.tsx        # Root layout (tema & navigasyon)
│   │   └── modal.tsx          # Modal ekranı
│   ├── components/            # Yeniden kullanılabilir bileşenler
│   │   └── ui/                # Temel UI bileşenleri (Collapsible, IconSymbol...)
│   ├── constants/             # Tema renkleri ve sabitler
│   ├── hooks/                 # Özel React hook'ları
│   ├── schemas/               # Zod doğrulama şemaları
│   ├── store/                 # Redux store, slice ve RTK Query servisleri
│   ├── types/                 # TypeScript tip tanımları
│   ├── utils/                 # Yardımcı fonksiyonlar
│   └── global.css             # Tailwind CSS giriş dosyası
├── app.json                   # Expo yapılandırması
├── babel.config.js            # Babel (NativeWind preset dahil)
├── tailwind..config.js        # Tailwind / NativeWind yapılandırması
├── tsconfig.json              # TypeScript yapılandırması (strict)
├── eslint.config.js           # ESLint flat config
├── bun.lock                   # Bun dependency lock dosyası
└── package.json
```

## 🚀 Başlangıç

### Gereksinimler

- [Node.js](https://nodejs.org/) v18+
- [Bun](https://bun.sh/) v1.3+
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- iOS Simulator (macOS) / Android Emulator veya fiziksel cihaz

### Kurulum

```bash
# Repo'yu klonlayın
git clone https://github.com/bgungor1/ojs-nutrition-app.git
cd ojs-nutrition-app

# Bağımlılıkları yükleyin
bun install

# Geliştirme sunucusunu başlatın
bun start
```

### Çalıştırma

```bash
# Expo Go ile başlat
bun start

# Android
bun run android

# iOS
bun run ios

# Web
bun run web
```

## ⚙️ Mimari Kararlar

| Karar | Gerekçe |
|---|---|
| **Expo Router (File-based)** | Dosya sistemi tabanlı routing ile Next.js benzeri geliştirici deneyimi; typed routes aktif |
| **Redux Toolkit + RTK Query** | Öngörülebilir state yönetimi ve otomatik API cache'leme / invalidation |
| **NativeWind v4** | Tailwind CSS'in React Native'de kullanımı; `clsx` + `tailwind-merge` ile güvenli class birleştirme |
| **React Hook Form + Zod** | Performanslı form yönetimi ve çalışma zamanında tip güvenli doğrulama |
| **New Architecture** | Fabric renderer & TurboModules ile geliştirilmiş performans |
| **React Compiler** | Otomatik memoization ile gereksiz re-render'ların önlenmesi (deneysel) |
| **Bun** | npm / yarn'a kıyasla çok daha hızlı bağımlılık yönetimi |
| **`src/` dizin yapısı** | Uygulama kodunun proje konfigürasyonundan net ayrımı; `@/*` path alias desteği |

## 🤝 Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'feat: add amazing feature'`)
4. Branch'inizi push edin (`git push origin feature/amazing-feature`)
5. Pull Request açın

## 📄 Lisans

Bu proje özel (private) bir projedir. Tüm hakları saklıdır.

---

<p align="center">
  <sub>OJS Nutrition App — React Native ile geliştirildi 💚</sub>
</p>
