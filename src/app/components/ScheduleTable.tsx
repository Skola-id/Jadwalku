import { useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { Edit2, Trash2, GripVertical } from "lucide-react";
import { schedules, classes, days, timeSlots, ScheduleEntry } from "../data/mockData";
import * as Tooltip from "@radix-ui/react-tooltip";
import { toast } from "sonner";

interface ScheduleTableProps {
  filters: {
    kelas: string;
    guru: string;
    ruang: string;
    hari: string;
    jam: string;
  };
}

interface ScheduleCellProps {
  schedule?: ScheduleEntry;
  kelas: string;
  hari: string;
  jamMulai: string;
  onDrop: (schedule: ScheduleEntry, kelas: string, hari: string, jam: string) => void;
}

function ScheduleCard({ schedule }: { schedule: ScheduleEntry }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'SCHEDULE',
    item: schedule,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <div
            ref={drag}
            className={`p-3 bg-gradient-to-br from-emerald-50 to-emerald-100 border-l-4 border-emerald-500 rounded-lg cursor-move hover:shadow-md transition-all ${
              isDragging ? 'opacity-50' : ''
            }`}
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <div className="text-sm text-emerald-900">{schedule.mataPelajaran}</div>
                <div className="text-xs text-gray-600 mt-1">{schedule.guru}</div>
                <div className="flex items-center gap-2 mt-2">
                  <span className="px-2 py-0.5 bg-yellow-200 text-yellow-900 text-xs rounded">
                    {schedule.ruang}
                  </span>
                </div>
              </div>
              <GripVertical size={16} className="text-gray-400 flex-shrink-0" />
            </div>
          </div>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            className="bg-gray-900 text-white px-4 py-3 rounded-lg shadow-lg text-sm max-w-xs z-50"
            sideOffset={5}
          >
            <div className="space-y-2">
              <div><strong>Mata Pelajaran:</strong> {schedule.mataPelajaran}</div>
              <div><strong>Guru:</strong> {schedule.guru}</div>
              <div><strong>Kelas:</strong> {schedule.kelas}</div>
              <div><strong>Ruang:</strong> {schedule.ruang}</div>
              <div><strong>Waktu:</strong> {schedule.jamMulai} - {schedule.jamSelesai}</div>
            </div>
            <Tooltip.Arrow className="fill-gray-900" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}

function ScheduleCell({ schedule, kelas, hari, jamMulai, onDrop }: ScheduleCellProps) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'SCHEDULE',
    drop: (item: ScheduleEntry) => {
      onDrop(item, kelas, hari, jamMulai);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <td
      ref={drop}
      className={`border border-gray-200 p-2 min-h-[80px] align-top ${
        isOver ? 'bg-yellow-50 border-yellow-400' : 'bg-white'
      }`}
    >
      {schedule && <ScheduleCard schedule={schedule} />}
    </td>
  );
}

export function ScheduleTable({ filters }: ScheduleTableProps) {
  const [scheduleData, setScheduleData] = useState(schedules);

  const handleDrop = (schedule: ScheduleEntry, newKelas: string, newHari: string, newJam: string) => {
    // Update schedule with new position
    setScheduleData(prev => prev.map(s => 
      s.id === schedule.id 
        ? { ...s, kelas: newKelas, hari: newHari, jamMulai: newJam }
        : s
    ));
    toast.success(`Jadwal ${schedule.mataPelajaran} dipindahkan ke ${newKelas} - ${newHari}`);
  };

  // Filter schedules
  const filteredSchedules = scheduleData.filter(schedule => {
    if (filters.kelas && schedule.kelas !== filters.kelas) return false;
    if (filters.guru && schedule.guru !== filters.guru) return false;
    if (filters.ruang && schedule.ruang !== filters.ruang) return false;
    if (filters.hari && schedule.hari !== filters.hari) return false;
    return true;
  });

  // Show filtered classes or all classes
  const displayClasses = filters.kelas ? [filters.kelas] : classes;
  const displayDays = filters.hari ? [filters.hari] : days;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white">
            <tr>
              <th className="border border-emerald-500 px-4 py-3 text-left w-32">Kelas</th>
              {displayDays.map(day => (
                <th key={day} className="border border-emerald-500 px-4 py-3 text-center min-w-[200px]">
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {displayClasses.map(kelas => (
              <tr key={kelas}>
                <td className="border border-gray-200 px-4 py-3 bg-emerald-50 text-emerald-900">
                  <div className="text-sm">{kelas}</div>
                </td>
                {displayDays.map(hari => {
                  // Get all schedules for this class and day
                  const daySchedules = filteredSchedules.filter(
                    s => s.kelas === kelas && s.hari === hari
                  );

                  return (
                    <td key={`${kelas}-${hari}`} className="border border-gray-200 p-2 align-top bg-white">
                      <div className="space-y-2">
                        {daySchedules.length > 0 ? (
                          daySchedules.map(schedule => (
                            <ScheduleCard key={schedule.id} schedule={schedule} />
                          ))
                        ) : (
                          <div className="text-xs text-gray-400 text-center py-4">
                            Kosong
                          </div>
                        )}
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div>
            Menampilkan {filteredSchedules.length} dari {scheduleData.length} jadwal
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-emerald-100 border-l-4 border-emerald-500 rounded"></div>
              <span>Jadwal Aktif</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-yellow-200 rounded"></div>
              <span>Kode Ruang</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
