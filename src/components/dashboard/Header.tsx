import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserButton } from '@clerk/react';
import { useAuth } from '../../context/Authcontext';

interface HeaderProps {
  onSidebarToggle: () => void;
  sidebarCollapsed: boolean;
}

const Header: React.FC<HeaderProps> = ({ onSidebarToggle, sidebarCollapsed }) => {
  const { user } = useAuth();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [notifOpen, setNotifOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const timeStr = currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
  const dateStr = currentTime.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });

  const notifications = [
    { id: 1, type: 'transcript', title: 'Q3 Planning transcript ready', time: '2 min ago', icon: '📝', color: 'emerald' },
    { id: 2, type: 'action', title: 'Action item assigned to you', time: '15 min ago', icon: '✅', color: 'teal' },
    { id: 3, type: 'meeting', title: 'Design Sync starts in 10 min', time: '20 min ago', icon: '📅', color: 'blue' },
  ];

  return (
    <header className="h-16 flex items-center justify-between px-5 bg-slate-950/90 border-b border-slate-800/80 backdrop-blur-xl relative z-10">
      {/* Left: Sidebar toggle + Page title */}
      <div className="flex items-center gap-4">
        <button
          onClick={onSidebarToggle}
          className="w-8 h-8 rounded-xl bg-slate-900 border border-slate-800/80 hover:border-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-all md:hidden"
          aria-label="Toggle sidebar"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <div>
          <h1 className="text-sm font-bold text-white leading-none">
            Good {currentTime.getHours() < 12 ? 'morning' : currentTime.getHours() < 17 ? 'afternoon' : 'evening'},{' '}
            <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
              {user?.name?.split(' ')[0] || 'there'} 👋
            </span>
          </h1>
          <p className="text-[11px] text-slate-500 mt-0.5">{dateStr} · {timeStr}</p>
        </div>
      </div>

      {/* Center: Search Bar */}
      <div className="hidden md:flex flex-1 max-w-md mx-6">
        <div className="relative w-full">
          <button
            onClick={() => setSearchOpen(true)}
            className="w-full flex items-center gap-2.5 px-4 py-2 rounded-xl bg-slate-900/70 border border-slate-800/80 hover:border-slate-700/80 text-slate-400 hover:text-slate-300 text-sm transition-all group"
          >
            <svg className="w-4 h-4 shrink-0 group-hover:text-emerald-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span className="flex-1 text-left text-sm">Search meetings, transcripts...</span>
            <kbd className="text-[10px] px-1.5 py-0.5 rounded-md bg-slate-800 border border-slate-700 text-slate-500 font-mono">⌘K</kbd>
          </button>

          {/* Search Modal */}
          <AnimatePresence>
            {searchOpen && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-40"
                  onClick={() => setSearchOpen(false)}
                />
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.97 }}
                  transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute top-full mt-2 left-0 right-0 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl shadow-black/50 overflow-hidden z-50"
                >
                  <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-800">
                    <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input
                      autoFocus
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search meetings, transcripts, actions..."
                      className="flex-1 bg-transparent text-sm text-white placeholder-slate-500 outline-none"
                    />
                    <button onClick={() => setSearchOpen(false)} className="text-slate-500 hover:text-white">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  <div className="p-3 text-xs text-slate-500 font-medium uppercase tracking-wider px-4">Recent</div>
                  {['Q3 Planning Session', 'Design Review', 'Sprint Retrospective'].map((item) => (
                    <button key={item} className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-slate-800/60 text-left transition-colors">
                      <span className="w-6 h-6 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400">📝</span>
                      <span className="text-sm text-slate-300">{item}</span>
                    </button>
                  ))}
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-3">
        {/* New Meeting Button */}
        <button className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 text-xs font-bold transition-all shadow-lg shadow-emerald-500/25 active:scale-[0.98]">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
          </svg>
          New Meeting
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setNotifOpen(!notifOpen)}
            className="relative w-8 h-8 rounded-xl bg-slate-900 border border-slate-800/80 hover:border-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-all"
            aria-label="Notifications"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            {/* Badge */}
            <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 rounded-full flex items-center justify-center text-[8px] font-bold text-white">3</span>
          </button>

          <AnimatePresence>
            {notifOpen && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-40"
                  onClick={() => setNotifOpen(false)}
                />
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.97 }}
                  transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute right-0 top-full mt-2 w-80 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl shadow-black/50 overflow-hidden z-50"
                >
                  <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800">
                    <span className="text-sm font-bold text-white">Notifications</span>
                    <span className="text-[10px] text-emerald-400 font-semibold">3 new</span>
                  </div>
                  {notifications.map((n) => (
                    <div key={n.id} className="flex items-start gap-3 px-4 py-3 hover:bg-slate-800/40 transition-colors border-b border-slate-800/50 last:border-0">
                      <span className="text-base mt-0.5">{n.icon}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-slate-200 truncate">{n.title}</p>
                        <p className="text-[10px] text-slate-500 mt-0.5">{n.time}</p>
                      </div>
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                    </div>
                  ))}
                  <div className="px-4 py-2.5">
                    <button className="w-full text-center text-xs text-emerald-400 hover:text-emerald-300 font-semibold transition-colors">
                      View all notifications
                    </button>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

        {/* User avatar (Desktop sidebar already has it, Header shows on mobile) */}
        <div className="md:hidden">
          {user?.id?.startsWith('user_') ? (
            <UserButton
              appearance={{
                elements: {
                  avatarBox: 'w-8 h-8 rounded-xl',
                },
              }}
            />
          ) : (
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center text-slate-950 font-bold text-xs">
              {user?.name?.[0]?.toUpperCase() || 'U'}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
