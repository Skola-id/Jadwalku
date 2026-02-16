// Mock data untuk aplikasi penjadwalan

export interface Teacher {
  id: string;
  nama: string;
  mataPelajaran: string[];
  jamMaksimal: number;
  jamTerpakai: number;
  status: 'tersedia' | 'penuh';
}

export interface Room {
  id: string;
  nama: string;
  kapasitas: number;
  tipe: 'kelas' | 'lab-komputer' | 'lab-ipa' | 'aula';
}

export interface ScheduleEntry {
  id: string;
  kelas: string;
  mataPelajaran: string;
  guru: string;
  ruang: string;
  hari: string;
  jamMulai: string;
  jamSelesai: string;
}

export interface Conflict {
  id: string;
  tipe: 'guru-bentrok' | 'ruang-bentrok' | 'jam-melebihi';
  deskripsi: string;
  scheduleIds: string[];
  tingkatKeparahan: 'rendah' | 'sedang' | 'tinggi';
}

export const teachers: Teacher[] = [
  { id: '1', nama: 'Ibu Siti Nurhaliza', mataPelajaran: ['Matematika'], jamMaksimal: 24, jamTerpakai: 18, status: 'tersedia' },
  { id: '2', nama: 'Pak Ahmad Dahlan', mataPelajaran: ['Bahasa Indonesia'], jamMaksimal: 24, jamTerpakai: 20, status: 'tersedia' },
  { id: '3', nama: 'Ibu Dewi Lestari', mataPelajaran: ['IPA', 'Biologi'], jamMaksimal: 24, jamTerpakai: 22, status: 'tersedia' },
  { id: '4', nama: 'Pak Budi Santoso', mataPelajaran: ['IPS', 'Sejarah'], jamMaksimal: 24, jamTerpakai: 16, status: 'tersedia' },
  { id: '5', nama: 'Ibu Rina Kusuma', mataPelajaran: ['Bahasa Inggris'], jamMaksimal: 24, jamTerpakai: 24, status: 'penuh' },
  { id: '6', nama: 'Pak Hendra Wijaya', mataPelajaran: ['Pendidikan Jasmani'], jamMaksimal: 20, jamTerpakai: 14, status: 'tersedia' },
  { id: '7', nama: 'Ibu Maya Anggraini', mataPelajaran: ['Seni Budaya'], jamMaksimal: 18, jamTerpakai: 12, status: 'tersedia' },
  { id: '8', nama: 'Pak Rudi Hermawan', mataPelajaran: ['TIK'], jamMaksimal: 20, jamTerpakai: 18, status: 'tersedia' },
];

export const rooms: Room[] = [
  { id: '1', nama: 'R.7A', kapasitas: 32, tipe: 'kelas' },
  { id: '2', nama: 'R.7B', kapasitas: 32, tipe: 'kelas' },
  { id: '3', nama: 'R.8A', kapasitas: 32, tipe: 'kelas' },
  { id: '4', nama: 'R.8B', kapasitas: 32, tipe: 'kelas' },
  { id: '5', nama: 'R.9A', kapasitas: 30, tipe: 'kelas' },
  { id: '6', nama: 'R.9B', kapasitas: 30, tipe: 'kelas' },
  { id: '7', nama: 'Lab IPA', kapasitas: 36, tipe: 'lab-ipa' },
  { id: '8', nama: 'Lab Komputer', kapasitas: 40, tipe: 'lab-komputer' },
  { id: '9', nama: 'Aula', kapasitas: 120, tipe: 'aula' },
];

export const classes = ['7A', '7B', '8A', '8B', '9A', '9B'];

export const timeSlots = [
  { id: '1', label: '07:00 - 07:45', start: '07:00', end: '07:45' },
  { id: '2', label: '07:45 - 08:30', start: '07:45', end: '08:30' },
  { id: '3', label: '08:30 - 09:15', start: '08:30', end: '09:15' },
  { id: '4', label: '09:15 - 10:00', start: '09:15', end: '10:00' },
  { id: '5', label: '10:15 - 11:00', start: '10:15', end: '11:00' },
  { id: '6', label: '11:00 - 11:45', start: '11:00', end: '11:45' },
  { id: '7', label: '12:00 - 12:45', start: '12:00', end: '12:45' },
  { id: '8', label: '12:45 - 13:30', start: '12:45', end: '13:30' },
];

export const days = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];

export const schedules: ScheduleEntry[] = [
  // Senin - 7A
  { id: 's1', kelas: '7A', mataPelajaran: 'Matematika', guru: 'Ibu Siti Nurhaliza', ruang: 'R.7A', hari: 'Senin', jamMulai: '07:00', jamSelesai: '08:30' },
  { id: 's2', kelas: '7A', mataPelajaran: 'Bahasa Indonesia', guru: 'Pak Ahmad Dahlan', ruang: 'R.7A', hari: 'Senin', jamMulai: '08:30', jamSelesai: '10:00' },
  { id: 's3', kelas: '7A', mataPelajaran: 'IPA', guru: 'Ibu Dewi Lestari', ruang: 'Lab IPA', hari: 'Senin', jamMulai: '10:15', jamSelesai: '11:45' },
  
  // Senin - 7B
  { id: 's4', kelas: '7B', mataPelajaran: 'Bahasa Inggris', guru: 'Ibu Rina Kusuma', ruang: 'R.7B', hari: 'Senin', jamMulai: '07:00', jamSelesai: '08:30' },
  { id: 's5', kelas: '7B', mataPelajaran: 'Matematika', guru: 'Ibu Siti Nurhaliza', ruang: 'R.7B', hari: 'Senin', jamMulai: '08:30', jamSelesai: '10:00' },
  { id: 's6', kelas: '7B', mataPelajaran: 'IPS', guru: 'Pak Budi Santoso', ruang: 'R.7B', hari: 'Senin', jamMulai: '10:15', jamSelesai: '11:45' },
  
  // Selasa - 7A
  { id: 's7', kelas: '7A', mataPelajaran: 'Bahasa Inggris', guru: 'Ibu Rina Kusuma', ruang: 'R.7A', hari: 'Selasa', jamMulai: '07:00', jamSelesai: '08:30' },
  { id: 's8', kelas: '7A', mataPelajaran: 'IPS', guru: 'Pak Budi Santoso', ruang: 'R.7A', hari: 'Selasa', jamMulai: '08:30', jamSelesai: '10:00' },
  { id: 's9', kelas: '7A', mataPelajaran: 'Penjas', guru: 'Pak Hendra Wijaya', ruang: 'Aula', hari: 'Selasa', jamMulai: '10:15', jamSelesai: '11:45' },
  
  // Selasa - 8A
  { id: 's10', kelas: '8A', mataPelajaran: 'Matematika', guru: 'Ibu Siti Nurhaliza', ruang: 'R.8A', hari: 'Selasa', jamMulai: '07:00', jamSelesai: '08:30' },
  { id: 's11', kelas: '8A', mataPelajaran: 'Bahasa Indonesia', guru: 'Pak Ahmad Dahlan', ruang: 'R.8A', hari: 'Selasa', jamMulai: '08:30', jamSelesai: '10:00' },
  { id: 's12', kelas: '8A', mataPelajaran: 'TIK', guru: 'Pak Rudi Hermawan', ruang: 'Lab Komputer', hari: 'Selasa', jamMulai: '10:15', jamSelesai: '11:45' },
  
  // Rabu - 8A
  { id: 's13', kelas: '8A', mataPelajaran: 'IPA', guru: 'Ibu Dewi Lestari', ruang: 'Lab IPA', hari: 'Rabu', jamMulai: '07:00', jamSelesai: '08:30' },
  { id: 's14', kelas: '8A', mataPelajaran: 'Bahasa Inggris', guru: 'Ibu Rina Kusuma', ruang: 'R.8A', hari: 'Rabu', jamMulai: '08:30', jamSelesai: '10:00' },
  { id: 's15', kelas: '8A', mataPelajaran: 'Seni Budaya', guru: 'Ibu Maya Anggraini', ruang: 'R.8A', hari: 'Rabu', jamMulai: '10:15', jamSelesai: '11:00' },
  
  // Rabu - 9A
  { id: 's16', kelas: '9A', mataPelajaran: 'Matematika', guru: 'Ibu Siti Nurhaliza', ruang: 'R.9A', hari: 'Rabu', jamMulai: '07:00', jamSelesai: '08:30' },
  { id: 's17', kelas: '9A', mataPelajaran: 'Bahasa Indonesia', guru: 'Pak Ahmad Dahlan', ruang: 'R.9A', hari: 'Rabu', jamMulai: '08:30', jamSelesai: '10:00' },
  { id: 's18', kelas: '9A', mataPelajaran: 'IPS', guru: 'Pak Budi Santoso', ruang: 'R.9A', hari: 'Rabu', jamMulai: '10:15', jamSelesai: '11:45' },
];

export const conflicts: Conflict[] = [
  {
    id: 'c1',
    tipe: 'guru-bentrok',
    deskripsi: 'Ibu Siti Nurhaliza mengajar di 2 kelas sekaligus pada Senin 07:00-08:30',
    scheduleIds: ['s1', 's5'],
    tingkatKeparahan: 'tinggi'
  },
  {
    id: 'c2',
    tipe: 'jam-melebihi',
    deskripsi: 'Ibu Rina Kusuma sudah mencapai batas maksimal jam mengajar (24 jam)',
    scheduleIds: [],
    tingkatKeparahan: 'sedang'
  }
];
