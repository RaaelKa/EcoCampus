# EcoCampus Proje Raporu Hazırlama Rehberi

Bu dokümanda, proje raporunuzda cevaplamanız gereken sorular ve hazırlamanız gereken bölümler detaylı olarak açıklanmıştır.

## 📋 Rapor İçeriği ve Cevaplanması Gereken Sorular

### 1. Kapak Sayfası

**Cevaplanması Gereken Sorular:**
- Ders adı nedir? → **YMH3007 Fullstack Web ve Mobil Uygulama Geliştirme**
- Proje adı nedir? → **EcoCampus (Sürdürülebilir Kampüs Pazaryeri)**
- Öğrenci adı ve soyadı nedir? → **[KENDİ ADINIZ VE SOYADINIZ]**
- Öğrenci numarası nedir? → **[KENDİ ÖĞRENCİ NUMARANIZ]**
- GitHub repo linki nedir? → **[GitHub repo URL'niz - Büyük puntolarla, tıklanabilir link olarak]**

**Örnek Format:**
```
KONYA GIDA VE TARIM ÜNİVERSİTESİ
YAZILIM MÜHENDİSLİĞİ BÖLÜMÜ

DERS: YMH3007 Fullstack Web ve Mobil Uygulama Geliştirme
Final Projesi

Proje Adı: EcoCampus (Sürdürülebilir Kampüs Pazaryeri)

Öğrenci: [Adınız Soyadınız]
Numara: [Öğrenci Numaranız]

GitHub Repository:
https://github.com/kullaniciadi/ecocampus
```

---

### 2. Giriş Bölümü

**Cevaplanması Gereken Sorular:**

#### 2.1. Projenin Amacı
- EcoCampus nedir ve ne amaçla geliştirilmiştir?
- Hangi problemi çözmeyi hedefliyor?
- Kimler için tasarlandı?

**Örnek Cevap:**
```
EcoCampus, üniversite öğrencilerinin kullanmadıkları ders materyallerini, 
kitaplarını veya eşyalarını satabilecekleri ya da ihtiyaç sahiplerine 
ücretsiz bağışlayabilecekleri bir platformdur. Bu proje, döngüsel ekonomi 
ve öğrenci dayanışması temasıyla geliştirilmiştir. Temel amacı, öğrenciler 
arasında kaynak paylaşımını kolaylaştırmak ve sürdürülebilir bir kampüs 
ortamı oluşturmaktır.
```

#### 2.2. Kullanılan Teknolojilerin Kısa Özeti
- Backend için hangi teknolojiler kullanıldı?
- Frontend Web için hangi teknolojiler kullanıldı?
- Mobil uygulama için hangi teknolojiler kullanıldı?
- Veritabanı için hangi teknoloji kullanıldı?

**Örnek Cevap:**
```
Bu proje, 3-katmanlı mimari yapısıyla geliştirilmiştir:

Backend: Node.js ve Express.js framework'ü kullanılarak RESTful API 
geliştirilmiştir. MVC (Model-View-Controller) mimarisi uygulanmış, 
kimlik doğrulama için JWT (JSON Web Token), şifre güvenliği için 
Bcrypt kütüphanesi kullanılmıştır.

Frontend Web: React kütüphanesi ve Vite build tool kullanılarak 
yönetim paneli (Dashboard) geliştirilmiştir. React Router ile 
sayfa yönlendirmeleri yapılmıştır.

Mobil Uygulama: React Native ve Expo platformu kullanılarak iOS ve 
Android uyumlu mobil uygulama geliştirilmiştir. React Navigation ile 
ekran geçişleri sağlanmıştır.

Veritabanı: PostgreSQL ilişkisel veritabanı yönetim sistemi kullanılmıştır.
```

---

### 3. Veritabanı Tasarımı (ERD)

**Cevaplanması Gereken Sorular:**
- Hangi tablolar var? (Users, Categories, Products)
- Her tablonun hangi kolonları var?
- Tablolar arasındaki ilişkiler nelerdir? (Foreign Key ilişkileri)
- Primary Key'ler hangi kolonlardır?

**Hazırlanması Gerekenler:**
- Entity-Relationship Diyagramı (ERD)
- pgAdmin'den alınabilir veya draw.io gibi araçlarla çizilebilir
- PK (Primary Key) ve FK (Foreign Key) ilişkileri gösterilmeli

**Örnek Tablo Yapısı:**

**Users Tablosu:**
- id (PK, SERIAL)
- username (VARCHAR, UNIQUE)
- email (VARCHAR, UNIQUE)
- password (VARCHAR - Hash'lenmiş)
- created_at (TIMESTAMP)

**Categories Tablosu:**
- id (PK, SERIAL)
- name (VARCHAR)
- icon (VARCHAR)

**Products Tablosu:**
- id (PK, SERIAL)
- title (VARCHAR)
- price (DECIMAL)
- description (TEXT)
- image_url (VARCHAR)
- user_id (FK → Users.id)
- category_id (FK → Categories.id)
- created_at (TIMESTAMP)

**İlişkiler:**
- Products.user_id → Users.id (Many-to-One)
- Products.category_id → Categories.id (Many-to-One)

---

### 4. Ekran Görüntüleri (Screenshots)

**Cevaplanması Gereken Sorular ve Hazırlanması Gerekenler:**

#### 4.1. Uygulamanın Çalıştığını Kanıtlayan Ekran Görüntüleri

**Web Dashboard için:**
- [ ] Login sayfası ekran görüntüsü
- [ ] Dashboard ana sayfa (ilan listesi)
- [ ] Yeni ilan ekleme formu
- [ ] İlan düzenleme ekranı
- [ ] Başarılı giriş sonrası görünüm

**Mobil Uygulama için:**
- [ ] Ana sayfa (ürün listesi - FlatList)
- [ ] Ürün detay sayfası (giriş yapmamış kullanıcı için)
- [ ] Ürün detay sayfası (giriş yapmış kullanıcı için - iletişim bilgisi görünür)
- [ ] Kayıt olma ekranı
- [ ] Giriş yapma ekranı
- [ ] Yeni ilan verme ekranı

#### 4.2. Yan Yana Karşılaştırma (ÖNEMLİ!)
- **Aynı ürünün** (örneğin "Matematik Kitabı") hem Web Paneli hem de Mobil Uygulama üzerindeki görüntüsü **yan yana** konulmalıdır.
- Bu, veri senkronizasyonunun çalıştığını kanıtlar.

**Örnek Düzen:**
```
┌─────────────────────┬─────────────────────┐
│   Web Dashboard     │  Mobil Uygulama     │
│   Matematik Kitabı  │  Matematik Kitabı    │
│   Fiyat: 50 TL      │  Fiyat: 50 TL       │
│   [Resim]           │  [Resim]             │
└─────────────────────┴─────────────────────┘
```

#### 4.3. Postman ile Login İsteği
- Postman'de `POST /api/auth/login` isteği gösterilmeli
- Request body'de email ve password görünmeli
- Response'da **Token görünecek şekilde** ekran görüntüsü alınmalı
- Status code 200 olmalı

**Örnek Postman Ekran Görüntüsü İçeriği:**
```
POST http://localhost:3000/api/auth/login

Headers:
Content-Type: application/json

Body:
{
  "email": "ornek@email.com",
  "password": "sifre123"
}

Response (200 OK):
{
  "message": "Giriş başarılı",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "username": "kullanici_adi",
    "email": "ornek@email.com"
  }
}
```

---

### 5. API Dokümantasyonu

**Cevaplanması Gereken Sorular:**
- Hangi endpoint'ler var?
- Her endpoint ne işe yarar?
- Hangi HTTP metodları kullanılıyor? (GET, POST, PUT, DELETE)
- Hangi endpoint'ler korumalı? (JWT token gerektiren)
- Request ve Response formatları nasıl?

**Hazırlanması Gerekenler:**

#### 5.1. Kimlik Doğrulama Endpoint'leri
- `POST /api/auth/register` - Kullanıcı kaydı
- `POST /api/auth/login` - Giriş yapma
- `GET /api/auth/profile` - Kullanıcı profili (JWT gerekli)

#### 5.2. Ürün Endpoint'leri
- `GET /api/products` - Tüm ürünleri listele (Herkese açık)
- `GET /api/products/:id` - Ürün detayı (Herkese açık)
- `GET /api/products/user/my-products` - Kullanıcının ürünleri (JWT gerekli)
- `POST /api/products` - Yeni ürün ekle (JWT gerekli)
- `PUT /api/products/:id` - Ürün güncelle (JWT gerekli)
- `DELETE /api/products/:id` - Ürün sil (JWT gerekli)

#### 5.3. Kategori Endpoint'leri
- `GET /api/categories` - Tüm kategorileri listele
- `GET /api/categories/:id` - Kategori detayı

**Format Örneği:**
```
POST /api/products - Yeni ürün ekler
- Açıklama: Giriş yapmış kullanıcılar yeni ürün ilanı oluşturabilir
- Method: POST
- Endpoint: /api/products
- Authentication: JWT Token gerekli
- Request Body: { title, price, description, image_url, category_id }
- Response: Oluşturulan ürün bilgileri
```

**Not:** Detaylı API dokümantasyonu `backend/API_DOCUMENTATION.md` dosyasında mevcuttur.

---

### 6. Sonuç Bölümü

**Cevaplanması Gereken Sorular:**

#### 6.1. Proje Sürecinde Karşılaşılan Zorluklar
- Hangi teknik zorluklarla karşılaştınız?
- Veritabanı tasarımında zorlandığınız noktalar nelerdi?
- Frontend ve Backend entegrasyonunda yaşadığınız sorunlar?
- Mobil uygulama geliştirmede karşılaştığınız zorluklar?
- JWT token yönetiminde yaşadığınız problemler?

**Örnek Cevap:**
```
Proje sürecinde birkaç önemli zorlukla karşılaştım:

1. Veritabanı İlişkileri: Foreign key ilişkilerini doğru kurmak ve 
   cascade delete davranışlarını belirlemek zaman aldı.

2. JWT Token Yönetimi: Token'ların hem web hem mobil uygulamada 
   doğru şekilde saklanması ve her istekte header'a eklenmesi 
   konusunda zorlandım. AsyncStorage ve localStorage kullanımı 
   arasındaki farkları öğrenmek gerekti.

3. Mobil Uygulama API Bağlantısı: Expo kullanırken localhost yerine 
   bilgisayarın IP adresini kullanmak gerektiğini öğrendim. Bu, 
   başlangıçta bağlantı sorunlarına neden oldu.

4. Veri Senkronizasyonu: Aynı veritabanını kullanan web ve mobil 
   uygulamalar arasında veri tutarlılığını sağlamak önemliydi.
```

#### 6.2. Kazanımlar
- Bu projeden ne öğrendiniz?
- Hangi teknolojileri daha iyi anladınız?
- Fullstack geliştirme konusunda neler kazandınız?
- Gelecekteki projeler için hangi deneyimleri edindiniz?

**Örnek Cevap:**
```
Bu proje sayesinde önemli kazanımlar elde ettim:

1. Fullstack Geliştirme: Backend'den frontend'e kadar tüm katmanları 
   anlama ve entegre etme deneyimi kazandım.

2. RESTful API Tasarımı: Doğru endpoint yapısı, HTTP metodları ve 
   status code kullanımı konusunda bilgi sahibi oldum.

3. Güvenlik: JWT token tabanlı kimlik doğrulama, şifre hashleme 
   (Bcrypt) gibi güvenlik konularını uygulamalı olarak öğrendim.

4. Mobil Geliştirme: React Native ve Expo ile cross-platform mobil 
   uygulama geliştirme deneyimi kazandım.

5. Veritabanı Tasarımı: İlişkisel veritabanı tasarımı, foreign key 
   ilişkileri ve veri bütünlüğü konularında pratik yaptım.

6. Proje Yönetimi: Büyük bir projeyi modüler yapıda organize etme 
   ve MVC mimarisini uygulama becerisi kazandım.
```

---

## 📝 Rapor Formatı Önerileri

1. **PDF Formatında** hazırlanmalı
2. **Türkçe** yazılmalı
3. **Profesyonel** bir görünüm olmalı
4. Ekran görüntüleri **net ve okunabilir** olmalı
5. Kod örnekleri varsa **syntax highlighting** kullanılmalı
6. Sayfa numaraları eklenmeli
7. İçindekiler sayfası eklenebilir

---

## ✅ Kontrol Listesi

Raporunuzu teslim etmeden önce kontrol edin:

- [ ] Kapak sayfası tüm bilgileri içeriyor mu?
- [ ] GitHub repo linki çalışıyor mu ve public mi?
- [ ] Giriş bölümünde proje amacı ve teknolojiler açıklanmış mı?
- [ ] ERD diyagramı var mı ve ilişkiler gösterilmiş mi?
- [ ] Web Dashboard ekran görüntüleri var mı?
- [ ] Mobil uygulama ekran görüntüleri var mı?
- [ ] Yan yana karşılaştırma ekran görüntüsü var mı?
- [ ] Postman login isteği ekran görüntüsü var mı ve token görünüyor mu?
- [ ] API dokümantasyonu tüm endpoint'leri içeriyor mu?
- [ ] Sonuç bölümünde zorluklar ve kazanımlar açıklanmış mı?
- [ ] Rapor PDF formatında mı?
- [ ] Tüm ekran görüntüleri net ve okunabilir mi?

---

## 💡 İpuçları

1. **Ekran Görüntüleri:** Windows'ta `Win + Shift + S`, Mac'te `Cmd + Shift + 4` kullanabilirsiniz
2. **ERD Diyagramı:** pgAdmin'de Database → Schema → Tables'a sağ tıklayıp "ERD Tool" kullanabilirsiniz
3. **Postman:** Collection oluşturup tüm endpoint'leri test edebilirsiniz
4. **PDF Oluşturma:** Word, Google Docs veya LaTeX kullanabilirsiniz

---

**Başarılar dilerim! 🚀**
