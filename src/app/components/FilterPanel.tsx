import { X } from "lucide-react";
import { teachers, rooms, classes, days, timeSlots } from "../data/mockData";

interface FilterPanelProps {
  filters: {
    kelas: string;
    guru: string;
    ruang: string;
    hari: string;
    jam: string;
  };
  onFiltersChange: (filters: any) => void;
}

export function FilterPanel({ filters, onFiltersChange }: FilterPanelProps) {
  const handleFilterChange = (key: string, value: string) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const clearFilters = () => {
    onFiltersChange({
      kelas: '',
      guru: '',
      ruang: '',
      hari: '',
      jam: ''
    });
  };

  const hasActiveFilters = Object.values(filters).some(v => v !== '');

  return (
    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg text-gray-900">Filter Jadwal</h3>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-2 text-sm text-red-600 hover:text-red-700"
          >
            <X size={16} />
            Hapus Filter
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        <div>
          <label className="block text-sm text-gray-700 mb-2">Kelas</label>
          <select
            value={filters.kelas}
            onChange={(e) => handleFilterChange('kelas', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="">Semua Kelas</option>
            {classes.map(kelas => (
              <option key={kelas} value={kelas}>{kelas}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm text-gray-700 mb-2">Guru</label>
          <select
            value={filters.guru}
            onChange={(e) => handleFilterChange('guru', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="">Semua Guru</option>
            {teachers.map(teacher => (
              <option key={teacher.id} value={teacher.nama}>{teacher.nama}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm text-gray-700 mb-2">Ruang</label>
          <select
            value={filters.ruang}
            onChange={(e) => handleFilterChange('ruang', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="">Semua Ruang</option>
            {rooms.map(room => (
              <option key={room.id} value={room.nama}>{room.nama}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm text-gray-700 mb-2">Hari</label>
          <select
            value={filters.hari}
            onChange={(e) => handleFilterChange('hari', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="">Semua Hari</option>
            {days.map(day => (
              <option key={day} value={day}>{day}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm text-gray-700 mb-2">Jam</label>
          <select
            value={filters.jam}
            onChange={(e) => handleFilterChange('jam', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="">Semua Jam</option>
            {timeSlots.map(slot => (
              <option key={slot.id} value={slot.label}>{slot.label}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
