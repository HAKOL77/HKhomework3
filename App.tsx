import React, { useState, useEffect } from 'react';
import { ChatSection } from './src/components/ChatSection';
import { TimerSection } from './components/TimerSection';
import { StatsSection } from './components/StatsSection';
import { MemberSection } from './components/MemberSection';

interface StudyPeer {
  name: string;
  value: number; // seconds studied
}

export default function App() {
  const [timer, setTimer] = useState(0);
  const [isStudying, setIsStudying] = useState(false);
  
  // Data for Line Chart (Study History)
  const [studyHistory, setStudyHistory] = useState<{ name: string; value: number }[]>([
    { name: 'Start', value: 0 }
  ]);

  // Data for Pie Chart (Group Study Time)
  const [groupData, setGroupData] = useState<StudyPeer[]>([
    { name: "Me", value: 0 },
    { name: "sans", value: 3200 },
    { name: "jerry", value: 4500 },
    { name: "tom", value: 1500 },
    { name: "sam", value: 800 },
    { name: "A", value: 2100 },
    { name: "B", value: 1200 },
  ]);

  useEffect(() => {
    let interval: number | undefined;
    if (isStudying) {
      interval = window.setInterval(() => {
        setTimer((prev) => {
          const newTime = prev + 1;
          
          // Update Pie Chart: Increase 'Me' value
          setGroupData(prevGroupData => 
            prevGroupData.map(member => 
              member.name === "Me" ? { ...member, value: member.value + 1 } : member
            )
          );

          // Update Line Chart: Add data point every 10 seconds for smoothness
          if (newTime % 10 === 0) {
            const timestamp = new Date().toLocaleTimeString([], { hour12: false, minute: '2-digit', second: '2-digit' });
            setStudyHistory(prevHistory => {
              const newHistory = [...prevHistory, { name: timestamp, value: newTime }];
              // Keep only the last 20 points to prevent overcrowding
              return newHistory.slice(-20);
            });
          }

          return newTime;
        });
      }, 1000);
    } else {
      window.clearInterval(interval);
    }
    return () => window.clearInterval(interval);
  }, [isStudying]);

  const toggleTimer = () => setIsStudying(!isStudying);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-900">
      <div className="w-full max-w-6xl bg-gray-800/50 border border-gray-600 rounded-lg shadow-xl backdrop-blur-md overflow-hidden flex flex-col">
        
        {/* Header */}
        <header className="px-6 py-4 border-b border-gray-700">
          <h1 className="text-xl font-medium text-white tracking-wide">study together</h1>
        </header>

        {/* Main Content Grid */}
        <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: Chat */}
          <div className="lg:col-span-4 flex flex-col gap-4 h-full">
            <ChatSection />
          </div>

          {/* Right Column: Dashboard */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            
            {/* Top Row: Timer & Progress */}
            <div className="bg-gray-700/30 p-5 rounded-lg border border-gray-600/50">
              <TimerSection 
                timer={timer} 
                isStudying={isStudying} 
                onToggle={toggleTimer} 
              />
            </div>

            {/* Middle Row: Line Chart */}
            <div className="bg-gray-700/30 p-5 rounded-lg border border-gray-600/50">
               <div className="mb-4 border-b border-gray-600/50 pb-2">
                 <span className="text-sm font-medium text-gray-300 px-2 pb-2 border-b-2 border-blue-500 inline-block">시간 관리</span>
               </div>
               <StatsSection data={studyHistory} />
            </div>

            {/* Bottom Row: Pie Chart & Members */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="bg-gray-700/30 p-5 rounded-lg border border-gray-600/50 flex flex-col items-center justify-center">
                  <h3 className="w-full text-left text-sm font-medium text-gray-300 mb-4 px-2">인원별 공부 시간 (순위)</h3>
                  <PieChartSection data={groupData} />
               </div>
               <div className="bg-gray-700/30 p-5 rounded-lg border border-gray-600/50">
                 <MemberSection />
               </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

// Separate component for Pie Chart
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

// Distinct colors for ranking: Gold, Silver, Bronze, etc.
const RANK_COLORS = [
  "#FFD700", // Gold
  "#C0C0C0", // Silver
  "#CD7F32", // Bronze
  "#4ADE80", // Green
  "#60A5FA", // Blue
  "#A78BFA", // Purple
  "#F472B6", // Pink
];

function PieChartSection({ data }: { data: StudyPeer[] }) {
  // Sort data descending by value
  const sortedData = [...data].sort((a, b) => b.value - a.value);

  return (
    <div className="w-full h-48">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={sortedData}
            cx="50%"
            cy="50%"
            innerRadius={40}
            outerRadius={60}
            paddingAngle={3}
            dataKey="value"
            animationDuration={500}
          >
            {sortedData.map((entry, index) => (
              <Cell 
                key={`cell-${entry.name}`} 
                fill={RANK_COLORS[index % RANK_COLORS.length]} 
                stroke="rgba(0,0,0,0.2)"
              />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value: number) => {
              const minutes = Math.floor(value / 60);
              return [`${minutes}분`, '공부 시간'];
            }}
            contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', color: '#fff' }}
            itemStyle={{ color: '#fff' }}
          />
        </PieChart>
      </ResponsiveContainer>
      
      {/* Legend for top 3 */}
      <div className="mt-2 flex justify-center gap-3 text-xs text-gray-400">
        {sortedData.slice(0, 3).map((item, i) => (
            <div key={item.name} className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: RANK_COLORS[i] }}></div>
                <span>{item.name}</span>
            </div>
        ))}
      </div>
    </div>
  );
}
