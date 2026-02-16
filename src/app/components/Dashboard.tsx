import { useState } from "react";
import { Plus, RefreshCw, AlertTriangle, Filter } from "lucide-react";
import { ScheduleTable } from "./ScheduleTable";
import { AddScheduleModal } from "./AddScheduleModal";
import { FilterPanel } from "./FilterPanel";
import { classes, days } from "../data/mockData";

export function Dashboard() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(true);
  const [filters, setFilters] = useState({
    kelas: '',
    guru: '',
    ruang: '',
    hari: '',
    jam: ''
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl text-gray-900">Dashboard Penjadwalan</h2>
          <p className="text-gray-600 mt-1">
            Kelola jadwal pelajaran untuk semua kelas
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Filter size={18} />
            <span>Filter</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-yellow-400 text-gray-900 rounded-lg hover:bg-yellow-500 transition-colors shadow-md">
            <RefreshCw size={18} />
            <span>Generate Otomatis</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors shadow-md">
            <AlertTriangle size={18} />
            <span>Deteksi Bentrok</span>
          </button>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 px-5 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors shadow-md"
          >
            <Plus size={18} />
            <span>Tambah Jadwal</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl shadow-sm border-l-4 border-emerald-500">
          <div className="text-gray-600 text-sm">Total Kelas</div>
          <div className="text-3xl text-gray-900 mt-1">{classes.length}</div>
        </div>
        <div className="bg-white p-5 rounded-xl shadow-sm border-l-4 border-blue-500">
          <div className="text-gray-600 text-sm">Hari Aktif</div>
          <div className="text-3xl text-gray-900 mt-1">{days.length}</div>
        </div>
        <div className="bg-white p-5 rounded-xl shadow-sm border-l-4 border-yellow-500">
          <div className="text-gray-600 text-sm">Jadwal Terdaftar</div>
          <div className="text-3xl text-gray-900 mt-1">18</div>
        </div>
        <div className="bg-white p-5 rounded-xl shadow-sm border-l-4 border-orange-500">
          <div className="text-gray-600 text-sm">Konflik Terdeteksi</div>
          <div className="text-3xl text-gray-900 mt-1">2</div>
        </div>
      </div>

      {/* Filter Panel */}
      {showFilters && (
        <FilterPanel filters={filters} onFiltersChange={setFilters} />
      )}

      {/* Schedule Table */}
      <ScheduleTable filters={filters} />

      {/* Add Schedule Modal */}
      <AddScheduleModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
    </div>
  );
}
