import { useNavigate } from "react-router";
import { Calendar, BookOpen, Users, Clock, CheckCircle, Sparkles, ArrowRight, LayoutDashboard, Settings, AlertTriangle, Zap, Target, TrendingUp } from "lucide-react";
import { motion } from "motion/react";

export function LandingPage() {
  const navigate = useNavigate();

  const features = [
    {
      icon: LayoutDashboard,
      title: "Dashboard Interaktif",
      description: "Kelola jadwal dengan tampilan visual yang mudah dipahami",
      color: "from-emerald-400 to-emerald-600"
    },
    {
      icon: Users,
      title: "Manajemen Guru & Kelas",
      description: "Atur data guru, kelas, ruang, dan mata pelajaran dengan mudah",
      color: "from-blue-400 to-blue-600"
    },
    {
      icon: AlertTriangle,
      title: "Deteksi Bentrok Otomatis",
      description: "Sistem akan mendeteksi jadwal yang bentrok secara otomatis",
      color: "from-red-400 to-red-600"
    },
    {
      icon: Sparkles,
      title: "Generate Jadwal Otomatis",
      description: "Buat jadwal lengkap secara otomatis dengan algoritma cerdas",
      color: "from-purple-400 to-purple-600"
    },
    {
      icon: Calendar,
      title: "Drag & Drop",
      description: "Pindahkan jadwal dengan mudah menggunakan drag and drop",
      color: "from-yellow-400 to-yellow-600"
    },
    {
      icon: Clock,
      title: "Fleksibel & Responsif",
      description: "Akses dari desktop atau tablet, kapan saja dimana saja",
      color: "from-pink-400 to-pink-600"
    }
  ];

  const stats = [
    { icon: Zap, value: "100%", label: "Gratis Selamanya", color: "text-yellow-500" },
    { icon: Target, value: "5 Menit", label: "Setup Cepat", color: "text-emerald-500" },
    { icon: TrendingUp, value: "Auto", label: "Generate Otomatis", color: "text-blue-500" }
  ];

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-xl shadow-sm z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.div 
              className="flex items-center gap-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="p-2.5 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-2xl shadow-lg shadow-emerald-200">
                <Calendar size={28} className="text-white" />
              </div>
              <div>
                <h1 className="text-2xl text-gray-900">Jadwalku</h1>
                <p className="text-xs text-gray-500">Penjadwalan Sekolah</p>
              </div>
            </motion.div>
            <motion.div 
              className="flex items-center gap-3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <button
                onClick={() => navigate('/login')}
                className="px-6 py-2.5 text-gray-700 hover:bg-gray-100 rounded-full transition-all font-medium"
              >
                Login
              </button>
              <button
                onClick={() => navigate('/register')}
                className="px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-full hover:shadow-lg hover:shadow-emerald-200 transition-all font-medium"
              >
                Daftar Gratis
              </button>
            </motion.div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        {/* Background Blobs */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-emerald-200/40 to-emerald-300/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-yellow-200/40 to-yellow-300/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              className="space-y-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div 
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-yellow-100 to-yellow-50 border border-yellow-200 text-yellow-800 rounded-full text-sm font-medium shadow-sm"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Sparkles size={16} />
                <span>Solusi Modern untuk Sekolah</span>
              </motion.div>

              <h1 className="text-5xl lg:text-6xl xl:text-7xl text-gray-900 leading-[1.1]">
                Kelola Jadwal Sekolah{" "}
                <span className="bg-gradient-to-r from-emerald-500 to-emerald-700 bg-clip-text text-transparent">
                  Lebih Mudah
                </span>
              </h1>

              <p className="text-xl text-gray-600 leading-relaxed">
                Platform penjadwalan yang dirancang khusus untuk Admin TU dan Waka Kurikulum. 
                Buat jadwal pelajaran lengkap hanya dalam hitungan menit! ⚡
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <motion.button
                  onClick={() => navigate('/register')}
                  className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-full hover:shadow-xl hover:shadow-emerald-200 transition-all text-lg font-medium group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>Mulai Sekarang</span>
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </motion.button>
                <motion.button
                  onClick={() => navigate('/login')}
                  className="px-8 py-4 border-2 border-gray-900 text-gray-900 rounded-full hover:bg-gray-900 hover:text-white transition-all text-lg font-medium"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Sudah Punya Akun
                </motion.button>
              </div>

              <div className="flex items-center gap-8 pt-4">
                {stats.map((stat, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + idx * 0.1 }}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <stat.icon size={20} className={stat.color} />
                      <div className="text-3xl text-gray-900 font-bold">{stat.value}</div>
                    </div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div 
              className="relative"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {/* Floating Card with Schedule Preview */}
              <div className="relative">
                {/* Background decoration */}
                <div className="absolute -top-8 -right-8 w-72 h-72 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-[3rem] rotate-6 opacity-20"></div>
                <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-[3rem] -rotate-6 opacity-20"></div>
                
                {/* Main Card */}
                <div className="relative bg-white rounded-[2.5rem] shadow-2xl shadow-gray-300/50 p-8 border border-gray-100">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-2xl flex items-center justify-center">
                          <Calendar size={24} className="text-white" />
                        </div>
                        <div>
                          <span className="text-lg font-semibold text-gray-900">Senin</span>
                          <p className="text-sm text-gray-500">8 Jam Pelajaran</p>
                        </div>
                      </div>
                      <div className="px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium">
                        Kelas 7A
                      </div>
                    </div>

                    {[
                      { time: "07:00 - 07:45", subject: "Matematika", teacher: "Bu Siti", room: "7A", color: "from-blue-500 to-blue-600" },
                      { time: "07:45 - 08:30", subject: "Bahasa Indonesia", teacher: "Pak Ahmad", room: "7A", color: "from-purple-500 to-purple-600" },
                      { time: "08:30 - 09:15", subject: "IPA", teacher: "Bu Rahma", room: "Lab IPA", color: "from-emerald-500 to-emerald-600" }
                    ].map((item, idx) => (
                      <motion.div 
                        key={idx}
                        className="p-5 bg-gradient-to-br from-gray-50 to-white border border-gray-100 rounded-2xl hover:shadow-md transition-all cursor-pointer group"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + idx * 0.1 }}
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <Clock size={14} className="text-gray-400" />
                            <span className="text-xs text-gray-600 font-medium">{item.time}</span>
                          </div>
                          <span className={`px-3 py-1 bg-gradient-to-r ${item.color} text-white rounded-full text-xs font-medium shadow-sm`}>
                            {item.room}
                          </span>
                        </div>
                        <div className="text-base font-semibold text-gray-900 mb-1">{item.subject}</div>
                        <div className="text-sm text-gray-600">{item.teacher}</div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6 bg-gradient-to-b from-gray-50 to-white relative">
        <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl lg:text-5xl text-gray-900 mb-4 font-bold">
              Fitur Lengkap untuk{" "}
              <span className="bg-gradient-to-r from-emerald-500 to-blue-500 bg-clip-text text-transparent">
                Sekolah Anda
              </span>
            </h2>
            <p className="text-xl text-gray-600">Semua yang Anda butuhkan dalam satu platform</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, idx) => (
              <motion.div 
                key={idx}
                className="group relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -8 }}
              >
                <div className="relative p-8 bg-white rounded-3xl border border-gray-100 hover:shadow-xl hover:shadow-gray-200/50 transition-all h-full">
                  {/* Icon with gradient */}
                  <div className={`inline-flex p-4 bg-gradient-to-br ${feature.color} rounded-2xl mb-5 shadow-lg group-hover:scale-110 transition-transform`}>
                    <feature.icon size={28} className="text-white" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  
                  {/* Hover effect */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-b-3xl scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 px-6 relative overflow-hidden">
        {/* Background with gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 via-emerald-600 to-green-600"></div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-yellow-400/30 to-yellow-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-emerald-700/40 to-emerald-800/30 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl lg:text-5xl text-white mb-6 font-bold leading-tight">
                Mengapa Memilih Jadwalku?
              </h2>
              <p className="text-xl text-emerald-100 mb-10 leading-relaxed">
                Sistem penjadwalan yang telah dipercaya oleh puluhan sekolah di Indonesia
              </p>
              
              <div className="space-y-5">
                {[
                  "Hemat waktu dalam penyusunan jadwal",
                  "Minimalisir kesalahan dan bentrok jadwal",
                  "Tampilan profesional dan mudah dipahami",
                  "Data tersimpan aman dan terorganisir",
                  "Import data dari CSV/Excel"
                ].map((benefit, idx) => (
                  <motion.div 
                    key={idx}
                    className="flex items-start gap-4 group"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <div className="p-2 bg-yellow-400 rounded-xl group-hover:scale-110 transition-transform flex-shrink-0">
                      <CheckCircle size={20} className="text-emerald-900" />
                    </div>
                    <span className="text-lg text-white pt-1">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div 
              className="grid grid-cols-1 gap-6"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {[
                { icon: BookOpen, title: "Setup Mudah", desc: "Panduan langkah demi langkah", color: "from-yellow-400 to-yellow-500" },
                { icon: Settings, title: "Import CSV/Excel", desc: "Upload data dalam sekali klik", color: "from-blue-400 to-blue-500" },
                { icon: Calendar, title: "Real-time Updates", desc: "Perubahan langsung tersimpan", color: "from-purple-400 to-purple-500" }
              ].map((item, idx) => (
                <motion.div 
                  key={idx}
                  className="flex items-center gap-5 p-6 bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 hover:bg-white/20 transition-all group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ scale: 1.03 }}
                >
                  <div className={`p-4 bg-gradient-to-br ${item.color} rounded-2xl group-hover:scale-110 transition-transform shadow-lg`}>
                    <item.icon size={32} className="text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white mb-1">{item.title}</div>
                    <div className="text-emerald-100">{item.desc}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 via-yellow-500 to-orange-400"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-white/20 to-transparent rounded-full blur-3xl"></div>
        
        <motion.div 
          className="max-w-4xl mx-auto text-center relative z-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl lg:text-5xl text-gray-900 mb-6 font-bold leading-tight">
            Siap Membuat Jadwal Sekolah Anda?
          </h2>
          <p className="text-xl text-gray-800 mb-10 leading-relaxed">
            Bergabunglah dengan sekolah-sekolah yang sudah merasakan kemudahan Jadwalku
          </p>
          
          <motion.button
            onClick={() => navigate('/register')}
            className="inline-flex items-center gap-3 px-12 py-5 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-full hover:shadow-2xl hover:shadow-emerald-300 transition-all text-xl font-bold group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Daftar Sekarang - Gratis!</span>
            <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
          </motion.button>
          
          <p className="text-sm text-gray-800 mt-6 flex items-center justify-center gap-2 flex-wrap">
            <CheckCircle size={16} className="text-emerald-700" />
            <span>Tidak perlu kartu kredit</span>
            <span className="text-gray-600">•</span>
            <CheckCircle size={16} className="text-emerald-700" />
            <span>Setup dalam 5 menit</span>
            <span className="text-gray-600">•</span>
            <CheckCircle size={16} className="text-emerald-700" />
            <span>Support tersedia</span>
          </p>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-gray-900 relative">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-2xl shadow-lg">
                <Calendar size={24} className="text-white" />
              </div>
              <div>
                <span className="text-xl text-white font-bold">Jadwalku</span>
                <p className="text-sm text-gray-400">Sistem Penjadwalan Sekolah Modern</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm">
              © 2026 Jadwalku. Dibuat dengan ❤️ untuk pendidikan Indonesia.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
