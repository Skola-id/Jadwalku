import { Outlet, Link, useLocation, useNavigate } from "react-router";
import { Calendar, Users, DoorOpen, AlertTriangle, Menu, LogOut, Settings } from "lucide-react";
import { useState, useEffect } from "react";

export function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [schoolName, setSchoolName] = useState('SMP Nusantara');
  const [semester, setSemester] = useState('Semester Genap 2025/2026');

  useEffect(() => {
    const saved = localStorage.getItem('setupData');
    if (saved) {
      const data = JSON.parse(saved);
      if (data.schoolName) {
        setSchoolName(data.schoolName);
      }
      if (data.semester && data.academicYear) {
        setSemester(`Semester ${data.semester} ${data.academicYear}`);
      }
    }
  }, []);

  const navigation = [
    { name: 'Dashboard Jadwal', href: '/app/dashboard', icon: Calendar },
    { name: 'Daftar Guru', href: '/app/guru', icon: Users },
    { name: 'Daftar Ruang', href: '/app/ruang', icon: DoorOpen },
    { name: 'Deteksi Bentrok', href: '/app/bentrok', icon: AlertTriangle },
  ];

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar - Fixed full width */}
      <nav className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white shadow-lg fixed top-0 left-0 right-0 z-50">
        <div className="w-full px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 hover:bg-emerald-500 rounded-lg transition-colors"
              >
                <Menu size={24} />
              </button>
              <div>
                <h1 className="text-2xl">Jadwalku</h1>
                <p className="text-sm text-emerald-100">{schoolName} - Admin TU & Waka Kurikulum</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="px-4 py-2 bg-yellow-400 text-emerald-900 rounded-lg">
                <span className="text-sm">{semester}</span>
              </div>
              <button
                onClick={() => navigate('/setup')}
                className="p-2 hover:bg-emerald-500 rounded-lg transition-colors"
                title="Setup Data"
              >
                <Settings size={20} />
              </button>
              <button
                onClick={handleLogout}
                className="p-2 hover:bg-emerald-500 rounded-lg transition-colors"
                title="Logout"
              >
                <LogOut size={20} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex pt-[88px]">
        {/* Sidebar */}
        <aside
          className={`bg-white shadow-lg transition-all duration-300 fixed left-0 top-[88px] bottom-0 ${
            sidebarOpen ? 'w-64' : 'w-0'
          } overflow-hidden`}
        >
          <nav className="p-4 space-y-2">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    isActive
                      ? 'bg-emerald-100 text-emerald-700 shadow-sm'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <item.icon size={20} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className={`flex-1 p-6 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-0'}`}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}