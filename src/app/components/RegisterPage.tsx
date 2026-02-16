import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { Calendar, Lock, User, Mail } from "lucide-react";
import { toast } from "sonner";

export function RegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    schoolName: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validasi
    if (!formData.fullName || !formData.email || !formData.username || !formData.password || !formData.schoolName) {
      toast.error('Semua field harus diisi');
      return;
    }

    if (formData.password.length < 6) {
      toast.error('Password minimal 6 karakter');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error('Password tidak cocok');
      return;
    }

    // Mock registration - in real app, this would call an API
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('setupData', JSON.stringify({
      schoolName: formData.schoolName,
      semester: '',
      academicYear: ''
    }));
    
    toast.success('Registrasi berhasil! Selamat datang di Jadwalku');
    navigate('/setup');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-500 via-emerald-600 to-green-700 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 p-8 text-center">
          <div className="inline-flex p-4 bg-white rounded-full mb-4">
            <Calendar size={48} className="text-emerald-600" />
          </div>
          <h1 className="text-3xl text-gray-900">Daftar ke Jadwalku</h1>
          <p className="text-gray-700 mt-2">Mulai kelola jadwal sekolah dengan mudah</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-8 space-y-5">
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm text-gray-700 mb-2">
                Nama Lengkap <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="Nama lengkap Anda"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2">
                Email <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="email@example.com"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-2">
              Nama Sekolah <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.schoolName}
              onChange={(e) => setFormData({ ...formData, schoolName: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="Contoh: SMP Nusantara"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm text-gray-700 mb-2">
                Username <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="Username"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2">
                Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="Minimal 6 karakter"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-2">
              Konfirmasi Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="Ketik ulang password"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors shadow-md"
          >
            Daftar Sekarang
          </button>

          <div className="text-center pt-4">
            <p className="text-sm text-gray-600">
              Sudah punya akun?{' '}
              <Link to="/login" className="text-emerald-600 hover:text-emerald-700">
                Login di sini
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
