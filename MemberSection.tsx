import React from 'react';
import { User } from 'lucide-react';

interface Member {
  id: string;
  name: string;
  status: 'online' | 'offline' | 'studying';
}

const members: Member[] = [
  { id: '1', name: 'sans', status: 'studying' },
  { id: '2', name: 'tom', status: 'online' },
  { id: '3', name: 'sam', status: 'offline' },
  { id: '4', name: 'jerry', status: 'studying' },
];

export const MemberSection: React.FC = () => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex border-b border-gray-600/50 mb-4">
        <button className="px-2 pb-2 text-sm font-medium text-blue-400 border-b-2 border-blue-500 focus:outline-none">
          그룹 인원
        </button>
      </div>
      
      <div className="grid grid-cols-2 gap-4 overflow-y-auto max-h-[160px] pr-2 scrollbar-thin">
        {members.map((member) => (
          <div 
            key={member.id} 
            className="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-600/30 transition-colors"
          >
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center border border-gray-500">
                <User size={20} className="text-gray-300" />
              </div>
              <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-gray-800 ${
                member.status === 'studying' ? 'bg-red-500' :
                member.status === 'online' ? 'bg-green-500' : 'bg-gray-500'
              }`}></span>
            </div>
            <div>
              <p className="text-sm font-medium text-white">{member.name}</p>
              <p className="text-xs text-gray-400 capitalize">
                {member.status === 'studying' ? '🔥 공부중' : member.status}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
