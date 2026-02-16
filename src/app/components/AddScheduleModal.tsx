import { X } from "lucide-react";
import { useState } from "react";
import { teachers, rooms, classes, days, timeSlots } from "../data/mockData";
import { toast } from "sonner";

interface AddScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddScheduleModal({ isOpen, onClose }: AddScheduleModalProps) {
  const [formData, setFormData] = useState({
    kelas: '',
    mataPelajaran: '',
    guru: '',
    ruang: '',
    hari: '',
    jamMulai: '',
    jamSelesai: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validate form
    if (!formData.kelas || !formData.mataPelajaran || !formData.guru || !formData.ruang || !formData.hari || !formData.jamMulai || !formData.jamSelesai) {
      toast.error('Mohon lengkapi semua field');
      return;
    }

    toast.success('Jadwal berhasil ditambahkan!');
    onClose();
    
    // Reset form
    setFormData({
      kelas: '',
      mataPelajaran: '',
      guru: '',
      ruang: '',
      hari: '',
      jamMulai: '',
      jamSelesai: '',
    });
  };

  const selectedTeacher = teachers.find(t => t.nama === formData.guru);
  const availableSubjects = selectedTeacher?.mataPelajaran || [];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white px-6 py-5 flex items-center justify-between rounded-t-2xl">
          <h2 className="text-2xl">Tambah Jadwal Baru</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-emerald-500 rounded-lg transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div className="grid grid-cols-2 gap-5">
            {/* Kelas */}
            <div>
              <label className="block text-sm text-gray-700 mb-2">
                Kelas <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.kelas}
                onChange={(e) => setFormData({ ...formData, kelas: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                required
              >
                <option value="">Pilih Kelas</option>
                {classes.map(kelas => (
                  <option key={kelas} value={kelas}>{kelas}</option>
                ))}
              </select>
            </div>

            {/* Guru */}
            <div>
              <label className="block text-sm text-gray-700 mb-2">
                Guru <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.guru}
                onChange={(e) => {
                  setFormData({ ...formData, guru: e.target.value, mataPelajaran: '' });
                }}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                required
              >
                <option value="">Pilih Guru</option>
                {teachers.map(teacher => (
                  <option key={teacher.id} value={teacher.nama}>
                    {teacher.nama} ({teacher.jamTerpakai}/{teacher.jamMaksimal} jam)
                  </option>
                ))}
              </select>
            </div>

            {/* Mata Pelajaran */}
            <div>
              <label className="block text-sm text-gray-700 mb-2">
                Mata Pelajaran <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.mataPelajaran}
                onChange={(e) => setFormData({ ...formData, mataPelajaran: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                required
                disabled={!formData.guru}
              >
                <option value="">Pilih Mata Pelajaran</option>
                {availableSubjects.map(subject => (
                  <option key={subject} value={subject}>{subject}</option>
                ))}
              </select>
              {!formData.guru && (
                <p className="text-xs text-gray-500 mt-1">Pilih guru terlebih dahulu</p>
              )}
            </div>

            {/* Ruang */}
            <div>
              <label className="block text-sm text-gray-700 mb-2">
                Ruang <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.ruang}
                onChange={(e) => setFormData({ ...formData, ruang: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                required
              >
                <option value="">Pilih Ruang</option>
                {rooms.map(room => (
                  <option key={room.id} value={room.nama}>
                    {room.nama} (Kap. {room.kapasitas})
                  </option>
                ))}
              </select>
            </div>

            {/* Hari */}
            <div>
              <label className="block text-sm text-gray-700 mb-2">
                Hari <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.hari}
                onChange={(e) => setFormData({ ...formData, hari: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                required
              >
                <option value="">Pilih Hari</option>
                {days.map(day => (
                  <option key={day} value={day}>{day}</option>
                ))}
              </select>
            </div>

            {/* Jam Mulai */}
            <div>
              <label className="block text-sm text-gray-700 mb-2">
                Jam Mulai <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.jamMulai}
                onChange={(e) => setFormData({ ...formData, jamMulai: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                required
              >
                <option value="">Pilih Jam Mulai</option>
                {timeSlots.map(slot => (
                  <option key={slot.id} value={slot.start}>{slot.label}</option>
                ))}
              </select>
            </div>

            {/* Jam Selesai */}
            <div>
              <label className="block text-sm text-gray-700 mb-2">
                Jam Selesai <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.jamSelesai}
                onChange={(e) => setFormData({ ...formData, jamSelesai: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                required
              >
                <option value="">Pilih Jam Selesai</option>
                {timeSlots.map(slot => (
                  <option key={slot.id} value={slot.end}>{slot.label}</option>
                ))}
              </select>
            </div>

            {/* Durasi (calculated) */}
            <div>
              <label className="block text-sm text-gray-700 mb-2">
                Durasi
              </label>
              <div className="px-4 py-2.5 bg-gray-100 border border-gray-300 rounded-lg text-gray-600">
                {formData.jamMulai && formData.jamSelesai 
                  ? `${formData.jamMulai} - ${formData.jamSelesai}`
                  : 'Pilih jam mulai dan selesai'}
              </div>
            </div>
          </div>

          {/* Info Box */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-sm text-yellow-800">
              <strong>Info:</strong> Sistem akan otomatis mendeteksi bentrok setelah jadwal disimpan.
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-3 justify-end pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors shadow-md"
            >
              Simpan Jadwal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
