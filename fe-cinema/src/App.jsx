import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Import Layout Baru
import MainLayout from './layouts/MainLayout';
import AdminLayout from './layouts/AdminLayout';

// Import halaman Auth
import Login from './views/Auth/Login';
import Register from './views/Auth/Register';
import ForgotPassword from './views/Auth/ForgotPassword';
import ResetPassword from './views/Auth/ResetPassword';
import VerifyEmail from './views/Auth/VerifyEmail';
import ConfirmPassword from './views/Auth/ConfirmPassword';

// Import halaman User
import Dashboard from './views/User/Dashboard';
import Home from './views/User/Home';
import Jelajahi from './views/User/Jelajahi';
import Profil from './views/User/Profil';
import Riwayat from './views/User/Riwayat';

// Import Halaman Admin
import AdminDashboard from './views/Admin/Dashboard';
import AdminFilm from './views/Admin/Film';
import AdminLaporan from './views/Admin/Laporan';
import AdminModel from './views/Admin/Model';
import AdminUsers from './views/Admin/Users';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Rute Autentikasi */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/confirm-password" element={<ConfirmPassword />} />

        {/* Rute User*/}
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/home" element={<Home />} />
          <Route path="/jelajahi" element={<Jelajahi />} />
          <Route path="/profil" element={<Profil />} />
          <Route path="/riwayat" element={<Riwayat />} />
        </Route>

        {/* Rute Admin*/}
        <Route element={<AdminLayout />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/film" element={<AdminFilm />} />
          <Route path="/admin/laporan" element={<AdminLaporan />} />
          <Route path="/admin/model" element={<AdminModel />} />
          <Route path="/admin/users" element={<AdminUsers />} />
        </Route>

        {/* Rute 404 */}
        <Route path="*" element={
          <div className="min-h-screen bg-[#141414] flex items-center justify-center text-white">
            <h1 className="text-2xl">404 - Halaman Tidak Ditemukan</h1>
          </div>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;