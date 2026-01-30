# 🏥 Clinic Management System (Mini App)

Aplikasi manajemen klinik sederhana yang dibangun dengan **React**, **Tailwind CSS**, dan **GraphQL (Client-side Mocking)**. Proyek ini mendemonstrasikan integrasi Apollo Client untuk mengelola data tanpa memerlukan server backend terpisah.

## 🚀 Fitur Utama

- **Daftar Pasien**: Menampilkan list pasien dengan fitur pencarian dan pagination.
- **Detail Pasien**: Informasi profil lengkap beserta riwayat kunjungan pasien.
- **Form Pasien (Create & Edit)**: Manajemen data pasien menggunakan GraphQL Mutation.
- **Calendar View**: Visualisasi jadwal janji temu pasien (Daily/Weekly).
- **Workflow Builder**: Fitur untuk menyusun langkah-langkah layanan klinik.
- **Kompleksitas Tambahan**:
  - ✅ **Pagination** pada daftar pasien.
  - ✅ **Debounced Search** untuk efisiensi query.
  - ✅ **Role Base UI** untuk restricted action berdasarkan role user.

## 🛠️ Tech Stack

- **Frontend**: React (Vite)
- **Styling**: Tailwind CSS
- **GraphQL Client**: Apollo Client
- **Mocking Tool**: `@graphql-tools/mock` & `SchemaLink` (Zero-backend setup)
- **State Management**: Zustand
- **Icons**: Lucide React

## 📦 Prasyarat

Pastikan Anda sudah menginstal:

- [Node.js](https://nodejs.org/) (Versi 18 atau terbaru)
- npm atau yarn

## 🛠️ Cara Menjalankan Proyek

1. **Clone Repository**

```
git clone [https://github.com/Riko-firmando/clinic-app.git](https://github.com/Riko-firmando/clinic-app.git)
```

2. **Masuk ke direktori proyek**

```
cd clinic-app
```

3. **Instal semua dependensi**

```
npm install
```

4. **Jalankan aplikasi dalam mode development**

```
npm run dev
```

## 🔐 Akun Demonstrasi (Role-based UI)

Aplikasi ini memiliki fitur otentikasi sederhana untuk mendemonstrasikan perbedaan hak akses antara **Admin** (Full Access) dan **Staff** (View Only/Restricted).

| Nama           | Email              | Password   | Role                                   |
| :------------- | :----------------- | :--------- | :------------------------------------- |
| **Riko Admin** | `admin@clinic.com` | `admin123` | **Admin** (Dapat menambah/edit pasien) |
| **Riko Staff** | `staff@clinic.com` | `staff123` | **Staff** (Hanya dapat melihat data)   |

> **Note**: Role Admin memiliki akses penuh untuk fitur Create, Edit, dan Delete, sementara Role Staff memiliki batasan pada aksi-aksi tersebut sesuai dengan kebijakan Role-based UI yang diimplementasikan.
