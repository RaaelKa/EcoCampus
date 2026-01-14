# EcoCampus API Dokümantasyonu

## Base URL
```
http://localhost:3000/api
```

## Kimlik Doğrulama

### Kullanıcı Kaydı
**Endpoint:** `POST /api/auth/register`

**Açıklama:** Yeni kullanıcı kaydı oluşturur ve JWT token döner.

**Request Body:**
```json
{
  "username": "kullanici_adi",
  "email": "ornek@email.com",
  "password": "sifre123"
}
```

**Response (201):**
```json
{
  "message": "Kayıt başarılı",
  "token": "jwt_token_here",
  "user": {
    "id": 1,
    "username": "kullanici_adi",
    "email": "ornek@email.com"
  }
}
```

### Giriş Yapma
**Endpoint:** `POST /api/auth/login`

**Açıklama:** Kullanıcı girişi yapar ve JWT token döner.

**Request Body:**
```json
{
  "email": "ornek@email.com",
  "password": "sifre123"
}
```

**Response (200):**
```json
{
  "message": "Giriş başarılı",
  "token": "jwt_token_here",
  "user": {
    "id": 1,
    "username": "kullanici_adi",
    "email": "ornek@email.com"
  }
}
```

### Kullanıcı Profili
**Endpoint:** `GET /api/auth/profile`

**Açıklama:** Giriş yapmış kullanıcının profil bilgilerini döner.

**Headers:**
```
Authorization: Bearer jwt_token_here
```

**Response (200):**
```json
{
  "id": 1,
  "username": "kullanici_adi",
  "email": "ornek@email.com",
  "created_at": "2025-01-01T00:00:00.000Z"
}
```

## Ürünler

### Tüm Ürünleri Listele
**Endpoint:** `GET /api/products`

**Açıklama:** Tüm ürünleri listeler. Herkese açıktır.

**Response (200):**
```json
[
  {
    "id": 1,
    "title": "Matematik Kitabı",
    "price": "50.00",
    "description": "İyi durumda",
    "image_url": "https://example.com/image.jpg",
    "user_id": 1,
    "category_id": 1,
    "created_at": "2025-01-01T00:00:00.000Z",
    "username": "kullanici_adi",
    "email": "ornek@email.com",
    "category_name": "Kitap",
    "category_icon": "📚"
  }
]
```

### Ürün Detayı
**Endpoint:** `GET /api/products/:id`

**Açıklama:** Belirli bir ürünün detaylarını döner. Herkese açıktır.

**Response (200):**
```json
{
  "id": 1,
  "title": "Matematik Kitabı",
  "price": "50.00",
  "description": "İyi durumda",
  "image_url": "https://example.com/image.jpg",
  "user_id": 1,
  "category_id": 1,
  "created_at": "2025-01-01T00:00:00.000Z",
  "username": "kullanici_adi",
  "email": "ornek@email.com",
  "category_name": "Kitap",
  "category_icon": "📚"
}
```

### Kullanıcının Ürünlerini Listele
**Endpoint:** `GET /api/products/user/my-products`

**Açıklama:** Giriş yapmış kullanıcının kendi ürünlerini listeler.

**Headers:**
```
Authorization: Bearer jwt_token_here
```

**Response (200):**
```json
[
  {
    "id": 1,
    "title": "Matematik Kitabı",
    "price": "50.00",
    "description": "İyi durumda",
    "image_url": "https://example.com/image.jpg",
    "user_id": 1,
    "category_id": 1,
    "created_at": "2025-01-01T00:00:00.000Z",
    "category_name": "Kitap",
    "category_icon": "📚"
  }
]
```

### Yeni Ürün Ekle
**Endpoint:** `POST /api/products`

**Açıklama:** Yeni ürün ilanı oluşturur. JWT token gerekir.

**Headers:**
```
Authorization: Bearer jwt_token_here
```

**Request Body:**
```json
{
  "title": "Matematik Kitabı",
  "price": 50.00,
  "description": "İyi durumda matematik kitabı",
  "image_url": "https://example.com/image.jpg",
  "category_id": 1
}
```

**Response (201):**
```json
{
  "id": 1,
  "title": "Matematik Kitabı",
  "price": "50.00",
  "description": "İyi durumda matematik kitabı",
  "image_url": "https://example.com/image.jpg",
  "user_id": 1,
  "category_id": 1,
  "created_at": "2025-01-01T00:00:00.000Z"
}
```

### Ürün Güncelle
**Endpoint:** `PUT /api/products/:id`

**Açıklama:** Mevcut bir ürünü günceller. Sadece ürün sahibi güncelleyebilir.

**Headers:**
```
Authorization: Bearer jwt_token_here
```

**Request Body:**
```json
{
  "title": "Güncellenmiş Başlık",
  "price": 45.00,
  "description": "Güncellenmiş açıklama",
  "image_url": "https://example.com/new-image.jpg",
  "category_id": 1
}
```

**Response (200):**
```json
{
  "id": 1,
  "title": "Güncellenmiş Başlık",
  "price": "45.00",
  "description": "Güncellenmiş açıklama",
  "image_url": "https://example.com/new-image.jpg",
  "user_id": 1,
  "category_id": 1,
  "created_at": "2025-01-01T00:00:00.000Z"
}
```

### Ürün Sil
**Endpoint:** `DELETE /api/products/:id`

**Açıklama:** Bir ürünü siler. Sadece ürün sahibi silebilir.

**Headers:**
```
Authorization: Bearer jwt_token_here
```

**Response (200):**
```json
{
  "message": "Ürün başarıyla silindi.",
  "product": {
    "id": 1,
    "title": "Matematik Kitabı",
    ...
  }
}
```

## Kategoriler

### Tüm Kategorileri Listele
**Endpoint:** `GET /api/categories`

**Açıklama:** Tüm ürün kategorilerini listeler. Herkese açıktır.

**Response (200):**
```json
[
  {
    "id": 1,
    "name": "Kitap",
    "icon": "📚"
  },
  {
    "id": 2,
    "name": "Ders Materyali",
    "icon": "📝"
  }
]
```

### Kategori Detayı
**Endpoint:** `GET /api/categories/:id`

**Açıklama:** Belirli bir kategori detayını döner.

**Response (200):**
```json
{
  "id": 1,
  "name": "Kitap",
  "icon": "📚"
}
```

## Hata Kodları

- `400` - Bad Request: Geçersiz istek
- `401` - Unauthorized: Kimlik doğrulama gerekli
- `403` - Forbidden: Geçersiz token veya yetki yok
- `404` - Not Found: Kaynak bulunamadı
- `500` - Internal Server Error: Sunucu hatası

## Notlar

- Tüm korumalı endpoint'ler için `Authorization: Bearer <token>` header'ı gereklidir.
- Token'lar 7 gün geçerlidir.
- Fiyat 0 TL olan ürünler "Bağış" olarak gösterilir.
- Ürün ekleme ve silme işlemleri sadece giriş yapmış kullanıcılar tarafından yapılabilir.
