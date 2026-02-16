import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { Calendar, Lock, User } from "lucide-react";
import { toast } from "sonner";

export function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.username || !formData.password) {
      toast.error('Username dan password harus diisi');
      return;
    }

    // Mock login - in real app, this would call an API
    if (formData.username === 'admin' && formData.password === 'admin') {
      localStorage.setItem('isAuthenticated', 'true');
      toast.success('Login berhasil!');
      navigate('/setup');
    } else {
      toast.error('Username atau password salah');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-500 via-emerald-600 to-green-700 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 p-8 text-center">
          <div className="inline-flex p-4 bg-white rounded-full mb-4">
            <Calendar size={48} className="text-emerald-600" />
          </div>
          <h1 className="text-3xl text-gray-900">Jadwalku</h1>
          <p className="text-gray-700 mt-2">Sistem Penjadwalan Sekolah</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div>
            <label className="block text-sm text-gray-700 mb-2">
              Username
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="Masukkan username"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="Masukkan password"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors shadow-md"
          >
            Login
          </button>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
            <p className="text-sm text-yellow-800">
              <strong>Demo:</strong> username: <code>admin</code>, password: <code>admin</code>
            </p>
          </div>

          <div className="text-center pt-4">
            <p className="text-sm text-gray-600">
              Belum punya akun?{' '}
              <Link to="/register" className="text-emerald-600 hover:text-emerald-700">
                Daftar di sini
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}