# 🎬 CineMatch — Sistem Rekomendasi Film Personal

CineMatch adalah sebuah platform untuk membantu pengguna menemukan film yang sesuai dengan selera mereka secara lebih personal dan mudah. Aplikasi ini dirancang dengan arsitektur terpisah (decoupled), yaitu Backend dan Frontend berjalan secara independen. Bagian Backend dibangun menggunakan Laravel sebagai REST API yang bertugas mengelola data dan logika sistem, sedangkan Frontend menggunakan React.js untuk menampilkan antarmuka pengguna yang interaktif dan responsif.

Tujuan utama dari CineMatch adalah memberikan rekomendasi film yang lebih tepat sasaran dibandingkan pencarian biasa. Sistem ini memanfaatkan pendekatan Machine Learning untuk menganalisis data dan preferensi pengguna, sehingga dapat menyarankan film yang paling relevan dengan minat masing-masing individu. Dengan cara ini, pengguna tidak perlu lagi bingung memilih film, karena sistem akan membantu menyaring dan merekomendasikan tontonan yang paling sesuai.

---

## ✨ Alur & Fitur Utama

### 👤 Alur Pengguna (User)
* **Pendaftaran Presisi:** Pengguna baru diwajibkan memilih minimal 3 genre favorit untuk membangun profil preferensi dasar.
* **Rekomendasi Cerdas:** Beranda menampilkan daftar rekomendasi film yang dipersonalisasi lengkap dengan persentase tingkat kecocokan (**% Match**).
* **Katalog & Jelajah:** Sistem filter dinamis berdasarkan genre, rating, dan pencarian teks.
* **Sistem Rating:** Pengguna memberikan *rating* (bintang) pada film.

### 🛡️ Alur Administrator (Admin)
* **Dashboard Metrik:** Memantau analitik utama seperti total pengguna, jumlah film, dan interaksi rating harian.
* **Manajemen Master Data:** Operasi CRUD (Tambah, Edit, Hapus) untuk data Katalog Film.
* **Monitoring Machine Learning:** Memantau performa model rekomendasi secara *real-time* (Akurasi, F1-Score, Precision, Recall) dan memiliki otoritas untuk memicu pelatihan ulang (*retrain*) model dengan data terbaru.

---

## 🚀 Teknologi yang Digunakan

### Backend (REST API)
* **Framework:** Laravel 13
* **Autentikasi:** Laravel Sanctum (Token-based Auth)
* **Database:** MySQL
* **Manajemen Paket:** Composer

### Frontend (SPA)
* **Library:** React.js
* **Build Tool:** Vite 
* **Styling:** Tailwind CSS v4
* **HTTP Client:** Axios 

---

## 📁 Struktur Project

Proyek ini dibagi menjadi dua repositori/direktori utama yang berdiri sendiri:

```text
CineMatch/
│
├── backend/                  # Laravel REST API
│   ├── app/                  # Controller, Model, Middleware
│   ├── database/             # Migrasi & Seeder (Data Film & Genre)
│   ├── routes/               # api.php (Routing Endpoint API)
│   └── composer.json
│
└── fe-cinema/                # React Vite Frontend
    ├── public/
    ├── src/
    │   ├── api/              # Konfigurasi Axios & Interceptor
    │   ├── views/            # Halaman UI (Auth, Admin, User, Profile)
    │   ├── App.jsx           # Konfigurasi React Router
    │   └── main.jsx
    ├── package.json
    └── vite.config.js
````

⚙️ Cara Instalasi & Menjalankan Aplikasi
Pastikan perangkat sudah terinstal PHP, Composer, Node.js, dan MySQL.

## 1. Konfigurasi Backend (Laravel)
Buka terminal dan arahkan ke direktori backend:

### 0. Masuk ke folder be
```
cd be-cinema
```

### 1. Instal dependensi PHP
```
composer install
```
### 2. Salin file environment dan atur koneksi database (DB_DATABASE, DB_USERNAME, dll)
```
cp .env.example .env
```
#### Atau

```
copy .env.example .env
```

### 3. Generate Application Key
```
php artisan key:generate
```

### 4. Eksekusi migrasi tabel 
```
php artisan migrate --seed
```

### 5. Jalankan server 
```
php artisan serve
```

## 2. Konfigurasi Frontend (React Vite)
Buka terminal baru dan arahkan ke direktori fe-cinema:

### 0. Masuk ke folder fe
```
cd fe-cinema
```

### 1. Instal semua dependensi Node.js
```
npm install
```

### 2. Jalankan server
```
npm run dev
```

## 📌 Lisensi
### Project ini dibuat untuk kebutuhan pengembangan dan pembelajaran akademik.
