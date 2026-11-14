import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/Authcontext';
import SideBar from '../components/dashboard/SideBar';
import Header from '../components/dashboard/Header';

const Waveform = ({ isPlaying = true }: { isPlaying?: boolean }) => {
  const bars = [
    6, 12, 18, 24, 14, 8, 20, 28, 34, 22, 16, 26, 32, 18, 10, 22, 30, 24, 14,
    28, 36, 20, 12, 24, 30, 16, 8, 18, 26, 32, 22, 14, 20, 28, 18, 10, 24, 32,
    20, 14, 26, 30, 16, 10, 18, 24, 14, 8, 16, 22, 12, 6,
  ];
  return (
    <div className="flex items-center gap-[3px] h-10 w-full overflow-hidden">
      {bars.map((height, i) => (
        <motion.div
          key={i}
          className="w-1 rounded-full bg-gradient-to-t from-emerald-500 to-teal-300"
          animate={
            isPlaying
              ? {
                  height: [
                    `${Math.max(4, height * 0.5)}px`,
                    `${Math.max(4, height * 1.15)}px`,
                    `${Math.max(4, height * 0.65)}px`,
                  ],
                }
              : { height: `${Math.max(4, height * 0.4)}px` }
          }
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
      <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center flex-shrink-0 text-blue-400 shadow-sm">
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M15 10.5v3l4-4v7l-4-4v3a2 2 0 01-2 2H5a2 2 0 01-2-2v-8a2 2 0 012-2h8a2 2 0 012 2z" />
        </svg>
      </div>
    );
  }
  if (type === 'gmeet') {
    return (
      <div className="w-10 h-10 rounded-xl bg-slate-800/90 border border-slate-700/80 flex items-center justify-center flex-shrink-0 shadow-sm">
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
    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center flex-shrink-0 text-emerald-400">
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    </div>
  );
};

const AvatarStack = ({ initials }: { initials: string[] }) => {
  const colors = ['bg-indigo-600', 'bg-pink-600', 'bg-teal-600', 'bg-amber-600'];
  return (
    <div className="flex items-center">
      {initials.slice(0, 3).map((init, i) => (
        <div
          key={i}
          className={`w-7 h-7 rounded-full ${colors[i % colors.length]} text-white text-[10px] font-bold flex items-center justify-center border-2 border-slate-900 -ml-2 first:ml-0 shadow-sm`}
        >
          {init}
        </div>
      ))}
    </div>
  );
};

export const Dashboard = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'summary' | 'transcript' | 'actions' | 'decisions' | 'questions'>('summary');
  const [selectedMeetingId, setSelectedMeetingId] = useState<number>(1);
  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Modals state
  const [newMeetingModal, setNewMeetingModal] = useState(false);
  const [upgradeModal, setUpgradeModal] = useState(false);
  const [quickActionModal, setQuickActionModal] = useState<string | null>(null);
  const [selectedUpcomingMeeting, setSelectedUpcomingMeeting] = useState<any | null>(null);

  const { user } = useAuth();

  const showToast = (msg: string) => {
    setToastMessage(msg);
  };

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  useEffect(() => {
    const handler = () => {
      if (window.innerWidth >= 768) setMobileSidebarOpen(false);
    };
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  const [recentMeetings, setRecentMeetings] = useState([
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
  ]);

  const upcomingMeetings = [
    { id: 101, title: 'Client Follow-up', time: 'Today, 4:00 PM', platform: 'Zoom', canJoin: true, attendees: 4 },
    { id: 102, title: 'Team Sync', time: 'Tomorrow, 10:00 AM', platform: 'Google Meet', canJoin: false, attendees: 6 },
    { id: 103, title: 'Product Demo', time: 'Thu, Apr 30, 2:00 PM', platform: 'Zoom', canJoin: false, attendees: 3 },
  ];

  const [pendingItems, setPendingItems] = useState([
    { id: 1, text: 'Finish payment integration with Stripe', due: 'Due tomorrow', urgent: true, completed: false },
    { id: 2, text: 'Fix mobile layout for meeting notes', due: 'Due Thu, Apr 30', urgent: false, completed: false },
    { id: 3, text: 'Generate API documentation export', due: 'Due Fri, May 2', urgent: false, completed: false },
  ]);

  const [actionItems, setActionItems] = useState([
    { id: 1, text: 'Finish payment integration with Stripe', assignee: 'Agnivesh', due: 'Wed, Apr 30', priority: 'High', completed: false },
    { id: 2, text: 'Fix mobile responsive layout on dashboard', assignee: 'Rahul', due: 'Thu, May 1', priority: 'Medium', completed: false },
    { id: 3, text: 'Send API documentation & OpenAPI specs', assignee: 'Priya', due: 'Fri, May 2', priority: 'Normal', completed: true },
  ]);

  const [newActionInput, setNewActionInput] = useState('');

  const [integrations, setIntegrations] = useState([
    {
      id: 'zoom',
      name: 'Zoom',
      sub: 'Join & access meetings',
      connected: true,
      icon: (
        <div className="w-7 h-7 rounded-lg bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M15 10.5v3l4-4v7l-4-4v3a2 2 0 01-2 2H5a2 2 0 01-2-2v-8a2 2 0 012-2h8a2 2 0 012 2z" />
          </svg>
        </div>
      ),
    },
    {
      id: 'gmeet',
      name: 'Google Meet',
      sub: 'Join & access meetings',
      connected: true,
      icon: (
        <div className="w-7 h-7 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center">
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
      id: 'jira',
      name: 'Jira',
      sub: 'Create tickets from actions',
      connected: true,
      icon: (
        <div className="w-7 h-7 rounded-lg bg-[#0052cc]/20 border border-[#0052cc]/40 flex items-center justify-center text-[#2684ff]">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M11.53 2c0 5.25 4.25 9.5 9.5 9.5-.03-5.26-4.27-9.5-9.5-9.5zm-5.76 5.76c0 5.25 4.25 9.5 9.5 9.5-.03-5.26-4.27-9.5-9.5-9.5zm-5.77 5.76c0 5.25 4.25 9.5 9.5 9.5-.02-5.26-4.26-9.5-9.5-9.5z" />
          </svg>
        </div>
      ),
    },
    {
      id: 'slack',
      name: 'Slack',
      sub: 'Get task notifications',
      connected: true,
      icon: (
        <div className="w-7 h-7 rounded-lg bg-[#4A154B]/30 border border-[#ecb22e]/30 flex items-center justify-center text-[#ecb22e] font-bold text-xs">
          #
        </div>
      ),
    },
    {
      id: 'notion',
      name: 'Notion',
      sub: 'Sync notes & documents',
      connected: false,
      icon: (
        <div className="w-7 h-7 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-white font-serif font-bold text-xs">
          N
        </div>
      ),
    },
    {
      id: 'calendar',
      name: 'Calendar',
      sub: 'Schedule follow-ups',
      connected: true,
      icon: (
        <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
      ),
    },
  ]);

  const quickActions = [
    {
      id: 'join',
      label: 'Join a Meeting',
      sub: 'Connect to Zoom / Google Meet',
      icon: (
        <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.069A1 1 0 0121 8.87v6.26a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      id: 'upload',
      label: 'Upload Recording',
      sub: 'MP4, M4A, WAV etc.',
      icon: (
        <svg className="w-5 h-5 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
        </svg>
      ),
    },
    {
      id: 'paste',
      label: 'Paste Transcript',
      sub: 'Text or raw transcript import',
      icon: (
        <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
    },
    {
      id: 'note',
      label: 'Create Manual Note',
      sub: 'Add meeting notes yourself',
      icon: (
        <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      ),
    },
  ];

  const tabs: { key: 'summary' | 'transcript' | 'actions' | 'decisions' | 'questions'; label: string }[] = [
    { key: 'summary', label: 'Meeting Summary' },
    { key: 'transcript', label: 'Transcript' },
    { key: 'actions', label: `Action Items (${actionItems.filter((a) => !a.completed).length})` },
    { key: 'decisions', label: 'Decisions (2)' },
    { key: 'questions', label: 'Questions (1)' },
  ];

  const togglePendingItem = (id: number) => {
    setPendingItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const next = !item.completed;
          showToast(next ? `Completed: "${item.text}"` : `Reopened: "${item.text}"`);
          return { ...item, completed: next };
        }
        return item;
      })
    );
  };

  const toggleActionItem = (id: number) => {
    setActionItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const next = !item.completed;
          showToast(next ? `Task completed: "${item.text}"` : `Task marked pending: "${item.text}"`);
          return { ...item, completed: next };
        }
        return item;
      })
    );
  };

  const addActionItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newActionInput.trim()) return;
    const newItem = {
      id: Date.now(),
      text: newActionInput.trim(),
      assignee: user?.name?.split(' ')[0] || 'Agnivesh',
      due: 'Next sprint',
      priority: 'Medium',
      completed: false,
    };
    setActionItems((prev) => [newItem, ...prev]);
    setNewActionInput('');
    showToast('New action item added!');
  };

  const toggleIntegration = (id: string, name: string) => {
    setIntegrations((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const nextState = !item.connected;
          showToast(nextState ? `Connected to ${name}!` : `Disconnected from ${name}`);
          return { ...item, connected: nextState };
        }
        return item;
      })
    );
  };

  const handleShare = () => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(window.location.href);
    }
    showToast('Meeting intelligence link copied to clipboard!');
  };

  const activeMeeting = recentMeetings.find((m) => m.id === selectedMeetingId) || recentMeetings[0];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex overflow-hidden font-sans relative">
      {/* Background ambient lighting glows - Exactly matching Landing Page */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[1000px] h-[550px] bg-emerald-500/10 rounded-full blur-[160px]" />
        <div className="absolute top-[35%] right-[-10%] w-[700px] h-[700px] bg-teal-500/5 rounded-full blur-[180px]" />
        <div className="absolute top-[65%] left-[-10%] w-[600px] h-[600px] bg-emerald-600/5 rounded-full blur-[170px]" />
        <div className="absolute bottom-[-5%] right-1/4 w-[800px] h-[500px] bg-emerald-500/10 rounded-full blur-[160px]" />
      </div>

      {/* Floating Interactive Toast Feedback */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-20 right-6 z-50 flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-slate-900/90 border border-emerald-500/40 text-emerald-300 text-xs font-semibold shadow-2xl shadow-emerald-500/10 backdrop-blur-xl"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <div className="hidden md:flex h-screen sticky top-0 z-30">
        <SideBar
          collapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
          onUpgrade={() => setUpgradeModal(true)}
        />
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
              className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm md:hidden"
              onClick={() => setMobileSidebarOpen(false)}
            />
            <motion.div
              key="mob-sb"
              initial={{ x: -260 }}
              animate={{ x: 0 }}
              exit={{ x: -260 }}
              transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              className="fixed left-0 top-0 bottom-0 z-50 w-60 md:hidden"
            >
              <SideBar
                collapsed={false}
                onToggle={() => setMobileSidebarOpen(false)}
                onUpgrade={() => {
                  setMobileSidebarOpen(false);
                  setUpgradeModal(true);
                }}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto relative z-10">
        {/* Top Header - Themed and fully clickable */}
        <Header
          sidebarCollapsed={sidebarCollapsed}
          onSidebarToggle={() => setMobileSidebarOpen(true)}
          onNewMeeting={() => setNewMeetingModal(true)}
          onShowToast={showToast}
        />

        {/* Main Content Body */}
        <main className="flex-1 p-5 md:p-8">
          <div className="max-w-[1360px] mx-auto space-y-6">
            {/* Header greeting & New Meeting CTA banner */}
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
                  <span>Welcome back, {user?.name?.split(' ')[0] || 'Agnivesh'}!</span>
                  <span className="inline-block animate-bounce">👋</span>
                </h1>
                <p className="text-xs md:text-sm text-slate-400 mt-1">
                  Here&#39;s what&#39;s happening with your meetings, action items, and AI insights.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuickActionModal('join')}
                  className="px-3.5 py-2 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white text-xs font-semibold transition-all cursor-pointer flex items-center gap-2 active:scale-95"
                >
                  <svg className="w-3.5 h-3.5 text-blue-400" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M15 10.5v3l4-4v7l-4-4v3a2 2 0 01-2 2H5a2 2 0 01-2-2v-8a2 2 0 012-2h8a2 2 0 012 2z" />
                  </svg>
                  Quick Join
                </button>
                <button
                  onClick={() => setNewMeetingModal(true)}
                  className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 rounded-xl font-extrabold text-xs transition-all shadow-lg shadow-emerald-500/25 active:scale-95 cursor-pointer"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
                  </svg>
                  New Meeting
                </button>
              </div>
            </div>

            {/* 4 Metric Cards - Styled with Landing Page Dark Aesthetics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Card 1: Total Meetings */}
              <div
                onClick={() => showToast('Total Meetings: 12 recorded this month')}
                className="bg-slate-900/60 backdrop-blur-xl rounded-2xl p-5 border border-slate-800/80 hover:border-emerald-500/40 shadow-xl shadow-black/20 flex flex-col justify-between transition-all cursor-pointer group hover:-translate-y-0.5"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover:scale-105 transition-transform">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <span className="text-xs font-bold text-slate-300">Total Meetings</span>
                </div>
                <div className="mt-4">
                  <p className="text-3xl font-black text-white leading-none">12</p>
                  <p className="text-xs font-semibold text-emerald-400 flex items-center gap-1 mt-2.5">
                    <span>↑ 20%</span>
                    <span className="text-slate-500 font-normal">from last week</span>
                  </p>
                </div>
              </div>

              {/* Card 2: Completed Tasks */}
              <div
                onClick={() => {
                  setActiveTab('actions');
                  showToast('Viewing action items');
                }}
                className="bg-slate-900/60 backdrop-blur-xl rounded-2xl p-5 border border-slate-800/80 hover:border-emerald-500/40 shadow-xl shadow-black/20 flex flex-col justify-between transition-all cursor-pointer group hover:-translate-y-0.5"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span className="text-xs font-bold text-slate-300">Completed Tasks</span>
                </div>
                <div className="mt-4">
                  <p className="text-3xl font-black text-white leading-none">8</p>
                  <p className="text-xs font-semibold text-emerald-400 flex items-center gap-1 mt-2.5">
                    <span>↑ 33%</span>
                    <span className="text-slate-500 font-normal">completion rate</span>
                  </p>
                </div>
              </div>

              {/* Card 3: Pending Tasks */}
              <div
                onClick={() => showToast('5 tasks pending approval or review')}
                className="bg-slate-900/60 backdrop-blur-xl rounded-2xl p-5 border border-slate-800/80 hover:border-rose-500/40 shadow-xl shadow-black/20 flex flex-col justify-between transition-all cursor-pointer group hover:-translate-y-0.5"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 group-hover:scale-105 transition-transform">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span className="text-xs font-bold text-slate-300">Pending Tasks</span>
                </div>
                <div className="mt-4">
                  <p className="text-3xl font-black text-white leading-none">5</p>
                  <p className="text-xs font-semibold text-rose-400 flex items-center gap-1 mt-2.5">
                    <span>↑ 2 more</span>
                    <span className="text-slate-500 font-normal">than last week</span>
                  </p>
                </div>
              </div>

              {/* Card 4: Upcoming Meetings */}
              <div
                onClick={() => {
                  setSelectedUpcomingMeeting(upcomingMeetings[0]);
                  showToast('Viewing next scheduled meeting');
                }}
                className="bg-slate-900/60 backdrop-blur-xl rounded-2xl p-5 border border-slate-800/80 hover:border-teal-500/40 shadow-xl shadow-black/20 flex flex-col justify-between transition-all cursor-pointer group hover:-translate-y-0.5"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 group-hover:scale-105 transition-transform">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <span className="text-xs font-bold text-slate-300">Upcoming Meetings</span>
                </div>
                <div className="mt-4">
                  <p className="text-3xl font-black text-white leading-none">3</p>
                  <p className="text-xs text-slate-400 font-normal mt-2.5 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                    Next: Today, 4:00 PM
                  </p>
                </div>
              </div>
            </div>

            {/* Main 2-column layout */}
            <div className="grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-6">
              {/* Left Column: Live Card, Recent Meetings & Tabs */}
              <div className="space-y-6 min-w-0">
                {/* Live Meeting Banner - Dark Theme with Glowing Emerald Accents */}
                <div className="rounded-2xl overflow-hidden bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-emerald-500/30 shadow-2xl shadow-emerald-500/5 backdrop-blur-2xl relative">
                  <div className="flex items-center justify-between px-6 pt-5 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="flex items-center gap-1.5 bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 text-[10px] font-black px-2.5 py-0.5 rounded-full shadow-md shadow-emerald-500/30">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-950 animate-ping" />
                        LIVE
                      </span>
                      <span className="text-slate-400 text-xs font-medium ml-1">Current Active Meeting</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setActiveTab('transcript');
                          showToast('Switched to Live Transcript tab');
                        }}
                        className="px-3.5 py-1.5 bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 text-xs font-bold rounded-xl transition-all shadow-md shadow-emerald-500/20 cursor-pointer active:scale-95"
                      >
                        View Live Transcript
                      </button>
                      <button
                        onClick={() => {
                          setIsAudioPlaying(!isAudioPlaying);
                          showToast(isAudioPlaying ? 'Live audio stream muted' : 'Live audio stream unmuted');
                        }}
                        className="w-8 h-8 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 flex items-center justify-center text-slate-400 hover:text-white transition-colors cursor-pointer"
                        title={isAudioPlaying ? 'Pause waveform' : 'Resume waveform'}
                      >
                        {isAudioPlaying ? (
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 9v6m4-6v6" />
                          </svg>
                        ) : (
                          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="px-6 pb-2">
                    <h2 className="text-xl font-extrabold text-white tracking-tight flex items-center gap-2">
                      <span>{activeMeeting.title}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                        Recording in progress
                      </span>
                    </h2>
                    <div className="flex items-center gap-4 mt-2 text-slate-400 text-xs">
                      <span className="flex items-center gap-1.5 text-blue-400">
                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M15 10.5v3l4-4v7l-4-4v3a2 2 0 01-2 2H5a2 2 0 01-2-2v-8a2 2 0 012-2h8a2 2 0 012 2z" />
                        </svg>
                        {activeMeeting.platform}
                      </span>
                      <span className="text-slate-700">•</span>
                      <span className="flex items-center gap-1.5">
                        <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Started 10:24 AM
                      </span>
                      <span className="text-slate-700">•</span>
                      <span className="flex items-center gap-1.5 text-emerald-400 font-mono">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        {activeMeeting.duration}
                      </span>
                    </div>
                  </div>

                  {/* Waveform */}
                  <div className="px-6 py-4">
                    <Waveform isPlaying={isAudioPlaying} />
                  </div>

                  {/* 3 Metrics Footer */}
                  <div className="grid grid-cols-3 border-t border-slate-800/80 bg-slate-950/60 divide-x divide-slate-800/80">
                    <div className="flex items-center justify-center py-3 text-slate-300 text-xs font-semibold gap-1.5">
                      <span>👥</span> 4 Participants
                    </div>
                    <div className="flex items-center justify-center py-3 text-emerald-400 text-xs font-semibold gap-1.5">
                      <span>✨</span> AI Processing Live
                    </div>
                    <div className="flex items-center justify-center py-3 text-teal-300 text-xs font-semibold gap-1.5">
                      <span>⚡</span> Real-time Summary
                    </div>
                  </div>
                </div>

                {/* Recent Meetings Card */}
                <div className="bg-slate-900/60 backdrop-blur-xl rounded-2xl border border-slate-800/80 shadow-2xl shadow-black/20 overflow-hidden">
                  <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800/80">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-white">Recent Meetings</h3>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
                        {recentMeetings.length} total
                      </span>
                    </div>
                    <button
                      onClick={() => showToast('Showing all meeting archives')}
                      className="flex items-center gap-1 text-xs text-emerald-400 hover:text-emerald-300 font-semibold transition-colors cursor-pointer"
                    >
                      View all →
                    </button>
                  </div>

                  {/* Meeting list */}
                  <div className="divide-y divide-slate-800/40">
                    {recentMeetings.map((m) => {
                      const isSelected = m.id === selectedMeetingId;
                      return (
                        <div
                          key={m.id}
                          onClick={() => {
                            setSelectedMeetingId(m.id);
                            showToast(`Selected meeting: "${m.title}"`);
                          }}
                          className={`flex items-center gap-4 px-6 py-3.5 transition-all cursor-pointer group ${
                            isSelected
                              ? 'bg-slate-800/60 border-l-4 border-l-emerald-400'
                              : 'hover:bg-slate-800/30'
                          }`}
                        >
                          <PlatformIcon type={m.icon} />
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-bold text-white group-hover:text-emerald-300 transition-colors truncate">
                              {m.title}
                            </p>
                            <p className="text-[11px] text-slate-400 mt-0.5 font-mono">
                              {m.platform} • {m.date} • {m.duration}
                            </p>
                          </div>

                          {m.status === 'live' ? (
                            <span className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-300 bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-0.5 rounded-full shadow-xs shadow-emerald-500/20">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                              Live
                            </span>
                          ) : (
                            <span className="text-[10px] font-bold text-teal-300 bg-teal-500/10 border border-teal-500/20 px-2.5 py-0.5 rounded-full">
                              Processed
                            </span>
                          )}

                          <AvatarStack initials={m.avatars} />
                          <span className="text-slate-600 group-hover:text-emerald-400 transition-colors text-sm font-bold">
                            ›
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Tabs Bar */}
                  <div className="border-t border-slate-800/80 px-6 pt-3 flex items-center justify-between bg-slate-950/40">
                    <div className="flex items-center gap-5 overflow-x-auto scrollbar-none pb-1">
                      {tabs.map((tab) => (
                        <button
                          key={tab.key}
                          onClick={() => setActiveTab(tab.key)}
                          className={`text-xs font-bold pb-2.5 transition-all whitespace-nowrap border-b-2 cursor-pointer ${
                            activeTab === tab.key
                              ? 'text-emerald-400 border-emerald-400'
                              : 'text-slate-400 border-transparent hover:text-slate-200'
                          }`}
                        >
                          {tab.label}
                        </button>
                      ))}
                    </div>

                    <button
                      onClick={handleShare}
                      className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-white font-semibold border border-slate-700/80 px-3 py-1.5 rounded-xl hover:bg-slate-800/60 mb-2 flex-shrink-0 transition-all cursor-pointer active:scale-95"
                    >
                      <svg className="w-3.5 h-3.5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                      </svg>
                      Share
                    </button>
                  </div>

                  {/* Tab Details */}
                  <div className="p-6 pt-3">
                    {/* 1. Summary Tab */}
                    {activeTab === 'summary' && (
                      <div className="space-y-4">
                        {/* AI Summary Banner */}
                        <div className="flex items-start gap-3.5 p-4 bg-slate-950/70 rounded-2xl border border-emerald-500/20 shadow-inner">
                          <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center flex-shrink-0 text-emerald-400">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                            </svg>
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <p className="text-xs font-bold text-white">AI Executive Summary</p>
                              <span className="text-[9px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                                99.4% confidence
                              </span>
                            </div>
                            <p className="text-xs text-slate-300 leading-relaxed">
                              The team finalized the Q2 roadmap for <strong>{activeMeeting.title}</strong>, focusing on the product launch, Stripe payment integration, and mobile responsive layout. The launch timeline is confirmed for next Friday. Rahul will handle mobile adjustments and Priya has documented the core API specs.
                            </p>
                          </div>
                        </div>

                        {/* 3 Detail Columns */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {/* Key Decisions */}
                          <div className="p-4 bg-slate-950/50 rounded-xl border border-slate-800/80">
                            <p className="text-xs font-bold text-slate-200 mb-2 flex items-center gap-1.5">
                              <span className="w-2 h-2 rounded-full bg-blue-400" />
                              Key Decisions
                            </p>
                            <ul className="space-y-2 text-xs text-slate-400">
                              <li className="flex items-start gap-1.5">
                                <span className="text-blue-400 font-bold">•</span>
                                <span>Website launch finalized for Friday</span>
                              </li>
                              <li className="flex items-start gap-1.5">
                                <span className="text-blue-400 font-bold">•</span>
                                <span>Payment gateway changed to Stripe</span>
                              </li>
                              <li className="flex items-start gap-1.5">
                                <span className="text-blue-400 font-bold">•</span>
                                <span>Dark theme UI standardized across all pages</span>
                              </li>
                            </ul>
                          </div>

                          {/* Action Items */}
                          <div className="p-4 bg-slate-950/50 rounded-xl border border-slate-800/80">
                            <p className="text-xs font-bold text-slate-200 mb-2 flex items-center gap-1.5">
                              <span className="w-2 h-2 rounded-full bg-emerald-400" />
                              Action Items
                            </p>
                            <ul className="space-y-2 text-xs text-slate-400">
                              <li className="flex items-start gap-1.5">
                                <span className="text-emerald-400 font-bold">•</span>
                                <div>
                                  <span className="text-slate-200">Finish Stripe integration</span>
                                  <p className="text-[10px] text-slate-500">Agnivesh • Wed, Apr 30</p>
                                </div>
                              </li>
                              <li className="flex items-start gap-1.5">
                                <span className="text-emerald-400 font-bold">•</span>
                                <div>
                                  <span className="text-slate-200">Fix mobile responsive layout</span>
                                  <p className="text-[10px] text-slate-500">Rahul • Thu, May 1</p>
                                </div>
                              </li>
                            </ul>
                          </div>

                          {/* Open Questions */}
                          <div className="p-4 bg-slate-950/50 rounded-xl border border-slate-800/80">
                            <p className="text-xs font-bold text-slate-200 mb-2 flex items-center gap-1.5">
                              <span className="w-2 h-2 rounded-full bg-amber-400" />
                              Open Questions
                            </p>
                            <ul className="space-y-2 text-xs text-slate-400">
                              <li className="flex items-start gap-1.5">
                                <span className="text-amber-400 font-bold">•</span>
                                <span>What specific mobile breakpoint changes are requested by design?</span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* 2. Transcript Tab */}
                    {activeTab === 'transcript' && (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 bg-slate-950/60 rounded-xl border border-slate-800 text-xs">
                          <div className="flex items-center gap-2 text-slate-400">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                            <span>Live audio transcription • English (US)</span>
                          </div>
                          <button
                            onClick={() => {
                              if (navigator?.clipboard) {
                                navigator.clipboard.writeText("Agnivesh: Good morning everyone. Let's review the roadmap...\nRahul: The mobile layout changes are underway...\nPriya: Stripe API endpoints are connected.");
                              }
                              showToast('Transcript copied to clipboard!');
                            }}
                            className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold cursor-pointer"
                          >
                            Copy transcript
                          </button>
                        </div>

                        <div className="space-y-3 font-sans text-xs">
                          <div className="p-3 rounded-xl bg-slate-950/40 border border-slate-800/60 flex items-start gap-3">
                            <div className="w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center shrink-0">
                              AS
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-1">
                                <span className="font-bold text-white">Agnivesh Sharma (Host)</span>
                                <span className="text-[10px] text-slate-500 font-mono">10:24 AM</span>
                              </div>
                              <p className="text-slate-300 leading-relaxed">
                                Good morning everyone! Let&#39;s quickly run through our product release readiness for next Friday. Rahul, how is the mobile dashboard layout coming along?
                              </p>
                            </div>
                          </div>

                          <div className="p-3 rounded-xl bg-slate-950/40 border border-slate-800/60 flex items-start gap-3">
                            <div className="w-7 h-7 rounded-full bg-blue-500/20 text-blue-400 font-bold flex items-center justify-center shrink-0">
                              RM
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-1">
                                <span className="font-bold text-white">Rahul Mehta</span>
                                <span className="text-[10px] text-slate-500 font-mono">10:26 AM</span>
                              </div>
                              <p className="text-slate-300 leading-relaxed">
                                The responsive drawer and notification popup are in place. We just aligned the theme to match the sleek dark emerald styling of the landing page!
                              </p>
                            </div>
                          </div>

                          <div className="p-3 rounded-xl bg-slate-950/40 border border-slate-800/60 flex items-start gap-3">
                            <div className="w-7 h-7 rounded-full bg-teal-500/20 text-teal-400 font-bold flex items-center justify-center shrink-0">
                              PB
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-1">
                                <span className="font-bold text-white">Priya Bansal</span>
                                <span className="text-[10px] text-slate-500 font-mono">10:28 AM</span>
                              </div>
                              <p className="text-slate-300 leading-relaxed">
                                Stripe webhooks and automated AI summaries are fully functional. The latency is under 300ms for meeting transcription.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* 3. Action Items Tab */}
                    {activeTab === 'actions' && (
                      <div className="space-y-4">
                        {/* Add action item form */}
                        <form onSubmit={addActionItem} className="flex gap-2">
                          <input
                            type="text"
                            value={newActionInput}
                            onChange={(e) => setNewActionInput(e.target.value)}
                            placeholder="Add a new action item..."
                            className="flex-1 bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-2 text-xs text-white placeholder-slate-500 outline-none focus:border-emerald-500"
                          />
                          <button
                            type="submit"
                            className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl transition-all cursor-pointer shadow-md shadow-emerald-500/20 active:scale-95"
                          >
                            + Add
                          </button>
                        </form>

                        <div className="space-y-2.5">
                          {actionItems.map((item) => (
                            <div
                              key={item.id}
                              onClick={() => toggleActionItem(item.id)}
                              className={`flex items-center justify-between p-3.5 rounded-xl border transition-all cursor-pointer ${
                                item.completed
                                  ? 'bg-slate-950/40 border-slate-800/50 opacity-60'
                                  : 'bg-slate-950/70 border-slate-800 hover:border-emerald-500/40'
                              }`}
                            >
                              <div className="flex items-center gap-3 min-w-0">
                                <input
                                  type="checkbox"
                                  checked={item.completed}
                                  onChange={() => {}} // controlled via parent div click
                                  className="w-4 h-4 rounded text-emerald-500 accent-emerald-500 cursor-pointer"
                                />
                                <div className="min-w-0">
                                  <p
                                    className={`text-xs font-semibold ${
                                      item.completed ? 'line-through text-slate-500' : 'text-slate-200'
                                    }`}
                                  >
                                    {item.text}
                                  </p>
                                  <p className="text-[10px] text-slate-500 mt-0.5">
                                    Assigned to {item.assignee} • {item.due}
                                  </p>
                                </div>
                              </div>
                              <span
                                className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                                  item.priority === 'High'
                                    ? 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                                    : 'bg-slate-800 text-slate-400 border-slate-700'
                                }`}
                              >
                                {item.priority}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* 4. Decisions Tab */}
                    {activeTab === 'decisions' && (
                      <div className="space-y-3">
                        <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                              Approved (4/4 agreed)
                            </span>
                            <span className="text-[10px] text-slate-500 font-mono">10:35 AM</span>
                          </div>
                          <h4 className="text-xs font-bold text-white">
                            Launch release locked for Friday 9:00 AM PST
                          </h4>
                          <p className="text-[11px] text-slate-400">
                            The QA suite and security audits passed SOC2 guidelines.
                          </p>
                        </div>

                        <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold text-teal-400 bg-teal-500/10 px-2 py-0.5 rounded-full border border-teal-500/20">
                              Adopted
                            </span>
                            <span className="text-[10px] text-slate-500 font-mono">10:41 AM</span>
                          </div>
                          <h4 className="text-xs font-bold text-white">
                            Standardize Stripe Elements for subscription checkout
                          </h4>
                          <p className="text-[11px] text-slate-400">
                            Eliminates redirection and boosts conversion by estimated 18%.
                          </p>
                        </div>
                      </div>
                    )}

                    {/* 5. Questions Tab */}
                    {activeTab === 'questions' && (
                      <div className="space-y-3">
                        <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
                              Needs Answer
                            </span>
                            <span className="text-[10px] text-slate-500 font-mono">Priya • 10:44 AM</span>
                          </div>
                          <p className="text-xs font-semibold text-white">
                            What specific mobile layout breakpoint fixes are required for tablet screens?
                          </p>
                          <div className="flex items-center gap-2 pt-2">
                            <input
                              type="text"
                              placeholder="Type an answer..."
                              className="flex-1 bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white placeholder-slate-500 outline-none focus:border-emerald-500"
                            />
                            <button
                              onClick={() => showToast('Response recorded!')}
                              className="px-3 py-1.5 bg-emerald-500 text-slate-950 font-bold text-xs rounded-lg cursor-pointer"
                            >
                              Reply
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Column: Quick Actions, Upcoming, Pending Items, Integrations */}
              <div className="space-y-5">
                {/* Quick Actions */}
                <div className="bg-slate-900/60 backdrop-blur-xl rounded-2xl border border-slate-800/80 shadow-2xl shadow-black/20 p-5">
                  <h3 className="text-sm font-bold text-white mb-3">Quick Actions</h3>
                  <div className="space-y-2">
                    {quickActions.map((action) => (
                      <button
                        key={action.id}
                        onClick={() => setQuickActionModal(action.id)}
                        className="w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-800/60 border border-transparent hover:border-slate-700/80 transition-all group text-left cursor-pointer active:scale-98"
                      >
                        <div className="w-8 h-8 rounded-xl bg-slate-800/80 border border-slate-700/80 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                          {action.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold text-slate-200 group-hover:text-emerald-300 transition-colors">
                            {action.label}
                          </p>
                          <p className="text-[11px] text-slate-400 truncate">{action.sub}</p>
                        </div>
                        <span className="text-slate-600 group-hover:text-emerald-400 text-sm font-bold">
                          ›
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Upcoming Meetings */}
                <div className="bg-slate-900/60 backdrop-blur-xl rounded-2xl border border-slate-800/80 shadow-2xl shadow-black/20 p-5">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-bold text-white">Upcoming Meetings</h3>
                    <button
                      onClick={() => showToast('Opening calendar schedule')}
                      className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold transition-colors cursor-pointer"
                    >
                      View all →
                    </button>
                  </div>

                  <div className="space-y-2.5">
                    {upcomingMeetings.map((m) => (
                      <div
                        key={m.id}
                        onClick={() => setSelectedUpcomingMeeting(m)}
                        className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-950/40 border border-slate-800/60 hover:border-slate-700 hover:bg-slate-800/40 transition-all cursor-pointer"
                      >
                        <div className="w-8 h-8 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center flex-shrink-0 text-teal-400">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold text-slate-200 truncate">{m.title}</p>
                          <p className="text-[11px] text-slate-400 font-mono">
                            {m.time} • {m.platform}
                          </p>
                        </div>
                        {m.canJoin ? (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              showToast(`Launching ${m.title} in Zoom...`);
                            }}
                            className="flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 text-[11px] font-bold rounded-lg flex-shrink-0 shadow-md shadow-emerald-500/20 cursor-pointer active:scale-95"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-950 animate-pulse" />
                            Join
                          </button>
                        ) : (
                          <span className="text-slate-600 text-sm font-bold">›</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pending Items Banner - Fully Clickable Checkboxes */}
                <div className="bg-slate-900/70 border border-emerald-500/30 rounded-2xl p-4 shadow-xl shadow-black/20 backdrop-blur-xl relative overflow-hidden">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                        </svg>
                      </div>
                      <p className="text-xs font-bold text-white">
                        {pendingItems.filter((p) => !p.completed).length} pending items
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setPendingItems((prev) => prev.map((p) => ({ ...p, completed: true })));
                        showToast('All pending items marked as done!');
                      }}
                      className="text-[11px] text-emerald-400 hover:text-emerald-300 font-semibold cursor-pointer"
                    >
                      Clear all
                    </button>
                  </div>

                  <div className="space-y-2">
                    {pendingItems.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => togglePendingItem(item.id)}
                        className={`flex items-center justify-between p-2.5 rounded-xl border transition-all cursor-pointer ${
                          item.completed
                            ? 'bg-slate-950/40 border-slate-800/40 opacity-50'
                            : 'bg-slate-950/80 border-slate-800 hover:border-emerald-500/40'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <input
                            type="checkbox"
                            checked={item.completed}
                            onChange={() => {}}
                            className="w-3.5 h-3.5 rounded text-emerald-500 accent-emerald-500 cursor-pointer"
                          />
                          <span
                            className={`text-xs font-medium truncate ${
                              item.completed ? 'line-through text-slate-500' : 'text-slate-200'
                            }`}
                          >
                            {item.text}
                          </span>
                        </div>
                        <span
                          className={`text-[10px] font-bold shrink-0 ml-2 ${
                            item.urgent ? 'text-rose-400' : 'text-slate-500'
                          }`}
                        >
                          {item.due}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Connected Integrations - Fully Interactive Toggles */}
                <div className="bg-slate-900/60 backdrop-blur-xl rounded-2xl border border-slate-800/80 shadow-2xl shadow-black/20 p-5">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-bold text-white">Connected Integrations</h3>
                    <button
                      onClick={() => showToast('Opening integration settings')}
                      className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold cursor-pointer"
                    >
                      Manage →
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    {integrations.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => toggleIntegration(item.id, item.name)}
                        className={`p-3 rounded-xl border transition-all flex flex-col justify-between cursor-pointer group ${
                          item.connected
                            ? 'bg-slate-950/60 border-slate-800 hover:border-emerald-500/40'
                            : 'bg-slate-950/30 border-slate-800/60 hover:border-slate-700 opacity-60'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          {item.icon}
                          <div className="min-w-0 flex-1">
                            <p className="text-xs font-bold text-white group-hover:text-emerald-300 transition-colors truncate">
                              {item.name}
                            </p>
                            <p
                              className={`text-[9px] font-semibold flex items-center gap-1 mt-0.5 ${
                                item.connected ? 'text-emerald-400' : 'text-slate-500'
                              }`}
                            >
                              <span
                                className={`w-1.5 h-1.5 rounded-full ${
                                  item.connected ? 'bg-emerald-400' : 'bg-slate-600'
                                }`}
                              />
                              {item.connected ? 'Connected' : 'Click to connect'}
                            </p>
                          </div>
                        </div>
                        <p className="text-[10px] text-slate-500 mt-2 truncate">{item.sub}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Footer - Styled to match Landing Page Footer */}
            <footer className="pt-6 pb-6 border-t border-slate-800/80 flex flex-wrap items-center justify-between text-xs text-slate-500 gap-4">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 border border-emerald-500/20">
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 10v2a7 7 0 0 1-14 0v-2" />
                    <line x1="12" x2="12" y1="19" y2="22" />
                  </svg>
                </div>
                <span className="font-bold text-slate-300">MeetingMind</span>
                <span className="text-slate-500">• Smarter meetings. Real work.</span>
              </div>

              <div className="flex items-center gap-4 text-[11px] text-slate-400">
                <span className="flex items-center gap-1">🛡️ Secure &amp; Private</span>
                <span>•</span>
                <span>SOC 2 Type II</span>
                <span>•</span>
                <span>256-bit AES Encryption</span>
              </div>
            </footer>
          </div>
        </main>
      </div>

      {/* New Meeting Modal */}
      <AnimatePresence>
        {newMeetingModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/75 backdrop-blur-sm"
              onClick={() => setNewMeetingModal(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 z-50 space-y-4"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  Start or Schedule a New Meeting
                </h3>
                <button
                  onClick={() => setNewMeetingModal(false)}
                  className="text-slate-400 hover:text-white cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="text-xs font-semibold text-slate-300 mb-1 block">
                    Meeting Title
                  </label>
                  <input
                    type="text"
                    defaultValue="Sprint Planning & Architecture Sync"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 mb-1 block">
                    Platform
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {['Zoom', 'Google Meet', 'In-Person Mic'].map((plat, i) => (
                      <button
                        key={i}
                        type="button"
                        className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer ${
                          i === 0
                            ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400'
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        {plat}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 mb-1 block">
                    AI Recording Features
                  </label>
                  <div className="space-y-2 text-xs text-slate-400 bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" defaultChecked className="accent-emerald-500 rounded" />
                      <span>Live speech-to-text transcript</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" defaultChecked className="accent-emerald-500 rounded" />
                      <span>Auto-detect action items &amp; assignees</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" defaultChecked className="accent-emerald-500 rounded" />
                      <span>Send recap notes to Slack channel</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  onClick={() => setNewMeetingModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    const newM = {
                      id: Date.now(),
                      title: 'Sprint Planning & Architecture Sync',
                      platform: 'Zoom',
                      date: 'Just now',
                      duration: '1 min',
                      status: 'live',
                      avatars: ['AS', 'AI'],
                      icon: 'zoom',
                    };
                    setRecentMeetings([newM, ...recentMeetings]);
                    setSelectedMeetingId(newM.id);
                    setNewMeetingModal(false);
                    showToast('New meeting launched with AI transcription!');
                  }}
                  className="px-5 py-2 bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-bold text-xs rounded-xl shadow-md shadow-emerald-500/25 cursor-pointer active:scale-95"
                >
                  Start Meeting
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Upgrade to Pro Modal */}
      <AnimatePresence>
        {upgradeModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/75 backdrop-blur-sm"
              onClick={() => setUpgradeModal(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 z-50 space-y-4"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="text-xl">✨</span>
                  <h3 className="text-base font-bold text-white">Upgrade to MeetingMind Pro</h3>
                </div>
                <button
                  onClick={() => setUpgradeModal(false)}
                  className="text-slate-400 hover:text-white cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/30">
                <div className="flex items-baseline justify-between">
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                    Pro Member
                  </span>
                  <div>
                    <span className="text-2xl font-black text-white">$19</span>
                    <span className="text-slate-400 text-xs">/month</span>
                  </div>
                </div>
                <ul className="mt-3 space-y-2 text-xs text-slate-300">
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-400">✓</span> Unlimited AI summaries &amp; transcripts
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-400">✓</span> Real-time speech translation (50+ languages)
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-400">✓</span> Direct sync with Jira, Notion &amp; Slack
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-400">✓</span> Custom action item workflow automations
                  </li>
                </ul>
              </div>

              <button
                onClick={() => {
                  setUpgradeModal(false);
                  showToast('Thank you! Upgraded to Pro Plan successfully.');
                }}
                className="w-full py-2.5 bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-extrabold text-xs rounded-xl shadow-lg shadow-emerald-500/25 transition-all cursor-pointer"
              >
                Start 14-Day Free Trial
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Quick Action Modals */}
      <AnimatePresence>
        {quickActionModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/75 backdrop-blur-sm"
              onClick={() => setQuickActionModal(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 z-50 space-y-4"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <h3 className="text-base font-bold text-white capitalize">
                  {quickActionModal === 'join' && 'Join a Meeting'}
                  {quickActionModal === 'upload' && 'Upload Recording'}
                  {quickActionModal === 'paste' && 'Paste Raw Transcript'}
                  {quickActionModal === 'note' && 'Create Manual Meeting Note'}
                </h3>
                <button
                  onClick={() => setQuickActionModal(null)}
                  className="text-slate-400 hover:text-white cursor-pointer"
                >
                  ✕
                </button>
              </div>

              {quickActionModal === 'join' && (
                <div className="space-y-3">
                  <p className="text-xs text-slate-400">
                    Enter any Zoom, Google Meet, or Teams URL to invite MeetingMind AI bot.
                  </p>
                  <input
                    type="text"
                    placeholder="https://zoom.us/j/123456789 or meet.google.com/xyz-abc"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 outline-none focus:border-emerald-500"
                  />
                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      onClick={() => setQuickActionModal(null)}
                      className="px-3.5 py-1.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        setQuickActionModal(null);
                        showToast('MeetingMind AI bot joined the meeting!');
                      }}
                      className="px-4 py-1.5 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs cursor-pointer"
                    >
                      Connect Bot
                    </button>
                  </div>
                </div>
              )}

              {quickActionModal === 'upload' && (
                <div className="space-y-3">
                  <div className="border-2 border-dashed border-slate-700 hover:border-emerald-500 rounded-2xl p-8 text-center cursor-pointer transition-colors bg-slate-950/40">
                    <div className="text-3xl mb-2">📁</div>
                    <p className="text-xs font-bold text-white">Drag &amp; drop audio/video file here</p>
                    <p className="text-[10px] text-slate-400 mt-1">Supports MP4, M4A, WAV, MP3 up to 2GB</p>
                  </div>
                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      onClick={() => setQuickActionModal(null)}
                      className="px-3.5 py-1.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        setQuickActionModal(null);
                        showToast('File uploaded! AI transcription is processing.');
                      }}
                      className="px-4 py-1.5 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs cursor-pointer"
                    >
                      Simulate Upload
                    </button>
                  </div>
                </div>
              )}

              {quickActionModal === 'paste' && (
                <div className="space-y-3">
                  <textarea
                    rows={5}
                    placeholder="Paste transcript text here..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white placeholder-slate-500 outline-none focus:border-emerald-500 resize-none"
                  />
                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      onClick={() => setQuickActionModal(null)}
                      className="px-3.5 py-1.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        setQuickActionModal(null);
                        setActiveTab('summary');
                        showToast('Transcript parsed and AI summary generated!');
                      }}
                      className="px-4 py-1.5 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs cursor-pointer"
                    >
                      Extract AI Insights
                    </button>
                  </div>
                </div>
              )}

              {quickActionModal === 'note' && (
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Note Title (e.g. 1-on-1 with Rahul)"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 outline-none focus:border-emerald-500"
                  />
                  <textarea
                    rows={4}
                    placeholder="Write key notes, thoughts, or observations..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white placeholder-slate-500 outline-none focus:border-emerald-500 resize-none"
                  />
                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      onClick={() => setQuickActionModal(null)}
                      className="px-3.5 py-1.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        setQuickActionModal(null);
                        showToast('Meeting note saved to dashboard!');
                      }}
                      className="px-4 py-1.5 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs cursor-pointer"
                    >
                      Save Note
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Selected Upcoming Meeting Detail Modal */}
      <AnimatePresence>
        {selectedUpcomingMeeting && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/75 backdrop-blur-sm"
              onClick={() => setSelectedUpcomingMeeting(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 z-50 space-y-4"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="text-[10px] font-bold uppercase tracking-wider text-teal-400 bg-teal-500/10 px-2.5 py-0.5 rounded-full border border-teal-500/20">
                  Scheduled
                </span>
                <button
                  onClick={() => setSelectedUpcomingMeeting(null)}
                  className="text-slate-400 hover:text-white cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <div>
                <h3 className="text-base font-bold text-white leading-snug">
                  {selectedUpcomingMeeting.title}
                </h3>
                <p className="text-xs text-slate-400 mt-1 font-mono">
                  {selectedUpcomingMeeting.time} • {selectedUpcomingMeeting.platform}
                </p>
              </div>

              <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800 text-xs text-slate-300 space-y-1">
                <p className="font-semibold text-white">Participants ({selectedUpcomingMeeting.attendees})</p>
                <p className="text-[11px] text-slate-400">Agnivesh Sharma, Product Team, Client Lead</p>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  onClick={() => setSelectedUpcomingMeeting(null)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold cursor-pointer"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    setSelectedUpcomingMeeting(null);
                    showToast(`Launching ${selectedUpcomingMeeting.title}...`);
                  }}
                  className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-bold text-xs rounded-xl shadow-md shadow-emerald-500/20 cursor-pointer"
                >
                  Join Meeting Now
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dashboard;
