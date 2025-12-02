import React from 'react';
import { Play, Pause } from 'lucide-react';

interface TimerSectionProps {
  timer: number;
  isStudying: boolean;
  onToggle: () => void;
}

export const TimerSection: React.FC<TimerSectionProps> = ({ timer, isStudying, onToggle }) => {
  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const goalSeconds = 3600 * 3; // 3 hours goal
  const progress = Math.min((timer / goalSeconds) * 100, 100);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-gray-400 text-sm mb-1">총 공부한 시간</h2>
          <div className="text-4xl font-mono font-bold text-white tracking-wider">
            {formatTime(timer)}
          </div>
        </div>
        
        <button
          onClick={onToggle}
          className={`flex items-center gap-2 px-6 py-2 rounded-full font-semibold transition-all shadow-lg ${
            isStudying 
              ? 'bg-red-600 hover:bg-red-700 text-white' 
              : 'bg-green-600 hover:bg-green-700 text-white'
          }`}
        >
          {isStudying ? (
            <>
              <Pause size={18} /> 종료
            </>
          ) : (
            <>
              <Play size={18} /> 시작
            </>
          )}
        </button>
      </div>

      <div className="w-full">
        <div className="flex justify-between mb-1">
          <span className="text-sm font-medium text-gray-300">목표 시간 (3시간)</span>
          <span className="text-sm font-medium text-blue-400">{Math.round(progress)}%</span>
        </div>
        <div className="w-full bg-gray-600 rounded-full h-4 overflow-hidden relative">
            {/* Striped background effect for progress bar */}
            <div 
                className="bg-blue-600 h-4 rounded-full transition-all duration-1000 ease-out flex items-center justify-end"
                style={{ width: `${progress}%` }}
            >
                <div className="w-full h-full opacity-30 bg-[linear-gradient(45deg,rgba(255,255,255,0.2)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.2)_50%,rgba(255,255,255,0.2)_75%,transparent_75%,transparent)] bg-[length:1rem_1rem]"></div>
            </div>
        </div>
      </div>
    </div>
  );
};
