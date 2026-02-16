import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";
import { Plus, Trash2, Calendar, Users, DoorOpen, BookOpen, Clock, Check, Upload, Download, School, FileSpreadsheet, Edit2 } from "lucide-react";
import { toast } from "sonner";
import Papa from "papaparse";
import * as XLSX from "xlsx";

export function SetupPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'school' | 'days' | 'classes' | 'teachers' | 'rooms' | 'subjects' | 'timeslots'>('school');
  
  // School Info
  const [schoolName, setSchoolName] = useState('');
  const [semester, setSemester] = useState('');
  const [academicYear, setAcademicYear] = useState('');

  // Days
  const [days, setDays] = useState(['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu']);
  const [newDay, setNewDay] = useState('');

  // Classes
  const [classes, setClasses] = useState(['7A', '7B', '8A', '8B', '9A', '9B']);
  const [newClass, setNewClass] = useState('');

  // Teachers
  const [teachers, setTeachers] = useState([
    { nama: 'Ibu Siti Nurhaliza', mataPelajaran: 'Matematika', jamMaksimal: 24 },
  ]);
  const [newTeacher, setNewTeacher] = useState({ nama: '', mataPelajaran: '', jamMaksimal: 24 });

  // Rooms
  const [rooms, setRooms] = useState([
    { nama: 'R.7A', kapasitas: 32, tipe: 'kelas' as const },
  ]);
  const [newRoom, setNewRoom] = useState({ nama: '', kapasitas: 32, tipe: 'kelas' as const });

  // Subjects
  const [subjects, setSubjects] = useState(['Matematika', 'Bahasa Indonesia', 'IPA', 'IPS', 'Bahasa Inggris']);
  const [newSubject, setNewSubject] = useState('');

  // Time Slots
  const [timeSlots, setTimeSlots] = useState([
    { label: '07:00 - 07:45', start: '07:00', end: '07:45' },
    { label: '07:45 - 08:30', start: '07:45', end: '08:30' },
  ]);
  const [newTimeSlot, setNewTimeSlot] = useState({ start: '', end: '' });

  // File refs
  const teacherFileRef = useRef<HTMLInputElement>(null);
  const roomFileRef = useRef<HTMLInputElement>(null);
  const classFileRef = useRef<HTMLInputElement>(null);
  const dayFileRef = useRef<HTMLInputElement>(null);
  const subjectFileRef = useRef<HTMLInputElement>(null);
  const timeslotFileRef = useRef<HTMLInputElement>(null);

  // Load saved data
  useEffect(() => {
    const saved = localStorage.getItem('setupData');
    if (saved) {
      const data = JSON.parse(saved);
      if (data.schoolName) setSchoolName(data.schoolName);
      if (data.semester) setSemester(data.semester);
      if (data.academicYear) setAcademicYear(data.academicYear);
      if (data.days) setDays(data.days);
      if (data.classes) setClasses(data.classes);
      if (data.teachers) setTeachers(data.teachers);
      if (data.rooms) setRooms(data.rooms);
      if (data.subjects) setSubjects(data.subjects);
      if (data.timeSlots) setTimeSlots(data.timeSlots);
    }
  }, []);

  const tabs = [
    { id: 'school' as const, label: 'Info Sekolah', icon: School },
    { id: 'days' as const, label: 'Hari Sekolah', icon: Calendar },
    { id: 'classes' as const, label: 'Kelas', icon: Users },
    { id: 'teachers' as const, label: 'Guru', icon: Users },
    { id: 'rooms' as const, label: 'Ruang', icon: DoorOpen },
    { id: 'subjects' as const, label: 'Mata Pelajaran', icon: BookOpen },
    { id: 'timeslots' as const, label: 'Jam Pelajaran', icon: Clock },
  ];

  const handleComplete = () => {
    if (!schoolName.trim()) {
      toast.error('Nama sekolah harus diisi!');
      setActiveTab('school');
      return;
    }

    // Save to localStorage
    localStorage.setItem('setupData', JSON.stringify({
      schoolName,
      semester,
      academicYear,
      days,
      classes,
      teachers,
      rooms,
      subjects,
      timeSlots
    }));
    
    toast.success('Setup berhasil! Mulai buat jadwal.');
    navigate('/app/dashboard');
  };

  // Download templates
  const downloadTeachersTemplate = () => {
    const csv = "nama,mataPelajaran,jamMaksimal\nPak Ahmad,Matematika,24\nBu Siti,Bahasa Indonesia,20";
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'template_guru.csv';
    a.click();
  };

  const downloadRoomsTemplate = () => {
    const csv = "nama,kapasitas,tipe\nR.7A,32,kelas\nLab IPA,36,lab-ipa";
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'template_ruang.csv';
    a.click();
  };

  const downloadClassesTemplate = () => {
    const csv = "kelas\n7A\n7B\n8A";
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'template_kelas.csv';
    a.click();
  };

  const downloadDaysTemplate = () => {
    const csv = "hari\nSenin\nSelasa\nRabu";
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'template_hari.csv';
    a.click();
  };

  const downloadSubjectsTemplate = () => {
    const csv = "mataPelajaran\nMatematika\nBahasa Indonesia\nIPA";
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'template_mapel.csv';
    a.click();
  };

  const downloadTimeslotsTemplate = () => {
    const csv = "start,end\n07:00,07:45\n07:45,08:30\n08:30,09:15";
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'template_jam.csv';
    a.click();
  };

  // Import handlers
  const handleTeachersImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const data = event.target?.result;
      
      if (file.name.endsWith('.csv')) {
        Papa.parse(data as string, {
          header: true,
          complete: (results) => {
            const imported = results.data.filter((row: any) => row.nama && row.mataPelajaran).map((row: any) => ({
              nama: row.nama,
              mataPelajaran: row.mataPelajaran,
              jamMaksimal: parseInt(row.jamMaksimal) || 24
            }));
            setTeachers([...teachers, ...imported]);
            toast.success(`${imported.length} guru berhasil diimport!`);
          }
        });
      } else if (file.name.endsWith('.xlsx') || file.name.endsWith('.xls')) {
        const workbook = XLSX.read(data, { type: 'binary' });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData: any[] = XLSX.utils.sheet_to_json(sheet);
        const imported = jsonData.filter(row => row.nama && row.mataPelajaran).map(row => ({
          nama: row.nama,
          mataPelajaran: row.mataPelajaran,
          jamMaksimal: parseInt(row.jamMaksimal) || 24
        }));
        setTeachers([...teachers, ...imported]);
        toast.success(`${imported.length} guru berhasil diimport!`);
      }
    };
    
    if (file.name.endsWith('.csv')) {
      reader.readAsText(file);
    } else {
      reader.readAsBinaryString(file);
    }
    
    e.target.value = '';
  };

  const handleRoomsImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const data = event.target?.result;
      
      if (file.name.endsWith('.csv')) {
        Papa.parse(data as string, {
          header: true,
          complete: (results) => {
            const imported = results.data.filter((row: any) => row.nama).map((row: any) => ({
              nama: row.nama,
              kapasitas: parseInt(row.kapasitas) || 32,
              tipe: row.tipe || 'kelas'
            }));
            setRooms([...rooms, ...imported]);
            toast.success(`${imported.length} ruang berhasil diimport!`);
          }
        });
      } else if (file.name.endsWith('.xlsx') || file.name.endsWith('.xls')) {
        const workbook = XLSX.read(data, { type: 'binary' });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData: any[] = XLSX.utils.sheet_to_json(sheet);
        const imported = jsonData.filter(row => row.nama).map(row => ({
          nama: row.nama,
          kapasitas: parseInt(row.kapasitas) || 32,
          tipe: row.tipe || 'kelas'
        }));
        setRooms([...rooms, ...imported]);
        toast.success(`${imported.length} ruang berhasil diimport!`);
      }
    };
    
    if (file.name.endsWith('.csv')) {
      reader.readAsText(file);
    } else {
      reader.readAsBinaryString(file);
    }
    
    e.target.value = '';
  };

  const handleClassesImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const data = event.target?.result;
      
      if (file.name.endsWith('.csv')) {
        Papa.parse(data as string, {
          header: true,
          complete: (results) => {
            const imported = results.data.filter((row: any) => row.kelas).map((row: any) => row.kelas);
            setClasses([...classes, ...imported]);
            toast.success(`${imported.length} kelas berhasil diimport!`);
          }
        });
      } else if (file.name.endsWith('.xlsx') || file.name.endsWith('.xls')) {
        const workbook = XLSX.read(data, { type: 'binary' });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData: any[] = XLSX.utils.sheet_to_json(sheet);
        const imported = jsonData.filter(row => row.kelas).map(row => row.kelas);
        setClasses([...classes, ...imported]);
        toast.success(`${imported.length} kelas berhasil diimport!`);
      }
    };
    
    if (file.name.endsWith('.csv')) {
      reader.readAsText(file);
    } else {
      reader.readAsBinaryString(file);
    }
    
    e.target.value = '';
  };

  const handleDaysImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const data = event.target?.result;
      
      if (file.name.endsWith('.csv')) {
        Papa.parse(data as string, {
          header: true,
          complete: (results) => {
            const imported = results.data.filter((row: any) => row.hari).map((row: any) => row.hari);
            setDays([...days, ...imported]);
            toast.success(`${imported.length} hari berhasil diimport!`);
          }
        });
      } else if (file.name.endsWith('.xlsx') || file.name.endsWith('.xls')) {
        const workbook = XLSX.read(data, { type: 'binary' });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData: any[] = XLSX.utils.sheet_to_json(sheet);
        const imported = jsonData.filter(row => row.hari).map(row => row.hari);
        setDays([...days, ...imported]);
        toast.success(`${imported.length} hari berhasil diimport!`);
      }
    };
    
    if (file.name.endsWith('.csv')) {
      reader.readAsText(file);
    } else {
      reader.readAsBinaryString(file);
    }
    
    e.target.value = '';
  };

  const handleSubjectsImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const data = event.target?.result;
      
      if (file.name.endsWith('.csv')) {
        Papa.parse(data as string, {
          header: true,
          complete: (results) => {
            const imported = results.data.filter((row: any) => row.mataPelajaran).map((row: any) => row.mataPelajaran);
            setSubjects([...subjects, ...imported]);
            toast.success(`${imported.length} mata pelajaran berhasil diimport!`);
          }
        });
      } else if (file.name.endsWith('.xlsx') || file.name.endsWith('.xls')) {
        const workbook = XLSX.read(data, { type: 'binary' });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData: any[] = XLSX.utils.sheet_to_json(sheet);
        const imported = jsonData.filter(row => row.mataPelajaran).map(row => row.mataPelajaran);
        setSubjects([...subjects, ...imported]);
        toast.success(`${imported.length} mata pelajaran berhasil diimport!`);
      }
    };
    
    if (file.name.endsWith('.csv')) {
      reader.readAsText(file);
    } else {
      reader.readAsBinaryString(file);
    }
    
    e.target.value = '';
  };

  const handleTimeslotsImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const data = event.target?.result;
      
      if (file.name.endsWith('.csv')) {
        Papa.parse(data as string, {
          header: true,
          complete: (results) => {
            const imported = results.data.filter((row: any) => row.start && row.end).map((row: any) => ({
              label: `${row.start} - ${row.end}`,
              start: row.start,
              end: row.end
            }));
            setTimeSlots([...timeSlots, ...imported]);
            toast.success(`${imported.length} jam pelajaran berhasil diimport!`);
          }
        });
      } else if (file.name.endsWith('.xlsx') || file.name.endsWith('.xls')) {
        const workbook = XLSX.read(data, { type: 'binary' });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData: any[] = XLSX.utils.sheet_to_json(sheet);
        const imported = jsonData.filter(row => row.start && row.end).map(row => ({
          label: `${row.start} - ${row.end}`,
          start: row.start,
          end: row.end
        }));
        setTimeSlots([...timeSlots, ...imported]);
        toast.success(`${imported.length} jam pelajaran berhasil diimport!`);
      }
    };
    
    if (file.name.endsWith('.csv')) {
      reader.readAsText(file);
    } else {
      reader.readAsBinaryString(file);
    }
    
    e.target.value = '';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white shadow-lg">
        <div className="w-full px-6 py-6">
          <h1 className="text-3xl">Setup Awal Sistem</h1>
          <p className="text-emerald-100 mt-1">Lengkapi data master untuk memulai penjadwalan</p>
        </div>
      </div>

      <div className="w-full px-6 py-6">
        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-6">
          <div className="flex overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-4 border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-700'
                    : 'border-transparent text-gray-600 hover:bg-gray-50'
                }`}
              >
                <tab.icon size={20} />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          {/* School Info Tab */}
          {activeTab === 'school' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl text-gray-900 mb-2">Informasi Sekolah</h2>
                <p className="text-gray-600">Masukkan informasi dasar sekolah Anda</p>
              </div>

              <div className="space-y-4 max-w-2xl">
                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Nama Sekolah <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={schoolName}
                    onChange={(e) => setSchoolName(e.target.value)}
                    placeholder="Contoh: SMP Nusantara"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Semester
                  </label>
                  <select
                    value={semester}
                    onChange={(e) => setSemester(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="">Pilih Semester</option>
                    <option value="Ganjil">Semester Ganjil</option>
                    <option value="Genap">Semester Genap</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Tahun Ajaran
                  </label>
                  <input
                    type="text"
                    value={academicYear}
                    onChange={(e) => setAcademicYear(e.target.value)}
                    placeholder="Contoh: 2025/2026"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                {schoolName && (
                  <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                    <div className="flex items-center gap-3">
                      <School size={24} className="text-emerald-600" />
                      <div>
                        <div className="text-lg text-gray-900">{schoolName}</div>
                        {semester && academicYear && (
                          <div className="text-sm text-gray-600">
                            Semester {semester} • {academicYear}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Days Tab */}
          {activeTab === 'days' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl text-gray-900 mb-2">Hari Sekolah</h2>
                  <p className="text-gray-600">Tentukan hari-hari aktif sekolah</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={downloadDaysTemplate}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Download size={18} />
                    <span>Template CSV</span>
                  </button>
                  <input
                    ref={dayFileRef}
                    type="file"
                    accept=".csv,.xlsx,.xls"
                    onChange={handleDaysImport}
                    className="hidden"
                  />
                  <button
                    onClick={() => dayFileRef.current?.click()}
                    className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    <Upload size={18} />
                    <span>Import CSV/Excel</span>
                  </button>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-sm text-yellow-800">
                  <strong>Format CSV:</strong> File harus memiliki kolom <code className="bg-yellow-100 px-1 rounded">hari</code>
                </p>
              </div>

              <div className="flex gap-3">
                <input
                  type="text"
                  value={newDay}
                  onChange={(e) => setNewDay(e.target.value)}
                  placeholder="Nama hari (contoh: Senin)"
                  className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && newDay.trim()) {
                      setDays([...days, newDay]);
                      setNewDay('');
                    }
                  }}
                />
                <button
                  onClick={() => {
                    if (newDay.trim()) {
                      setDays([...days, newDay]);
                      setNewDay('');
                    }
                  }}
                  className="px-6 py-2.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  <Plus size={20} />
                </button>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {days.map((day, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
                    <span className="text-gray-900">{day}</span>
                    <button
                      onClick={() => setDays(days.filter((_, i) => i !== index))}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Classes Tab */}
          {activeTab === 'classes' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl text-gray-900 mb-2">Daftar Kelas</h2>
                  <p className="text-gray-600">Tentukan kelas-kelas yang ada di sekolah</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={downloadClassesTemplate}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Download size={18} />
                    <span>Template CSV</span>
                  </button>
                  <input
                    ref={classFileRef}
                    type="file"
                    accept=".csv,.xlsx,.xls"
                    onChange={handleClassesImport}
                    className="hidden"
                  />
                  <button
                    onClick={() => classFileRef.current?.click()}
                    className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    <Upload size={18} />
                    <span>Import CSV/Excel</span>
                  </button>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-sm text-yellow-800">
                  <strong>Format CSV:</strong> File harus memiliki kolom <code className="bg-yellow-100 px-1 rounded">kelas</code>
                </p>
              </div>

              <div className="flex gap-3">
                <input
                  type="text"
                  value={newClass}
                  onChange={(e) => setNewClass(e.target.value)}
                  placeholder="Nama kelas (contoh: 7A)"
                  className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && newClass.trim()) {
                      setClasses([...classes, newClass]);
                      setNewClass('');
                    }
                  }}
                />
                <button
                  onClick={() => {
                    if (newClass.trim()) {
                      setClasses([...classes, newClass]);
                      setNewClass('');
                    }
                  }}
                  className="px-6 py-2.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  <Plus size={20} />
                </button>
              </div>

              <div className="grid grid-cols-4 gap-3">
                {classes.map((cls, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <span className="text-gray-900">{cls}</span>
                    <button
                      onClick={() => setClasses(classes.filter((_, i) => i !== index))}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Teachers Tab */}
          {activeTab === 'teachers' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl text-gray-900 mb-2">Daftar Guru</h2>
                  <p className="text-gray-600">Tentukan guru dan mata pelajaran yang diampu</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={downloadTeachersTemplate}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Download size={18} />
                    <span>Template CSV</span>
                  </button>
                  <input
                    ref={teacherFileRef}
                    type="file"
                    accept=".csv,.xlsx,.xls"
                    onChange={handleTeachersImport}
                    className="hidden"
                  />
                  <button
                    onClick={() => teacherFileRef.current?.click()}
                    className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    <Upload size={18} />
                    <span>Import CSV/Excel</span>
                  </button>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-sm text-yellow-800">
                  <strong>Format CSV:</strong> File harus memiliki kolom <code className="bg-yellow-100 px-1 rounded">nama</code>, <code className="bg-yellow-100 px-1 rounded">mataPelajaran</code>, dan <code className="bg-yellow-100 px-1 rounded">jamMaksimal</code>
                </p>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <input
                  type="text"
                  value={newTeacher.nama}
                  onChange={(e) => setNewTeacher({ ...newTeacher, nama: e.target.value })}
                  placeholder="Nama guru"
                  className="px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <input
                  type="text"
                  value={newTeacher.mataPelajaran}
                  onChange={(e) => setNewTeacher({ ...newTeacher, mataPelajaran: e.target.value })}
                  placeholder="Mata pelajaran"
                  className="px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={newTeacher.jamMaksimal}
                    onChange={(e) => setNewTeacher({ ...newTeacher, jamMaksimal: parseInt(e.target.value) })}
                    placeholder="Jam maks"
                    className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  <button
                    onClick={() => {
                      if (newTeacher.nama && newTeacher.mataPelajaran) {
                        setTeachers([...teachers, newTeacher]);
                        setNewTeacher({ nama: '', mataPelajaran: '', jamMaksimal: 24 });
                      }
                    }}
                    className="px-6 py-2.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                  >
                    <Plus size={20} />
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm text-gray-700">No</th>
                      <th className="px-4 py-3 text-left text-sm text-gray-700">Nama Guru</th>
                      <th className="px-4 py-3 text-left text-sm text-gray-700">Mata Pelajaran</th>
                      <th className="px-4 py-3 text-left text-sm text-gray-700">Jam Maks/Minggu</th>
                      <th className="px-4 py-3 text-left text-sm text-gray-700">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {teachers.map((teacher, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm text-gray-900">{index + 1}</td>
                        <td className="px-4 py-3 text-sm text-gray-900">{teacher.nama}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{teacher.mataPelajaran}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{teacher.jamMaksimal} jam</td>
                        <td className="px-4 py-3">
                          <button
                            onClick={() => setTeachers(teachers.filter((_, i) => i !== index))}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 size={18} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Rooms Tab */}
          {activeTab === 'rooms' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl text-gray-900 mb-2">Daftar Ruang</h2>
                  <p className="text-gray-600">Tentukan ruang kelas dan fasilitas</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={downloadRoomsTemplate}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Download size={18} />
                    <span>Template CSV</span>
                  </button>
                  <input
                    ref={roomFileRef}
                    type="file"
                    accept=".csv,.xlsx,.xls"
                    onChange={handleRoomsImport}
                    className="hidden"
                  />
                  <button
                    onClick={() => roomFileRef.current?.click()}
                    className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    <Upload size={18} />
                    <span>Import CSV/Excel</span>
                  </button>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-sm text-yellow-800">
                  <strong>Format CSV:</strong> File harus memiliki kolom <code className="bg-yellow-100 px-1 rounded">nama</code>, <code className="bg-yellow-100 px-1 rounded">kapasitas</code>, dan <code className="bg-yellow-100 px-1 rounded">tipe</code>
                </p>
              </div>

              <div className="grid grid-cols-4 gap-3">
                <input
                  type="text"
                  value={newRoom.nama}
                  onChange={(e) => setNewRoom({ ...newRoom, nama: e.target.value })}
                  placeholder="Nama ruang"
                  className="px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <input
                  type="number"
                  value={newRoom.kapasitas}
                  onChange={(e) => setNewRoom({ ...newRoom, kapasitas: parseInt(e.target.value) })}
                  placeholder="Kapasitas"
                  className="px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <select
                  value={newRoom.tipe}
                  onChange={(e) => setNewRoom({ ...newRoom, tipe: e.target.value as any })}
                  className="px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="kelas">Kelas Biasa</option>
                  <option value="lab-komputer">Lab Komputer</option>
                  <option value="lab-ipa">Lab IPA</option>
                  <option value="aula">Aula</option>
                </select>
                <button
                  onClick={() => {
                    if (newRoom.nama) {
                      setRooms([...rooms, newRoom]);
                      setNewRoom({ nama: '', kapasitas: 32, tipe: 'kelas' });
                    }
                  }}
                  className="px-6 py-2.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  <Plus size={20} />
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm text-gray-700">No</th>
                      <th className="px-4 py-3 text-left text-sm text-gray-700">Nama Ruang</th>
                      <th className="px-4 py-3 text-left text-sm text-gray-700">Kapasitas</th>
                      <th className="px-4 py-3 text-left text-sm text-gray-700">Tipe</th>
                      <th className="px-4 py-3 text-left text-sm text-gray-700">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {rooms.map((room, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm text-gray-900">{index + 1}</td>
                        <td className="px-4 py-3 text-sm text-gray-900">{room.nama}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{room.kapasitas} siswa</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{room.tipe}</td>
                        <td className="px-4 py-3">
                          <button
                            onClick={() => setRooms(rooms.filter((_, i) => i !== index))}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 size={18} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Subjects Tab */}
          {activeTab === 'subjects' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl text-gray-900 mb-2">Mata Pelajaran</h2>
                  <p className="text-gray-600">Tentukan mata pelajaran yang diajarkan</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={downloadSubjectsTemplate}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Download size={18} />
                    <span>Template CSV</span>
                  </button>
                  <input
                    ref={subjectFileRef}
                    type="file"
                    accept=".csv,.xlsx,.xls"
                    onChange={handleSubjectsImport}
                    className="hidden"
                  />
                  <button
                    onClick={() => subjectFileRef.current?.click()}
                    className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    <Upload size={18} />
                    <span>Import CSV/Excel</span>
                  </button>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-sm text-yellow-800">
                  <strong>Format CSV:</strong> File harus memiliki kolom <code className="bg-yellow-100 px-1 rounded">mataPelajaran</code>
                </p>
              </div>

              <div className="flex gap-3">
                <input
                  type="text"
                  value={newSubject}
                  onChange={(e) => setNewSubject(e.target.value)}
                  placeholder="Nama mata pelajaran"
                  className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && newSubject.trim()) {
                      setSubjects([...subjects, newSubject]);
                      setNewSubject('');
                    }
                  }}
                />
                <button
                  onClick={() => {
                    if (newSubject.trim()) {
                      setSubjects([...subjects, newSubject]);
                      setNewSubject('');
                    }
                  }}
                  className="px-6 py-2.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  <Plus size={20} />
                </button>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {subjects.map((subject, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-pink-50 border border-pink-200 rounded-lg">
                    <span className="text-gray-900">{subject}</span>
                    <button
                      onClick={() => setSubjects(subjects.filter((_, i) => i !== index))}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Time Slots Tab */}
          {activeTab === 'timeslots' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl text-gray-900 mb-2">Jam Pelajaran</h2>
                  <p className="text-gray-600">Tentukan slot waktu pelajaran</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={downloadTimeslotsTemplate}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Download size={18} />
                    <span>Template CSV</span>
                  </button>
                  <input
                    ref={timeslotFileRef}
                    type="file"
                    accept=".csv,.xlsx,.xls"
                    onChange={handleTimeslotsImport}
                    className="hidden"
                  />
                  <button
                    onClick={() => timeslotFileRef.current?.click()}
                    className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    <Upload size={18} />
                    <span>Import CSV/Excel</span>
                  </button>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-sm text-yellow-800">
                  <strong>Format CSV:</strong> File harus memiliki kolom <code className="bg-yellow-100 px-1 rounded">start</code> dan <code className="bg-yellow-100 px-1 rounded">end</code>
                </p>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <input
                  type="time"
                  value={newTimeSlot.start}
                  onChange={(e) => setNewTimeSlot({ ...newTimeSlot, start: e.target.value })}
                  className="px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <input
                  type="time"
                  value={newTimeSlot.end}
                  onChange={(e) => setNewTimeSlot({ ...newTimeSlot, end: e.target.value })}
                  className="px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <button
                  onClick={() => {
                    if (newTimeSlot.start && newTimeSlot.end) {
                      setTimeSlots([...timeSlots, {
                        label: `${newTimeSlot.start} - ${newTimeSlot.end}`,
                        start: newTimeSlot.start,
                        end: newTimeSlot.end
                      }]);
                      setNewTimeSlot({ start: '', end: '' });
                    }
                  }}
                  className="px-6 py-2.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  <Plus size={20} />
                </button>
              </div>

              <div className="space-y-2">
                {timeSlots.map((slot, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-indigo-50 border border-indigo-200 rounded-lg">
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-gray-600">Jam ke-{index + 1}</span>
                      <span className="text-gray-900">{slot.label}</span>
                    </div>
                    <button
                      onClick={() => setTimeSlots(timeSlots.filter((_, i) => i !== index))}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Complete Button */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={handleComplete}
            className="flex items-center gap-2 px-8 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors shadow-md text-lg"
          >
            <Check size={24} />
            <span>Selesai Setup & Mulai Buat Jadwal</span>
          </button>
        </div>
      </div>
    </div>
  );
}