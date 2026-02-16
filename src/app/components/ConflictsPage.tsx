import { AlertTriangle, AlertCircle, Info, Calendar, User, DoorOpen } from "lucide-react";
import { conflicts, schedules } from "../data/mockData";

export function ConflictsPage() {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'tinggi':
        return 'bg-red-50 border-red-200 text-red-900';
      case 'sedang':
        return 'bg-yellow-50 border-yellow-200 text-yellow-900';
      case 'rendah':
        return 'bg-blue-50 border-blue-200 text-blue-900';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-900';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'tinggi':
        return <AlertTriangle size={24} className="text-red-600" />;
      case 'sedang':
        return <AlertCircle size={24} className="text-yellow-600" />;
      case 'rendah':
        return <Info size={24} className="text-blue-600" />;
      default:
        return <AlertCircle size={24} className="text-gray-600" />;
    }
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'tinggi':
        return <span className="px-3 py-1 bg-red-100 text-red-700 text-xs rounded-full">Tinggi</span>;
      case 'sedang':
        return <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-full">Sedang</span>;
      case 'rendah':
        return <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">Rendah</span>;
      default:
        return <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">-</span>;
    }
  };

  const getConflictSchedules = (scheduleIds: string[]) => {
    return schedules.filter(s => scheduleIds.includes(s.id));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl text-gray-900 font-bold">Deteksi Bentrok</h2>
          <p className="text-sm md:text-base text-gray-600 mt-1">
            Identifikasi dan selesaikan konflik penjadwalan
          </p>
        </div>
        <button className="flex items-center justify-center gap-2 px-5 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors shadow-md w-full md:w-auto">
          <AlertTriangle size={18} />
          <span>Deteksi Ulang</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl shadow-sm border-l-4 border-orange-500">
          <div className="text-gray-600 text-sm">Total Konflik</div>
          <div className="text-3xl text-gray-900 mt-1">{conflicts.length}</div>
        </div>
        <div className="bg-white p-5 rounded-xl shadow-sm border-l-4 border-red-500">
          <div className="text-gray-600 text-sm">Keparahan Tinggi</div>
          <div className="text-3xl text-gray-900 mt-1">
            {conflicts.filter(c => c.tingkatKeparahan === 'tinggi').length}
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl shadow-sm border-l-4 border-yellow-500">
          <div className="text-gray-600 text-sm">Keparahan Sedang</div>
          <div className="text-3xl text-gray-900 mt-1">
            {conflicts.filter(c => c.tingkatKeparahan === 'sedang').length}
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl shadow-sm border-l-4 border-blue-500">
          <div className="text-gray-600 text-sm">Keparahan Rendah</div>
          <div className="text-3xl text-gray-900 mt-1">
            {conflicts.filter(c => c.tingkatKeparahan === 'rendah').length}
          </div>
        </div>
      </div>

      {/* Info Banner */}
      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl p-5">
        <div className="flex items-start gap-3">
          <AlertTriangle className="text-yellow-600 flex-shrink-0 mt-1" size={20} />
          <div>
            <h3 className="text-yellow-900">Perhatian!</h3>
            <p className="text-sm text-yellow-800 mt-1">
              Sistem menemukan {conflicts.length} konflik penjadwalan yang perlu diselesaikan.
              Silakan tinjau dan perbaiki jadwal yang bentrok untuk menghindari masalah operasional.
            </p>
          </div>
        </div>
      </div>

      {/* Conflicts List */}
      <div className="space-y-4">
        {conflicts.map((conflict) => {
          const conflictSchedules = getConflictSchedules(conflict.scheduleIds);

          return (
            <div
              key={conflict.id}
              className={`border-2 rounded-xl p-6 ${getSeverityColor(conflict.tingkatKeparahan)}`}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  {getSeverityIcon(conflict.tingkatKeparahan)}
                </div>

                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg">
                          {conflict.tipe === 'guru-bentrok' && 'Guru Mengajar di 2 Kelas Sekaligus'}
                          {conflict.tipe === 'ruang-bentrok' && 'Ruang Digunakan 2 Kelas Sekaligus'}
                          {conflict.tipe === 'jam-melebihi' && 'Jam Mengajar Melebihi Batas'}
                        </h3>
                        {getSeverityBadge(conflict.tingkatKeparahan)}
                      </div>
                      <p className="text-sm">{conflict.deskripsi}</p>
                    </div>
                  </div>

                  {/* Affected Schedules */}
                  {conflictSchedules.length > 0 && (
                    <div className="mt-4 space-y-2">
                      <h4 className="text-sm font-medium">Jadwal yang Terdampak:</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {conflictSchedules.map((schedule) => (
                          <div
                            key={schedule.id}
                            className="bg-white/80 backdrop-blur rounded-lg p-4 border border-gray-200"
                          >
                            <div className="space-y-2">
                              <div className="flex items-center gap-2">
                                <Calendar size={16} className="text-gray-500" />
                                <span className="text-sm">
                                  {schedule.hari}, {schedule.jamMulai} - {schedule.jamSelesai}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <User size={16} className="text-gray-500" />
                                <span className="text-sm">
                                  {schedule.mataPelajaran} - {schedule.guru}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <DoorOpen size={16} className="text-gray-500" />
                                <span className="text-sm">
                                  Kelas {schedule.kelas} - {schedule.ruang}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex flex-wrap gap-3 mt-4">
                    <button className="flex-1 md:flex-none px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                      Lihat Detail
                    </button>
                    <button className="flex-1 md:flex-none px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors text-sm">
                      Perbaiki
                    </button>
                    <button className="flex-1 md:flex-none px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors text-sm">
                      Abaikan
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {conflicts.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12">
          <div className="text-center">
            <div className="inline-flex p-4 bg-green-100 rounded-full mb-4">
              <AlertCircle size={32} className="text-green-600" />
            </div>
            <h3 className="text-xl text-gray-900 mb-2">Tidak Ada Konflik</h3>
            <p className="text-gray-600">
              Semua jadwal sudah valid dan tidak ditemukan bentrokan.
            </p>
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 overflow-x-auto">
        <h3 className="text-sm text-gray-700 mb-3 font-medium">Tingkat Keparahan:</h3>
        <div className="flex gap-6 min-w-max">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-500 rounded"></div>
            <span className="text-sm text-gray-600">Tinggi - Harus segera diperbaiki</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-yellow-500 rounded"></div>
            <span className="text-sm text-gray-600">Sedang - Perlu perhatian</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-500 rounded"></div>
            <span className="text-sm text-gray-600">Rendah - Informasi</span>
          </div>
        </div>
      </div>
    </div>
  );
}