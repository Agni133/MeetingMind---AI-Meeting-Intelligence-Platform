import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserButton } from '@clerk/react';
import { useAuth } from '../../context/Authcontext';

export interface NotificationItem {
  id: number;
  type: 'transcript' | 'action' | 'meeting' | 'ai';
  title: string;
  desc: string;
  time: string;
  icon: string;
  isRead: boolean;
}

interface HeaderProps {
  onSidebarToggle: () => void;
  sidebarCollapsed: boolean;
  onNewMeeting?: () => void;
  onSelectMeeting?: (id: number) => void;
  onShowToast?: (message: string) => void;
}

const initialNotifications: NotificationItem[] = [
  {
    id: 1,
    type: 'transcript',
    title: 'Q3 Planning transcript ready',
    desc: 'Audio transcription completed with 99.2% accuracy & speaker diarization',
    time: '2 min ago',
    icon: '📝',
    isRead: false,
  },
  {
    id: 2,
    type: 'action',
    title: 'Action item assigned to you',
    desc: 'Rahul assigned "Finish payment integration" (Due Apr 30)',
    time: '15 min ago',
    icon: '✅',
    isRead: false,
  },
  {
    id: 3,
    type: 'meeting',
    title: 'Design Sync starts in 10 min',
    desc: 'Google Meet with product team. 4 participants attending.',
    time: '20 min ago',
    icon: '📅',
    isRead: false,
  },
  {
    id: 4,
    type: 'ai',
    title: 'AI Summary generated',
    desc: 'Key decisions and open questions extracted from Client Onboarding call',
    time: '1 hour ago',
    icon: '✨',
    isRead: true,
  },
];

const Header: React.FC<HeaderProps> = ({
  onSidebarToggle,
  onNewMeeting,
  onShowToast,
}) => {
  const { user, logout } = useAuth();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifTab, setNotifTab] = useState<'all' | 'unread'>('all');
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedNotif, setSelectedNotif] = useState<NotificationItem | null>(null);

  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  // Listen for Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 50);
    }
  }, [searchOpen]);

  const timeStr = currentTime.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
  const dateStr = currentTime.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const markAsRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    onShowToast?.('All notifications marked as read');
  };

  const removeNotification = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setNotifications((prev) => prev.filter((n) => n.id !== id));
    if (selectedNotif?.id === id) setSelectedNotif(null);
    onShowToast?.('Notification dismissed');
  };

  const handleNotificationClick = (item: NotificationItem) => {
    markAsRead(item.id);
    setSelectedNotif(item);
  };

  const displayedNotifications = notifications.filter((n) => {
    if (notifTab === 'unread') return !n.isRead;
    return true;
  });

  const searchableItems = [
    { title: 'Product Sync - Q2 Roadmap', type: 'Meeting', time: 'Today 10:24 AM' },
    { title: 'Client Onboarding Call', type: 'Transcript', time: 'Yesterday 3:15 PM' },
    { title: 'Engineering Standup', type: 'Meeting', time: 'Apr 24, 10:00 AM' },
    { title: 'Finish payment integration with Stripe', type: 'Action Item', time: 'Due Apr 30' },
    { title: 'Fix mobile layout for dashboard', type: 'Action Item', time: 'Due May 1' },
    { title: 'Update Notion meeting documentation', type: 'Integration', time: 'Active' },
  ];

  const filteredSearch = searchQuery.trim()
    ? searchableItems.filter((i) =>
      i.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      i.type.toLowerCase().includes(searchQuery.toLowerCase())
    )
    : searchableItems;

  return (
    <>
      <header className="h-16 flex items-center justify-between px-5 bg-slate-950/80 border-b border-slate-800/80 backdrop-blur-xl relative z-30">
        {/* Left: Mobile Sidebar toggle + Page title */}
        <div className="flex items-center gap-4">
          <button
            onClick={onSidebarToggle}
            className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800/80 hover:border-emerald-500/50 flex items-center justify-center text-slate-400 hover:text-white transition-all md:hidden cursor-pointer active:scale-95 shadow-sm"
            aria-label="Toggle sidebar"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <div>
            <h1 className="text-sm font-bold text-white leading-none flex items-center gap-1.5">
              <span>Good {currentTime.getHours() < 12 ? 'morning' : currentTime.getHours() < 17 ? 'afternoon' : 'evening'},</span>
              <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-200 bg-clip-text text-transparent font-extrabold">
                {user?.name?.split(' ')[0] || 'Agnivesh'} 👋
              </span>
            </h1>
            <p className="text-[11px] text-slate-400 mt-1 flex items-center gap-1.5">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>{dateStr}</span>
              <span className="text-slate-600">•</span>
              <span>{timeStr}</span>
            </p>
          </div>
        </div>

        {/* Center: Search Bar Button */}
        <div className="hidden md:flex flex-1 max-w-md mx-6">
          <button
            onClick={() => setSearchOpen(true)}
            className="w-full flex items-center gap-2.5 px-4 py-2 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-emerald-500/40 text-slate-400 hover:text-slate-200 text-sm transition-all group shadow-inner cursor-pointer"
          >
            <svg
              className="w-4 h-4 shrink-0 text-slate-500 group-hover:text-emerald-400 transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span className="flex-1 text-left text-xs text-slate-400 group-hover:text-slate-300">
              Search meetings, transcripts, action items...
            </span>
            <kbd className="text-[10px] px-2 py-0.5 rounded-md bg-slate-800/80 border border-slate-700/80 text-slate-400 font-mono flex items-center gap-0.5 shadow-xs">
              <span className="text-[11px]">⌘</span>K
            </kbd>
          </button>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-3">
          {/* Mobile Search Button */}
          <button
            onClick={() => setSearchOpen(true)}
            className="md:hidden w-8 h-8 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-all cursor-pointer"
            aria-label="Search"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>

          {/* New Meeting Button */}
          <button
            onClick={onNewMeeting}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 text-xs font-bold transition-all shadow-lg shadow-emerald-500/20 active:scale-[0.97] cursor-pointer hover:shadow-emerald-500/30"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
            </svg>
            <span className="hidden sm:inline">New Meeting</span>
          </button>

          {/* Notifications Trigger */}
          <div className="relative">
            <button
              onClick={() => {
                setNotifOpen(!notifOpen);
                setProfileOpen(false);
              }}
              className={`relative w-9 h-9 rounded-xl border flex items-center justify-center transition-all cursor-pointer ${notifOpen
                  ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400'
                  : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white'
                }`}
              aria-label="Notifications"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>

              {/* Notification Badge */}
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 bg-emerald-500 text-slate-950 rounded-full flex items-center justify-center text-[10px] font-black shadow-md shadow-emerald-500/40 animate-pulse">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notifications Dropdown Popover */}
            <AnimatePresence>
              {notifOpen && (
                <>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-40 bg-black/20 backdrop-blur-[2px]"
                    onClick={() => setNotifOpen(false)}
                  />
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.96 }}
                    transition={{ duration: 0.18, ease: 'easeOut' }}
                    className="absolute right-0 top-full mt-2 w-84 sm:w-96 bg-slate-900/95 border border-slate-800 rounded-2xl shadow-2xl shadow-black/80 backdrop-blur-2xl overflow-hidden z-50 flex flex-col max-h-[85vh]"
                  >
                    {/* Header */}
                    <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800/80 bg-slate-950/40">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-white">Notifications</span>
                        {unreadCount > 0 && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                            {unreadCount} new
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        {unreadCount > 0 && (
                          <button
                            onClick={markAllAsRead}
                            className="text-[11px] text-emerald-400 hover:text-emerald-300 font-medium transition-colors cursor-pointer"
                          >
                            Mark all read
                          </button>
                        )}
                        <button
                          onClick={() => setNotifOpen(false)}
                          className="w-6 h-6 rounded-lg hover:bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white transition-colors cursor-pointer"
                        >
                          ✕
                        </button>
                      </div>
                    </div>

                    {/* Filter tabs */}
                    <div className="flex items-center gap-2 px-4 pt-2.5 pb-2 border-b border-slate-800/50 bg-slate-900/40 text-xs">
                      <button
                        onClick={() => setNotifTab('all')}
                        className={`px-2.5 py-1 rounded-lg font-medium transition-all cursor-pointer ${notifTab === 'all'
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                            : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                          }`}
                      >
                        All ({notifications.length})
                      </button>
                      <button
                        onClick={() => setNotifTab('unread')}
                        className={`px-2.5 py-1 rounded-lg font-medium transition-all cursor-pointer ${notifTab === 'unread'
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                            : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                          }`}
                      >
                        Unread ({unreadCount})
                      </button>
                    </div>

                    {/* List */}
                    <div className="overflow-y-auto divide-y divide-slate-800/40 flex-1 max-h-[380px]">
                      {displayedNotifications.length === 0 ? (
                        <div className="py-12 px-4 text-center">
                          <div className="w-10 h-10 rounded-full bg-slate-800/60 flex items-center justify-center text-slate-500 mx-auto mb-2 text-lg">
                            🔔
                          </div>
                          <p className="text-xs font-semibold text-slate-300">No notifications</p>
                          <p className="text-[11px] text-slate-500 mt-0.5">
                            {notifTab === 'unread'
                              ? "You're all caught up! Great job."
                              : 'No activity recorded yet.'}
                          </p>
                        </div>
                      ) : (
                        displayedNotifications.map((n) => (
                          <div
                            key={n.id}
                            onClick={() => handleNotificationClick(n)}
                            className={`flex items-start gap-3 p-3.5 transition-all cursor-pointer group hover:bg-slate-800/50 relative ${!n.isRead ? 'bg-emerald-500/5' : ''
                              }`}
                          >
                            <span className="text-base p-1.5 rounded-xl bg-slate-800/80 border border-slate-700/50 mt-0.5 shrink-0 group-hover:scale-105 transition-transform">
                              {n.icon}
                            </span>
                            <div className="flex-1 min-w-0 pr-6">
                              <div className="flex items-center gap-2">
                                <p
                                  className={`text-xs truncate ${!n.isRead ? 'font-bold text-white' : 'font-medium text-slate-300'
                                    }`}
                                >
                                  {n.title}
                                </p>
                              </div>
                              <p className="text-[11px] text-slate-400 line-clamp-2 mt-0.5 leading-snug">
                                {n.desc}
                              </p>
                              <p className="text-[10px] text-slate-500 mt-1 flex items-center gap-1 font-mono">
                                <span>{n.time}</span>
                                {!n.isRead && (
                                  <span className="text-emerald-400 font-semibold">• Click to view</span>
                                )}
                              </p>
                            </div>

                            {/* Unread indicator */}
                            {!n.isRead && (
                              <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0 mt-2 shadow-xs shadow-emerald-400" />
                            )}

                            {/* Dismiss button */}
                            <button
                              onClick={(e) => removeNotification(n.id, e)}
                              className="absolute top-3 right-3 w-6 h-6 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-slate-700/80 text-slate-400 hover:text-red-400 flex items-center justify-center text-xs transition-all cursor-pointer"
                              title="Dismiss"
                            >
                              ✕
                            </button>
                          </div>
                        ))
                      )}
                    </div>

                    {/* Footer */}
                    <div className="p-3 border-t border-slate-800/80 bg-slate-950/60 flex items-center justify-between text-xs">
                      <button
                        onClick={() => {
                          setNotifications([]);
                          onShowToast?.('All notifications cleared');
                        }}
                        disabled={notifications.length === 0}
                        className="text-slate-500 hover:text-slate-300 disabled:opacity-30 disabled:hover:text-slate-500 transition-colors cursor-pointer text-[11px]"
                      >
                        Clear all
                      </button>
                      <button
                        onClick={() => {
                          markAllAsRead();
                          setNotifOpen(false);
                          onShowToast?.('Checked all notifications');
                        }}
                        className="text-emerald-400 hover:text-emerald-300 font-semibold transition-colors cursor-pointer text-[11px] flex items-center gap-1"
                      >
                        Done
                        <span>→</span>
                      </button>
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          {/* User Profile Avatar / Dropdown */}
          <div className="relative">
            {user?.id?.startsWith('user_') ? (
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: 'w-8 h-8 rounded-xl border border-slate-700/80',
                  },
                }}
              />
            ) : (
              <button
                onClick={() => {
                  setProfileOpen(!profileOpen);
                  setNotifOpen(false);
                }}
                className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center text-slate-950 font-bold text-xs shadow-sm hover:ring-2 hover:ring-emerald-400/50 transition-all cursor-pointer"
                aria-label="User Profile"
              >
                {user?.name?.[0]?.toUpperCase() || 'A'}
              </button>
            )}

            {/* Profile Dropdown */}
            <AnimatePresence>
              {profileOpen && (
                <>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-40 bg-black/20"
                    onClick={() => setProfileOpen(false)}
                  />
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.96 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full mt-2 w-56 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl shadow-black/70 overflow-hidden z-50 p-2"
                  >
                    <div className="px-3 py-2 border-b border-slate-800">
                      <p className="text-xs font-bold text-white truncate">{user?.name || 'Agnivesh '}</p>
                      <p className="text-[11px] text-slate-400 truncate">{user?.email || 'user@meetingmind.ai'}</p>
                      <span className="inline-flex items-center gap-1 mt-1 text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        Pro Member
                      </span>
                    </div>

                    <div className="py-1">
                      <button
                        onClick={() => {
                          setProfileOpen(false);
                          onShowToast?.('Navigated to Account Settings');
                        }}
                        className="w-full text-left px-3 py-2 text-xs text-slate-300 hover:text-white hover:bg-slate-800/60 rounded-xl transition-colors flex items-center gap-2 cursor-pointer"
                      >
                        <span>⚙️</span>
                        Account Settings
                      </button>
                      <button
                        onClick={() => {
                          setProfileOpen(false);
                          onShowToast?.('Preferences saved');
                        }}
                        className="w-full text-left px-3 py-2 text-xs text-slate-300 hover:text-white hover:bg-slate-800/60 rounded-xl transition-colors flex items-center gap-2 cursor-pointer"
                      >
                        <span>🔔</span>
                        Notification Settings
                      </button>
                      <button
                        onClick={() => {
                          setProfileOpen(false);
                          onShowToast?.('Theme synced with Landing Page');
                        }}
                        className="w-full text-left px-3 py-2 text-xs text-slate-300 hover:text-white hover:bg-slate-800/60 rounded-xl transition-colors flex items-center gap-2 cursor-pointer"
                      >
                        <span>🎨</span>
                        Theme: Dark Emerald
                      </button>
                    </div>

                    <div className="pt-1 border-t border-slate-800">
                      <button
                        onClick={() => {
                          setProfileOpen(false);
                          logout();
                        }}
                        className="w-full text-left px-3 py-2 text-xs text-rose-400 hover:bg-rose-500/10 rounded-xl transition-colors flex items-center gap-2 cursor-pointer font-medium"
                      >
                        <span>🚪</span>
                        Sign Out
                      </button>
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>
      </header>

      {/* Global Search Modal */}
      <AnimatePresence>
        {searchOpen && (
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm"
              onClick={() => setSearchOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.96 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl shadow-black/80 overflow-hidden z-50 flex flex-col"
            >
              <div className="flex items-center gap-3 px-4 py-3.5 border-b border-slate-800 bg-slate-950/60">
                <svg className="w-5 h-5 text-emerald-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  ref={searchInputRef}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search meetings, transcripts, action items..."
                  className="flex-1 bg-transparent text-sm text-white placeholder-slate-500 outline-none"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="text-xs text-slate-500 hover:text-slate-300 px-1.5 py-0.5 rounded cursor-pointer"
                  >
                    Clear
                  </button>
                )}
                <button
                  onClick={() => setSearchOpen(false)}
                  className="text-slate-500 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="p-3 text-[11px] text-slate-500 font-semibold uppercase tracking-wider px-4 bg-slate-950/30 flex items-center justify-between">
                <span>{searchQuery ? `Results (${filteredSearch.length})` : 'Recent & Suggested'}</span>
                <span className="text-[10px] text-slate-600 font-normal">ESC to close</span>
              </div>

              <div className="max-h-72 overflow-y-auto divide-y divide-slate-800/40 p-1">
                {filteredSearch.length === 0 ? (
                  <div className="py-8 text-center text-slate-500 text-xs">
                    No results found for &quot;{searchQuery}&quot;
                  </div>
                ) : (
                  filteredSearch.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setSearchOpen(false);
                        onShowToast?.(`Selected: "${item.title}"`);
                      }}
                      className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl hover:bg-slate-800/60 text-left transition-colors cursor-pointer group"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-sm shrink-0 group-hover:bg-emerald-500/10 group-hover:text-emerald-400 transition-colors">
                          {item.type === 'Meeting' ? '📅' : item.type === 'Transcript' ? '📝' : item.type === 'Action Item' ? '✅' : '🔗'}
                        </span>
                        <div className="min-w-0">
                          <p className="text-xs font-semibold text-slate-200 group-hover:text-emerald-300 transition-colors truncate">
                            {item.title}
                          </p>
                          <p className="text-[10px] text-slate-500 mt-0.5">{item.time}</p>
                        </div>
                      </div>
                      <span className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-slate-800 text-slate-400 group-hover:text-slate-200 border border-slate-700/60 shrink-0">
                        {item.type}
                      </span>
                    </button>
                  ))
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Selected Notification Detail Modal */}
      <AnimatePresence>
        {selectedNotif && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm"
              onClick={() => setSelectedNotif(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 z-50"
            >
              <div className="flex items-start gap-4">
                <span className="text-3xl p-2.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
                  {selectedNotif.icon}
                </span>
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
                    {selectedNotif.type}
                  </span>
                  <h3 className="text-base font-bold text-white mt-1.5 leading-snug">
                    {selectedNotif.title}
                  </h3>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                    {selectedNotif.desc}
                  </p>
                  <p className="text-[11px] text-slate-500 mt-3 font-mono">
                    Received {selectedNotif.time}
                  </p>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  onClick={() => setSelectedNotif(null)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors cursor-pointer"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    setSelectedNotif(null);
                    onShowToast?.(`Opened detail for: ${selectedNotif.title}`);
                  }}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 text-xs font-bold transition-all shadow-md shadow-emerald-500/20 cursor-pointer"
                >
                  View Details
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
