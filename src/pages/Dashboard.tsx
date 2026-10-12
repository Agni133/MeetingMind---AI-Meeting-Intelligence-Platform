import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/Authcontext';
import SideBar from '../components/dashboard/SideBar';

const Waveform = () => {
  const bars = [
    6, 12, 18, 24, 14, 8, 20, 28, 34, 22, 16, 26, 32, 18, 10, 22, 30, 24, 14,
    28, 36, 20, 12, 24, 30, 16, 8, 18, 26, 32, 22, 14, 20, 28, 18, 10, 24, 32,
    20, 14, 26, 30, 16, 10, 18, 24, 14, 8, 16, 22, 12, 6
  ];
  return (
    <div className="flex items-center gap-[3px] h-10 w-full overflow-hidden">
      {bars.map((height, i) => (
        <motion.div
          key={i}
          className="w-1 rounded-full bg-[#00c087]"
          animate={{
            height: [
              `${Math.max(4, height * 0.6)}px`,
              `${Math.max(4, height * 1.1)}px`,
              `${Math.max(4, height * 0.7)}px`,
            ],
          }}
          transition={{
            duration: 1.1 + (i % 6) * 0.15,
            repeat: Infinity,
            repeatType: 'mirror',
            ease: 'easeInOut',
            delay: (i % 12) * 0.05,
          }}
          style={{ height: `${height}px` }}
        />
      ))}
    </div>
  );
};

const PlatformIcon = ({ type }: { type: string }) => {
  if (type === 'zoom') {
    return (
      <div className="w-10 h-10 rounded-xl bg-blue-500 flex items-center justify-center flex-shrink-0 shadow-sm">
        <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
          <path d="M15 10.5v3l4-4v7l-4-4v3a2 2 0 01-2 2H5a2 2 0 01-2-2v-8a2 2 0 012-2h8a2 2 0 012 2z" />
        </svg>
      </div>
    );
  }
  if (type === 'gmeet') {
    return (
      <div className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center flex-shrink-0 shadow-sm">
        <svg className="w-5 h-5" viewBox="0 0 24 24">
          <path fill="#EA4335" d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.8 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.4 9 5 12 5z" />
          <path fill="#4285F4" d="M23 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.2c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.5-5 3.5-8.8z" />
          <path fill="#FBBC05" d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3 0-.8.1-1.6.4-2.3L1.9 7.3C.7 9.7 0 12.3 0 15.2s.7 5.5 1.9 7.9l3.7-2.9z" />
          <path fill="#34A853" d="M12 23.5c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2-6.4-4.8L1.9 16.9C3.7 20.6 7.5 23.5 12 23.5z" />
        </svg>
      </div>
    );
  }
  return (
    <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center flex-shrink-0">
      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    </div>
  );
};

const AvatarStack = ({ initials }: { initials: string[] }) => {
  const colors = ['bg-[#6366f1]', 'bg-[#ec4899]', 'bg-[#14b8a6]', 'bg-[#f59e0b]'];
  return (
    <div className="flex items-center">
      {initials.slice(0, 3).map((init, i) => (
        <div
          key={i}
          className={`w-7 h-7 rounded-full ${colors[i % colors.length]} text-white text-[10px] font-bold flex items-center justify-center border-2 border-white -ml-2 first:ml-0 shadow-sm`}
        >
          {init}
        </div>
      ))}
    </div>
  );
};

const Dashboard = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('summary');
  const { user } = useAuth();

  useEffect(() => {
    const handler = () => {
      if (window.innerWidth >= 768) setMobileSidebarOpen(false);
    };
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  const recentMeetings = [
    {
      id: 1,
      title: 'Product Sync - Q2 Roadmap',
      platform: 'Zoom',
      date: 'Apr 26, 2025 10:24 AM',
      duration: '42 min',
      status: 'live',
      avatars: ['AS', 'KP', 'MR'],
      icon: 'zoom',
    },
    {
      id: 2,
      title: 'Client Onboarding Call',
      platform: 'Google Meet',
      date: 'Apr 25, 2025 3:15 PM',
      duration: '28 min',
      status: 'processed',
      avatars: ['JD', 'SL'],
      icon: 'gmeet',
    },
    {
      id: 3,
      title: 'Engineering Standup',
      platform: 'Zoom',
      date: 'Apr 24, 2025 10:00 AM',
      duration: '20 min',
      status: 'processed',
      avatars: ['RM', 'AK', 'PB'],
      icon: 'zoom',
    },
    {
      id: 4,
      title: 'Design Review',
      platform: 'Google Meet',
      date: 'Apr 22, 2025 2:30 PM',
      duration: '36 min',
      status: 'processed',
      avatars: ['EC', 'TV'],
      icon: 'gmeet',
    },
    {
      id: 5,
      title: 'Marketing Strategy',
      platform: 'Upload',
      date: 'Apr 20, 2025 11:45 AM',
      duration: '1h 12m',
      status: 'processed',
      avatars: ['MB', 'JR', 'KA'],
      icon: 'upload',
    },
  ];

  const upcomingMeetings = [
    { title: 'Client Follow-up', time: 'Today, 4:00 PM', platform: 'Zoom', canJoin: true },
    { title: 'Team Sync', time: 'Tomorrow, 10:00 AM', platform: 'Google Meet', canJoin: false },
    { title: 'Product Demo', time: 'Thu, Apr 30, 2:00 PM', platform: 'Zoom', canJoin: false },
  ];

  const pendingItems = [
    { text: 'Payment integration', due: 'Due tomorrow', urgent: true },
    { text: 'Mobile layout fixes', due: 'Due Thu, Apr 30', urgent: false },
    { text: 'API documentation', due: 'Due Fri, May 2', urgent: false },
  ];

  const integrations = [
    {
      name: 'Zoom',
      sub: 'Join & access meetings',
      icon: (
        <div className="w-7 h-7 rounded-lg bg-blue-500 flex items-center justify-center text-white">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M15 10.5v3l4-4v7l-4-4v3a2 2 0 01-2 2H5a2 2 0 01-2-2v-8a2 2 0 012-2h8a2 2 0 012 2z" />
          </svg>
        </div>
      ),
    },
    {
      name: 'Google Meet',
      sub: 'Join & access meetings',
      icon: (
        <div className="w-7 h-7 rounded-lg bg-white border border-gray-200 flex items-center justify-center">
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path fill="#EA4335" d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.8 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.4 9 5 12 5z" />
            <path fill="#4285F4" d="M23 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.2c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.5-5 3.5-8.8z" />
            <path fill="#FBBC05" d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3 0-.8.1-1.6.4-2.3L1.9 7.3C.7 9.7 0 12.3 0 15.2s.7 5.5 1.9 7.9l3.7-2.9z" />
            <path fill="#34A853" d="M12 23.5c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2-6.4-4.8L1.9 16.9C3.7 20.6 7.5 23.5 12 23.5z" />
          </svg>
        </div>
      ),
    },
    {
      name: 'Jira',
      sub: 'Create tickets from action items',
      icon: (
        <div className="w-7 h-7 rounded-lg bg-[#0052cc] flex items-center justify-center text-white">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M11.53 2c0 5.25 4.25 9.5 9.5 9.5-.03-5.26-4.27-9.5-9.5-9.5zm-5.76 5.76c0 5.25 4.25 9.5 9.5 9.5-.03-5.26-4.27-9.5-9.5-9.5zm-5.77 5.76c0 5.25 4.25 9.5 9.5 9.5-.02-5.26-4.26-9.5-9.5-9.5z" />
          </svg>
        </div>
      ),
    },
    {
      name: 'Slack',
      sub: 'Get task notifications',
      icon: (
        <div className="w-7 h-7 rounded-lg bg-[#4A154B] flex items-center justify-center text-white font-bold text-xs">
          #
        </div>
      ),
    },
    {
      name: 'Notion',
      sub: 'Sync notes & documents',
      icon: (
        <div className="w-7 h-7 rounded-lg bg-black flex items-center justify-center text-white font-serif font-bold text-xs">
          N
        </div>
      ),
    },
    {
      name: 'Calendar',
      sub: 'Schedule follow-ups',
      icon: (
        <div className="w-7 h-7 rounded-lg bg-blue-500 flex items-center justify-center text-white">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
      ),
    },
  ];

  const quickActions = [
    {
      label: 'Join a Meeting',
      sub: 'Connect to Zoom / Google Meet',
      icon: (
        <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.069A1 1 0 0121 8.87v6.26a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      label: 'Upload Recording',
      sub: 'MP4, M4A, etc.',
      icon: (
        <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
        </svg>
      ),
    },
    {
      label: 'Paste Transcript',
      sub: 'Text or file upload',
      icon: (
        <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
    },
    {
      label: 'Create Manual Note',
      sub: 'Add meeting notes yourself',
      icon: (
        <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      ),
    },
  ];

  const tabs = [
    { key: 'summary', label: 'Meeting Summary' },
    { key: 'transcript', label: 'Transcript' },
    { key: 'actions', label: 'Action Items (3)' },
    { key: 'decisions', label: 'Decisions (2)' },
    { key: 'questions', label: 'Questions (1)' },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] flex overflow-hidden font-sans">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex h-screen sticky top-0 z-30">
        <SideBar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileSidebarOpen && (
          <>
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/50 md:hidden"
              onClick={() => setMobileSidebarOpen(false)}
            />
            <motion.div
              key="mob-sb"
              initial={{ x: -240 }}
              animate={{ x: 0 }}
              exit={{ x: -240 }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              className="fixed left-0 top-0 bottom-0 z-50 w-60 md:hidden"
            >
              <SideBar collapsed={false} onToggle={() => setMobileSidebarOpen(false)} />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-6 sticky top-0 z-20 flex-shrink-0">
          <div className="flex items-center gap-3 flex-1 max-w-lg">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="md:hidden w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div className="relative w-full">
              <svg
                className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search meetings, action items, or people..."
                className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-xs text-gray-700 placeholder-gray-400 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
              />
            </div>
          </div>

          {/* User profile & notification */}
          <div className="flex items-center gap-4 ml-4">
            <button className="relative w-9 h-9 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-600 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              <span className="absolute 1 top-1.5 right-1.5 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-[10px] font-bold text-white leading-none">
                1
              </span>
            </button>

            <div className="flex items-center gap-3 pl-2 border-l border-gray-100 cursor-pointer">
              <div className="w-9 h-9 rounded-full bg-[#1e293b] flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
                AS
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-xs font-bold text-gray-900 leading-none">
                  {user?.name || 'Agnivesh Sharma'}
                </p>
                <p className="text-[11px] text-gray-400 mt-1 leading-none">Product Team</p>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Body */}
        <main className="flex-1 p-6 md:p-8">
          <div className="max-w-[1340px] mx-auto space-y-6">
            {/* Header greeting & New Meeting CTA */}
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">
                  Good morning, Agnivesh! 👋
                </h1>
                <p className="text-xs text-gray-500 mt-1">
                  Here&#39;s what&#39;s happening with your meetings and action items.
                </p>
              </div>
              <button className="flex items-center gap-1.5 px-4 py-2.5 bg-[#00c087] hover:bg-[#00ad7a] text-white rounded-xl font-bold text-xs transition-colors shadow-sm">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
                </svg>
                New Meeting
              </button>
            </div>

            {/* 4 Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Card 1: Total Meetings */}
              <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex flex-col justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-500">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <span className="text-xs font-semibold text-gray-700">Total Meetings</span>
                </div>
                <div className="mt-3">
                  <p className="text-3xl font-extrabold text-gray-900 leading-none">12</p>
                  <p className="text-xs font-semibold text-emerald-600 flex items-center gap-1 mt-2">
                    <span>↑ 20%</span>
                    <span className="text-gray-400 font-normal">from last week</span>
                  </p>
                </div>
              </div>

              {/* Card 2: Completed Tasks */}
              <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex flex-col justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-500">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span className="text-xs font-semibold text-gray-700">Completed Tasks</span>
                </div>
                <div className="mt-3">
                  <p className="text-3xl font-extrabold text-gray-900 leading-none">8</p>
                  <p className="text-xs font-semibold text-emerald-600 flex items-center gap-1 mt-2">
                    <span>↑ 33%</span>
                    <span className="text-gray-400 font-normal">from last week</span>
                  </p>
                </div>
              </div>

              {/* Card 3: Pending Tasks */}
              <div className="bg-[#fff7f7] rounded-2xl p-5 border border-rose-100/80 shadow-sm flex flex-col justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-500">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span className="text-xs font-semibold text-gray-700">Pending Tasks</span>
                </div>
                <div className="mt-3">
                  <p className="text-3xl font-extrabold text-gray-900 leading-none">5</p>
                  <p className="text-xs font-semibold text-rose-500 flex items-center gap-1 mt-2">
                    <span>↑ 2 more</span>
                    <span className="text-gray-400 font-normal">than last week</span>
                  </p>
                </div>
              </div>

              {/* Card 4: Upcoming Meetings */}
              <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex flex-col justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-500">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <span className="text-xs font-semibold text-gray-700">Upcoming Meetings</span>
                </div>
                <div className="mt-3">
                  <p className="text-3xl font-extrabold text-gray-900 leading-none">3</p>
                  <p className="text-xs text-gray-400 font-normal mt-2">
                    Next: Today, 4:00 PM
                  </p>
                </div>
              </div>
            </div>

            {/* Main 2-column layout */}
            <div className="grid grid-cols-1 xl:grid-cols-[1fr_340px] gap-6">
              {/* Left Column: Live Card, Recent Meetings, Tabs */}
              <div className="space-y-6 min-w-0">
                {/* Live Meeting Banner */}
                <div className="rounded-2xl overflow-hidden bg-[#09181e] border border-white/5 shadow-sm">
                  <div className="flex items-center justify-between px-6 pt-5 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="flex items-center gap-1 bg-[#00c087] text-slate-950 text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-950 animate-pulse" />
                        LIVE
                      </span>
                      <span className="text-slate-400 text-xs font-medium ml-1">Current Meeting</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="px-3.5 py-1.5 bg-[#00c087] hover:bg-[#00ad7a] text-slate-950 text-xs font-bold rounded-xl transition-colors shadow-sm">
                        View Live Transcript
                      </button>
                      <button className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <circle cx="5" cy="12" r="2" />
                          <circle cx="12" cy="12" r="2" />
                          <circle cx="19" cy="12" r="2" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  <div className="px-6 pb-2">
                    <h2 className="text-xl font-bold text-white tracking-tight">
                      Product Sync - Q2 Roadmap
                    </h2>
                    <div className="flex items-center gap-4 mt-2 text-slate-400 text-xs">
                      <span className="flex items-center gap-1.5">
                        <svg className="w-3.5 h-3.5 text-blue-400" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M15 10.5v3l4-4v7l-4-4v3a2 2 0 01-2 2H5a2 2 0 01-2-2v-8a2 2 0 012-2h8a2 2 0 012 2z" />
                        </svg>
                        Zoom
                      </span>
                      <span className="text-slate-600">•</span>
                      <span className="flex items-center gap-1.5">
                        <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Started 10:24 AM
                      </span>
                      <span className="text-slate-600">•</span>
                      <span className="flex items-center gap-1.5">
                        <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        42 min
                      </span>
                    </div>
                  </div>

                  {/* Waveform */}
                  <div className="px-6 py-4">
                    <Waveform />
                  </div>

                  {/* 3 Metrics Footer */}
                  <div className="grid grid-cols-3 border-t border-white/5 bg-black/10">
                    <div className="flex items-center justify-center py-3 text-slate-300 text-xs font-medium">
                      👥 4 Participants
                    </div>
                    <div className="flex items-center justify-center py-3 text-slate-300 text-xs font-medium border-l border-white/5">
                      ✨ AI Processing
                    </div>
                    <div className="flex items-center justify-center py-3 text-slate-300 text-xs font-medium border-l border-white/5">
                      ⚡ Real-time Summary
                    </div>
                  </div>
                </div>

                {/* Recent Meetings Card */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                  <div className="flex items-center justify-between px-6 py-4 border-b border-gray-50">
                    <h3 className="text-sm font-bold text-gray-900">Recent Meetings</h3>
                    <button className="flex items-center gap-1 text-xs text-blue-600 font-semibold hover:underline">
                      View all →
                    </button>
                  </div>
                  <div className="divide-y divide-gray-50">
                    {recentMeetings.map((m) => (
                      <div
                        key={m.id}
                        className="flex items-center gap-4 px-6 py-3.5 hover:bg-gray-50/70 transition-colors group cursor-pointer"
                      >
                        <PlatformIcon type={m.icon} />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold text-gray-900 truncate">{m.title}</p>
                          <p className="text-[11px] text-gray-400 mt-0.5">
                            {m.platform} • {m.date} • {m.duration}
                          </p>
                        </div>
                        {m.status === 'live' ? (
                          <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            Live
                          </span>
                        ) : (
                          <span className="text-[11px] font-semibold text-blue-600 bg-blue-50 border border-blue-100 px-2.5 py-0.5 rounded-full">
                            Processed
                          </span>
                        )}
                        <AvatarStack initials={m.avatars} />
                        <span className="text-gray-300 group-hover:text-gray-500 transition-colors text-sm font-bold">
                          ›
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Tabs Bar */}
                  <div className="border-t border-gray-100 px-6 pt-3 flex items-center justify-between">
                    <div className="flex items-center gap-6 overflow-x-auto">
                      {tabs.map((tab) => (
                        <button
                          key={tab.key}
                          onClick={() => setActiveTab(tab.key)}
                          className={`text-xs font-semibold pb-2.5 transition-all whitespace-nowrap border-b-2 ${
                            activeTab === tab.key
                              ? 'text-blue-600 border-blue-600'
                              : 'text-gray-400 border-transparent hover:text-gray-700'
                          }`}
                        >
                          {tab.label}
                        </button>
                      ))}
                    </div>
                    <button className="flex items-center gap-1 text-xs text-gray-700 font-semibold border border-gray-200 px-3 py-1.5 rounded-lg hover:bg-gray-50 mb-2 flex-shrink-0">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                      </svg>
                      Share
                    </button>
                  </div>

                  {/* Tab Details */}
                  {activeTab === 'summary' && (
                    <div className="px-6 pb-6 pt-2 space-y-4">
                      {/* AI Summary Banner */}
                      <div className="flex items-start gap-3 p-4 bg-[#f3f7fe] rounded-xl border border-blue-50">
                        <div className="w-7 h-7 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0 text-blue-600">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-xs font-bold text-gray-900 mb-1">AI Summary</p>
                          <p className="text-xs text-gray-600 leading-relaxed">
                            The team discussed the Q2 roadmap, focusing on the product launch, payment integration and mobile optimization. The client confirmed the launch timeline for next Friday and requested a few layout changes for mobile. The team also reviewed the progress on the API and agreed to the next steps.
                          </p>
                        </div>
                      </div>

                      {/* 3 Detail Columns */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Key Decisions */}
                        <div className="p-3.5 bg-gray-50/70 rounded-xl border border-gray-100">
                          <p className="text-xs font-bold text-gray-800 mb-2 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                            Key Decisions
                          </p>
                          <ul className="space-y-1.5 text-[11px] text-gray-600">
                            <li>• Website launch on Friday</li>
                            <li>• Payment provider changed to Stripe</li>
                            <li>• Mobile layout to be updated</li>
                          </ul>
                        </div>

                        {/* Action Items */}
                        <div className="p-3.5 bg-gray-50/70 rounded-xl border border-gray-100">
                          <p className="text-xs font-bold text-gray-800 mb-2 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                            Action Items
                          </p>
                          <ul className="space-y-1.5 text-[11px] text-gray-600">
                            <li>
                              • Finish payment integration <br />
                              <span className="text-gray-400">Agnivesh • Wed, Apr 30</span>
                            </li>
                            <li>
                              • Fix mobile layout <br />
                              <span className="text-gray-400">Rahul • Thu, May 1</span>
                            </li>
                            <li>
                              • Send API documentation <br />
                              <span className="text-gray-400">Priya • Fri, May 2</span>
                            </li>
                          </ul>
                        </div>

                        {/* Open Questions */}
                        <div className="p-3.5 bg-gray-50/70 rounded-xl border border-gray-100">
                          <p className="text-xs font-bold text-gray-800 mb-2 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                            Open Questions
                          </p>
                          <ul className="space-y-1.5 text-[11px] text-gray-600">
                            <li>• What specific mobile layout changes are required?</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column Cards */}
              <div className="space-y-5">
                {/* Quick Actions */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                  <h3 className="text-sm font-bold text-gray-900 mb-3">Quick Actions</h3>
                  <div className="space-y-2">
                    {quickActions.map((action, i) => (
                      <button
                        key={i}
                        className="w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-gray-50 transition-colors group text-left"
                      >
                        <div className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-100 transition-colors">
                          {action.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold text-gray-800">{action.label}</p>
                          <p className="text-[11px] text-gray-400 truncate">{action.sub}</p>
                        </div>
                        <span className="text-gray-300 group-hover:text-gray-500 text-sm font-bold">›</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Upcoming Meetings */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-bold text-gray-900">Upcoming Meetings</h3>
                    <button className="text-xs text-blue-600 font-semibold hover:underline">
                      View all →
                    </button>
                  </div>
                  <div className="space-y-2.5">
                    {upcomingMeetings.map((m, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer"
                      >
                        <div className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0 text-blue-500">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold text-gray-800 truncate">{m.title}</p>
                          <p className="text-[11px] text-gray-400">
                            {m.time} • {m.platform}
                          </p>
                        </div>
                        {m.canJoin ? (
                          <button className="flex items-center gap-1 px-3 py-1 bg-[#00c087] hover:bg-[#00ad7a] text-white text-[11px] font-bold rounded-lg flex-shrink-0 shadow-sm">
                            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                            Join
                          </button>
                        ) : (
                          <span className="text-gray-300 text-sm font-bold">›</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* You have 3 pending items alert banner */}
                <div className="bg-[#effaf5] border border-emerald-100 rounded-2xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                        </svg>
                      </div>
                      <p className="text-xs font-bold text-gray-900">You have 3 pending items</p>
                    </div>
                    <button className="text-xs text-blue-600 font-semibold hover:underline">
                      View all →
                    </button>
                  </div>
                  <div className="space-y-2">
                    {pendingItems.map((item, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between p-2.5 bg-white rounded-xl border border-emerald-50 hover:border-emerald-200 cursor-pointer shadow-sm transition-all"
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <span
                            className={`w-2 h-2 rounded-full flex-shrink-0 ${
                              item.urgent ? 'bg-red-500' : 'bg-amber-400'
                            }`}
                          />
                          <span className="text-xs text-gray-800 font-semibold truncate">
                            {item.text}
                          </span>
                          <span
                            className={`text-[10px] font-bold ${
                              item.urgent ? 'text-red-500' : 'text-gray-400'
                            }`}
                          >
                            — {item.due}
                          </span>
                        </div>
                        <span className="text-gray-300 text-sm font-bold flex-shrink-0 ml-2">›</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Connected Integrations */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-bold text-gray-900">Connected Integrations</h3>
                    <button className="text-xs text-blue-600 font-semibold hover:underline">
                      Manage →
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-2.5">
                    {integrations.map((item, i) => (
                      <div
                        key={i}
                        className="p-2.5 rounded-xl border border-gray-100 hover:border-gray-200 transition-colors bg-white flex flex-col justify-between"
                      >
                        <div className="flex items-center gap-2">
                          {item.icon}
                          <div className="min-w-0 flex-1">
                            <p className="text-xs font-bold text-gray-900 truncate">{item.name}</p>
                            <p className="text-[9px] text-emerald-600 font-semibold flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                              Connected
                            </p>
                          </div>
                        </div>
                        <p className="text-[10px] text-gray-400 mt-2 truncate">{item.sub}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <footer className="pt-6 pb-2 border-t border-gray-200 flex flex-wrap items-center justify-between text-xs text-gray-400 gap-4">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 10v2a7 7 0 0 1-14 0v-2" />
                    <line x1="12" x2="12" y1="19" y2="22" />
                  </svg>
                </div>
                <span className="font-bold text-gray-700">MeetingMind</span>
                <span className="text-gray-400">Smarter meetings. Real work.</span>
              </div>
              <div className="flex items-center gap-4 text-[11px]">
                <span className="flex items-center gap-1">🛡️ Secure &amp; Private</span>
                <span>•</span>
                <span>SOC 2 Compliant</span>
                <span>•</span>
                <span>GDPR Ready</span>
              </div>
            </footer>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
