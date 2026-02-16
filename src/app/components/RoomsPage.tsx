import { Search, Edit2, Trash2, Users, FlaskConical, MonitorSmartphone, Home } from "lucide-react";
import { useState } from "react";
import { rooms, Room } from "../data/mockData";

const getRoomIcon = (tipe: Room['tipe']) => {
  switch (tipe) {
    case 'kelas':
      return Home;
    case 'lab-komputer':
      return MonitorSmartphone;
    case 'lab-ipa':
      return FlaskConical;
    case 'aula':
      return Users;
    default:
      return Home;
  }
};

const getRoomTypeLabel = (tipe: Room['tipe']) => {
  switch (tipe) {
    case 'kelas':
      return 'Kelas Biasa';
    case 'lab-komputer':
      return 'Lab Komputer';
    case 'lab-ipa':
      return 'Lab IPA';
    case 'aula':
      return 'Aula';
    default:
      return tipe;
  }
};

export function RoomsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | Room['tipe']>('all');

  const filteredRooms = rooms.filter(room => {
    const matchesSearch = room.nama.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === 'all' || room.tipe === typeFilter;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl text-gray-900 font-bold">Daftar Ruang</h2>
          <p className="text-sm md:text-base text-gray-600 mt-1">
            Kelola data ruang kelas dan fasilitas
          </p>
        </div>
        <button className="flex items-center justify-center gap-2 px-5 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors shadow-md w-full md:w-auto">
          <span>Tambah Ruang</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl shadow-sm border-l-4 border-emerald-500">
          <div className="text-gray-600 text-sm">Total Ruang</div>
          <div className="text-3xl text-gray-900 mt-1">{rooms.length}</div>
        </div>
        <div className="bg-white p-5 rounded-xl shadow-sm border-l-4 border-blue-500">
          <div className="text-gray-600 text-sm">Kelas Biasa</div>
          <div className="text-3xl text-gray-900 mt-1">
            {rooms.filter(r => r.tipe === 'kelas').length}
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl shadow-sm border-l-4 border-purple-500">
          <div className="text-gray-600 text-sm">Laboratorium</div>
          <div className="text-3xl text-gray-900 mt-1">
            {rooms.filter(r => r.tipe.includes('lab')).length}
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl shadow-sm border-l-4 border-yellow-500">
          <div className="text-gray-600 text-sm">Total Kapasitas</div>
          <div className="text-3xl text-gray-900 mt-1">
            {rooms.reduce((acc, r) => acc + r.kapasitas, 0)}
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Cari ruang kelas..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value as any)}
            className="px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 w-full md:w-auto"
          >
            <option value="all">Semua Tipe</option>
            <option value="kelas">Kelas Biasa</option>
            <option value="lab-komputer">Lab Komputer</option>
            <option value="lab-ipa">Lab IPA</option>
            <option value="aula">Aula</option>
          </select>
        </div>
      </div>

      {/* Grid View */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredRooms.map((room) => {
          const Icon = getRoomIcon(room.tipe);
          return (
            <div
              key={room.id}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-emerald-100 rounded-lg">
                    <Icon size={24} className="text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="text-lg text-gray-900">{room.nama}</h3>
                    <p className="text-sm text-gray-600">{getRoomTypeLabel(room.tipe)}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between py-2 border-t border-gray-100">
                  <span className="text-sm text-gray-600">Kapasitas</span>
                  <span className="text-sm text-gray-900 flex items-center gap-2">
                    <Users size={16} className="text-gray-400" />
                    {room.kapasitas} siswa
                  </span>
                </div>

                <div className="flex items-center justify-between py-2 border-t border-gray-100">
                  <span className="text-sm text-gray-600">Status</span>
                  <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded">
                    Tersedia
                  </span>
                </div>
              </div>

              <div className="flex gap-2 mt-4 pt-4 border-t border-gray-200">
                <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 text-blue-600 border border-blue-200 hover:bg-blue-50 rounded-lg transition-colors">
                  <Edit2 size={16} />
                  Edit
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 text-red-600 border border-red-200 hover:bg-red-50 rounded-lg transition-colors">
                  <Trash2 size={16} />
                  Hapus
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredRooms.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          Tidak ada ruang yang ditemukan
        </div>
      )}
    </div>
  );
}
