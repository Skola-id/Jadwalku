import { Search, Edit2, Trash2, UserCheck, UserX } from "lucide-react";
import { useState } from "react";
import { teachers, Teacher } from "../data/mockData";

export function TeachersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'tersedia' | 'penuh'>('all');

  const filteredTeachers = teachers.filter(teacher => {
    const matchesSearch = teacher.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          teacher.mataPelajaran.some(mp => mp.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || teacher.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl text-gray-900">Daftar Guru</h2>
          <p className="text-gray-600 mt-1">
            Kelola data guru dan beban mengajar
          </p>
        </div>
        <button className="flex items-center gap-2 px-5 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors shadow-md">
          <span>Tambah Guru</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl shadow-sm border-l-4 border-emerald-500">
          <div className="text-gray-600 text-sm">Total Guru</div>
          <div className="text-3xl text-gray-900 mt-1">{teachers.length}</div>
        </div>
        <div className="bg-white p-5 rounded-xl shadow-sm border-l-4 border-green-500">
          <div className="text-gray-600 text-sm">Guru Tersedia</div>
          <div className="text-3xl text-gray-900 mt-1">
            {teachers.filter(t => t.status === 'tersedia').length}
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl shadow-sm border-l-4 border-red-500">
          <div className="text-gray-600 text-sm">Guru Penuh</div>
          <div className="text-3xl text-gray-900 mt-1">
            {teachers.filter(t => t.status === 'penuh').length}
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl shadow-sm border-l-4 border-yellow-500">
          <div className="text-gray-600 text-sm">Rata-rata Beban</div>
          <div className="text-3xl text-gray-900 mt-1">
            {Math.round(teachers.reduce((acc, t) => acc + t.jamTerpakai, 0) / teachers.length)} jam
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
        <div className="flex gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Cari guru atau mata pelajaran..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="all">Semua Status</option>
            <option value="tersedia">Tersedia</option>
            <option value="penuh">Penuh</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white">
            <tr>
              <th className="px-6 py-4 text-left">Nama Guru</th>
              <th className="px-6 py-4 text-left">Mata Pelajaran</th>
              <th className="px-6 py-4 text-center">Jam Terpakai</th>
              <th className="px-6 py-4 text-center">Jam Maksimal</th>
              <th className="px-6 py-4 text-center">Beban (%)</th>
              <th className="px-6 py-4 text-center">Status</th>
              <th className="px-6 py-4 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredTeachers.map((teacher) => {
              const percentage = Math.round((teacher.jamTerpakai / teacher.jamMaksimal) * 100);
              return (
                <tr key={teacher.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="text-gray-900">{teacher.nama}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-2">
                      {teacher.mataPelajaran.map(mp => (
                        <span key={mp} className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs rounded">
                          {mp}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-gray-900">{teacher.jamTerpakai}</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-gray-900">{teacher.jamMaksimal}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-full bg-gray-200 rounded-full h-2 max-w-[100px]">
                        <div
                          className={`h-2 rounded-full ${
                            percentage >= 90 ? 'bg-red-500' :
                            percentage >= 70 ? 'bg-yellow-500' :
                            'bg-green-500'
                          }`}
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <span className="text-sm text-gray-600">{percentage}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center">
                      {teacher.status === 'tersedia' ? (
                        <span className="flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full">
                          <UserCheck size={14} />
                          Tersedia
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 px-3 py-1 bg-red-100 text-red-700 text-sm rounded-full">
                          <UserX size={14} />
                          Penuh
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-2">
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <Edit2 size={18} />
                      </button>
                      <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {filteredTeachers.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          Tidak ada guru yang ditemukan
        </div>
      )}
    </div>
  );
}
