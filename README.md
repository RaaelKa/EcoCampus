# EcoCampus - Sürdürülebilir Kampüs Pazaryeri

YMH3007 Fullstack Web ve Mobil Uygulama Geliştirme Final Projesi

## Proje Hakkında

EcoCampus, üniversite öğrencilerinin kullanmadıkları ders materyallerini, kitaplarını veya eşyalarını satabilecekleri ya da ihtiyaç sahiplerine ücretsiz bağışlayabilecekleri bir platformdur. Bu proje, döngüsel ekonomi ve öğrenci dayanışması temasıyla geliştirilmiştir.

## Teknoloji Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **PostgreSQL** - İlişkisel veritabanı
- **JWT** - Kimlik doğrulama
- **Bcrypt** - Şifre hashleme

### Frontend Web (Dashboard)
- **React** - UI kütüphanesi
- **Vite** - Build tool
- **React Router** - Routing
- **Axios** - HTTP client

### Frontend Mobil
- **React Native** - Mobil framework
- **Expo** - Development platform
- **React Navigation** - Navigation
- **AsyncStorage** - Local storage

## Proje Yapısı

```
EcoCampus/
├── backend/          # Node.js + Express API
│   ├── config/       # Veritabanı yapılandırması
│   ├── controllers/  # İş mantığı
│   ├── models/       # Veritabanı modelleri
│   ├── routes/       # API rotaları
│   ├── middleware/   # JWT middleware
│   ├── database/     # SQL scriptleri
│   └── server.js     # Ana server dosyası
├── web/              # React Dashboard
│   └── src/
│       ├── pages/    # Sayfa bileşenleri
│       ├── components/ # Bileşenler
│       ├── services/ # API servisleri
│       └── config/   # Yapılandırma
└── mobile/           # React Native Mobil Uygulama
    ├── screens/      # Ekranlar
    ├── services/     # API servisleri
    └── config/      # Yapılandırma
```

## Kurulum ve Çalıştırma

### Ön Gereksinimler

- Node.js (v18 veya üzeri)
- PostgreSQL (v12 veya üzeri)
- npm veya yarn
- Expo CLI (mobil uygulama için)

### 1. Veritabanı Kurulumu

1. PostgreSQL'i başlatın ve bir veritabanı oluşturun:
```sql
CREATE DATABASE ecocampus;
```

2. `backend/database/init.sql` dosyasını çalıştırarak tabloları oluşturun:
```bash
psql -U postgres -d ecocampus -f backend/database/init.sql
```

### 2. Backend Kurulumu

1. Backend klasörüne gidin:
```bash
cd backend
```

2. Bağımlılıkları yükleyin:
```bash
npm install
```

3. `.env` dosyası oluşturun (`.env.example` dosyasını referans alarak):
```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=ecocampus
DB_USER=postgres
DB_PASSWORD=your_password_here
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
PORT=3000
```

4. Sunucuyu başlatın:
```bash
# Development modu (nodemon ile)
npm run dev

# Production modu
npm start
```

Backend API `http://localhost:3000` adresinde çalışacaktır.

### 3. Web Dashboard Kurulumu

1. Web klasörüne gidin:
```bash
cd web
```

2. Bağımlılıkları yükleyin:
```bash
npm install
```

3. `.env` dosyası oluşturun (opsiyonel):
```env
VITE_API_URL=http://localhost:3000/api
```

4. Development sunucusunu başlatın:
```bash
npm run dev
```

Web uygulaması `http://localhost:5173` adresinde çalışacaktır.

### 4. Mobil Uygulama Kurulumu

1. Mobil klasörüne gidin:
```bash
cd mobile
```

2. Bağımlılıkları yükleyin:
```bash
npm install
```

3. `mobile/config/api.js` dosyasındaki `API_BASE_URL` değerini güncelleyin:
   - Windows'ta IP adresinizi öğrenmek için: `ipconfig`
   - Mac/Linux'ta: `ifconfig`
   - Örnek: `http://192.168.1.100:3000/api`

4. Expo sunucusunu başlatın:
```bash
npm start
```

5. Expo Go uygulamasını telefonunuza indirin ve QR kodu tarayın.

## API Endpoints

### Kimlik Doğrulama
- `POST /api/auth/register` - Kullanıcı kaydı
- `POST /api/auth/login` - Giriş yapma
- `GET /api/auth/profile` - Kullanıcı profili (JWT gerekli)

### Ürünler
- `GET /api/products` - Tüm ürünleri listele
- `GET /api/products/:id` - Ürün detayı
- `GET /api/products/user/my-products` - Kullanıcının ürünleri (JWT gerekli)
- `POST /api/products` - Yeni ürün ekle (JWT gerekli)
- `PUT /api/products/:id` - Ürün güncelle (JWT gerekli)
- `DELETE /api/products/:id` - Ürün sil (JWT gerekli)

### Kategoriler
- `GET /api/categories` - Tüm kategorileri listele
- `GET /api/categories/:id` - Kategori detayı

## Özellikler

### Kimlik Doğrulama
- Kullanıcı kaydı ve girişi
- JWT tabanlı kimlik doğrulama
- Bcrypt ile şifre hashleme

### Web Dashboard
- Kullanıcı girişi
- Kendi ilanlarını görüntüleme
- İlan ekleme, düzenleme ve silme
- Responsive tasarım

### Mobil Uygulama
- Ürün listeleme (FlatList)
- Ürün detay görüntüleme
- Yeni ilan verme
- Kayıt olma ve giriş yapma
- Giriş yapmamış kullanıcılar için iletişim bilgisi gizleme
- iOS ve Android uyumluluğu (SafeAreaView, Platform.OS)

### Veritabanı
- Users tablosu: Kullanıcı bilgileri
- Categories tablosu: Ürün kategorileri
- Products tablosu: İlanlar

## Güvenlik

- Parolalar Bcrypt ile hash'lenmiş olarak saklanır
- JWT token ile korumalı rotalar
- Veritabanı şifreleri `.env` dosyasından okunur
- CORS yapılandırması

## Geliştirme Notları

### Mobil Uygulama için IP Adresi
Expo kullanırken, mobil cihazınızın bilgisayarınıza bağlanabilmesi için `API_BASE_URL` değerinde localhost yerine bilgisayarınızın yerel IP adresini kullanmanız gerekir.

### Veritabanı Bağlantısı
PostgreSQL'in çalıştığından ve veritabanının oluşturulduğundan emin olun.

## Lisans

Bu proje YMH3007 dersi için geliştirilmiştir.

## Yazar

[Öğrenci Adı Soyadı]
[Öğrenci Numarası]
