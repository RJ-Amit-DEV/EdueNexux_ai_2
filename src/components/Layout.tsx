import React from 'react';
import { 
  LayoutDashboard, 
  BookOpen, 
  Video, 
  BrainCircuit, 
  Bell, 
  MessageSquare, 
  GraduationCap, 
  Settings, 
  LogOut,
  BarChart3,
  Calendar,
  FileText,
  Users,
  Search,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  Moon,
  Sun,
  Code2,
  Lightbulb,
  ShieldCheck,
  RefreshCw,
  ChevronDown
} from 'lucide-react';
import { UserRole, NavItem, ProfileData } from '../types';
import { isPrivilegedTeamMember } from '../constants';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

interface SidebarProps {
  role: UserRole;
  activeTab: string;
  setActiveTab: (id: string) => void;
  onLogout: () => void;
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
  isMobileOpen: boolean;
  setIsMobileOpen: (open: boolean) => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
  unreadCounts?: { [key: string]: number };
  onRoleSwitch?: (newRole: UserRole) => void;
  userEmail?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  role, 
  activeTab, 
  setActiveTab, 
  onLogout,
  isCollapsed,
  setIsCollapsed,
  isMobileOpen,
  setIsMobileOpen,
  darkMode,
  toggleDarkMode,
  unreadCounts = {},
  onRoleSwitch,
  userEmail
}) => {
  const isPrivileged = isPrivilegedTeamMember(userEmail) || userEmail?.includes('eduplan.local');

  const studentNav: NavItem[] = [
    { label: 'Academic Dashboard', icon: LayoutDashboard, id: 'dashboard' },
    { label: 'Curriculum & Syllabus', icon: BookOpen, id: 'curriculum' },
    { label: 'Study Scheduler', icon: Calendar, id: 'scheduler' },
    { label: 'Quiz Assessment', icon: Lightbulb, id: 'quiz' },
    { label: 'Video Lectures', icon: Video, id: 'video' },
    { label: 'Notice Board', icon: Bell, id: 'notices' },
    { label: 'Doubt Solver Desk', icon: MessageSquare, id: 'doubts' },
    { label: 'Smart Study Notes', icon: FileText, id: 'notes' },
    { label: 'System Information', icon: Code2, id: 'about-devs' },
    { label: 'Account Settings', icon: Settings, id: 'settings' },
  ];

  const teacherNav: NavItem[] = [
    { label: 'Class Register & Records', icon: Users, id: 'my-class' },
    { label: 'Notice Board', icon: Bell, id: 'notices' },
    { label: 'Doubt Solver Desk', icon: MessageSquare, id: 'doubts' },
    { label: 'Faculty Settings', icon: Settings, id: 'settings' },
  ];

  const parentNav: NavItem[] = [
    { label: 'Student Performance', icon: BarChart3, id: 'performance' },
    { label: 'Notice Board', icon: Bell, id: 'notices' },
    { label: 'Institutional Info', icon: BookOpen, id: 'college-info' },
    { label: 'Parent Advisory', icon: FileText, id: 'blogs' },
    { label: 'Faculty Directory', icon: MessageSquare, id: 'contact' },
    { label: 'Account Settings', icon: Settings, id: 'settings' },
  ];

  let rawNavItems = role === 'student' ? studentNav : role === 'teacher' ? teacherNav : parentNav;
  
  const navItems = rawNavItems.map(item => ({
    ...item,
    badge: unreadCounts[item.id] > 0 ? unreadCounts[item.id].toString() : undefined
  }));

  const roleLabel = role === 'teacher' ? 'Faculty Portal' : role === 'parent' ? 'Parent Portal' : 'Student Portal';

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileOpen(false)}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-[55] lg:hidden"
          />
        )}
      </AnimatePresence>

      <aside className={cn(
        "h-screen bg-white dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800 flex flex-col fixed left-0 top-0 z-[60] shadow-xs transition-all duration-200 overflow-hidden lg:translate-x-0",
        isCollapsed ? "w-20" : "w-64",
        isMobileOpen ? "translate-x-0 w-64" : "-translate-x-full"
      )}>
        {/* Formal Institutional Brand Header */}
        <div className={cn(
          "p-4 border-b border-slate-200 dark:border-slate-800 flex items-center transition-all",
          isCollapsed && !isMobileOpen ? "justify-center" : "gap-3"
        )}>
          <div className="w-9 h-9 bg-slate-900 dark:bg-slate-800 border border-slate-800 dark:border-slate-700 rounded flex items-center justify-center text-white shrink-0">
            <GraduationCap size={20} />
          </div>
          {(!isCollapsed || isMobileOpen) && (
            <div className="overflow-hidden whitespace-nowrap">
              <h1 className="font-bold text-sm text-slate-900 dark:text-white tracking-tight leading-tight">
                EduPlan Portal
              </h1>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                  {roleLabel}
                </span>
              </div>
            </div>
          )}
          
          {/* Mobile Close Button */}
          {isMobileOpen && (
            <button 
              onClick={() => setIsMobileOpen(false)}
              className="ml-auto p-1.5 text-slate-400 hover:text-slate-900 dark:hover:text-white rounded lg:hidden"
            >
              <X size={18} />
            </button>
          )}
        </div>

        {/* Collapse Toggle */}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute top-4 -right-3 w-6 h-6 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded flex items-center justify-center text-slate-500 hover:text-slate-900 dark:hover:text-white shadow-xs z-50 transition-colors hidden lg:flex"
          title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          {isCollapsed ? <ChevronRight size={13} /> : <ChevronLeft size={13} />}
        </button>

        {/* Navigation List */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto overflow-x-hidden">
          <div className="pb-1">
            {(!isCollapsed || isMobileOpen) && (
              <p className="px-2.5 pb-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Navigation Desk
              </p>
            )}
          </div>
          {navItems.map((item) => (
            <button
              key={item.id}
              id={`nav-item-${item.id}`}
              onClick={() => {
                setActiveTab(item.id);
                if (isMobileOpen) setIsMobileOpen(false);
              }}
              className={cn(
                "w-full flex items-center rounded transition-colors text-left font-medium text-xs relative",
                isCollapsed && !isMobileOpen ? "justify-center p-2.5" : "justify-between px-3 py-2.5",
                activeTab === item.id 
                  ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold" 
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/70 hover:text-slate-900 dark:hover:text-white"
              )}
            >
              <div className="flex items-center gap-2.5">
                <item.icon size={17} className="shrink-0" />
                {(!isCollapsed || isMobileOpen) && (
                  <span className="whitespace-nowrap">
                    {item.label}
                  </span>
                )}
              </div>
              
              {/* Tooltip for collapsed state */}
              {isCollapsed && !isMobileOpen && (
                <div className="absolute left-full ml-3 px-2.5 py-1 bg-slate-900 text-white text-[11px] font-medium rounded border border-slate-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-[60] shadow-sm">
                  {item.label}
                </div>
              )}

              {item.badge && (!isCollapsed || isMobileOpen) && (
                <span className={cn(
                  "px-1.5 py-0.2 font-mono text-[10px] font-bold rounded",
                  activeTab === item.id 
                    ? "bg-white/20 text-white dark:bg-slate-900/20 dark:text-slate-900" 
                    : "bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-400"
                )}>
                  {item.badge}
                </span>
              )}
              {item.badge && isCollapsed && !isMobileOpen && (
                <span className="absolute top-2 right-2 w-2 h-2 bg-indigo-600 rounded-xs"></span>
              )}
            </button>
          ))}
        </nav>

        {/* Footer Controls */}
        <div className="p-3 border-t border-slate-200 dark:border-slate-800 space-y-1">
          {/* Dark Mode Toggle */}
          <button 
            onClick={toggleDarkMode}
            className={cn(
              "w-full flex items-center gap-2.5 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded text-xs font-medium transition-colors",
              isCollapsed && !isMobileOpen ? "justify-center p-2.5" : "px-3 py-2"
            )}
            title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {darkMode ? <Sun size={16} /> : <Moon size={16} />}
            {(!isCollapsed || isMobileOpen) && <span>{darkMode ? 'Light Theme' : 'Dark Theme'}</span>}
          </button>

          <button 
            onClick={onLogout}
            className={cn(
              "w-full flex items-center gap-2.5 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded text-xs font-medium transition-colors",
              isCollapsed && !isMobileOpen ? "justify-center p-2.5" : "px-3 py-2"
            )}
            title="Sign Out of Session"
          >
            <LogOut size={16} className="shrink-0" />
            {(!isCollapsed || isMobileOpen) && <span>Sign Out</span>}
          </button>
        </div>
      </aside>
    </>
  );
};

interface HeaderProps {
  title: string;
  onMenuClick: () => void;
  profile: ProfileData;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  notices: any[];
  unreadNotices?: number;
  onClearNotices?: () => void;
  onNavigate?: (tab: string) => void;
  role?: UserRole;
  onRoleSwitch?: (newRole: UserRole) => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  title, 
  onMenuClick, 
  profile, 
  searchQuery, 
  setSearchQuery, 
  notices, 
  unreadNotices = 0, 
  onClearNotices,
  onNavigate,
  role = 'student',
  onRoleSwitch
}) => {
  const [showNotifications, setShowNotifications] = React.useState(false);
  const searchInputRef = React.useRef<HTMLInputElement>(null);
  const isPrivileged = isPrivilegedTeamMember(profile.email) || profile.isPrivileged || profile.email?.includes('eduplan.local');

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleToggleNotifications = () => {
    const newState = !showNotifications;
    setShowNotifications(newState);
    if (newState && onClearNotices) {
      onClearNotices();
    }
  };

  const getSearchPlaceholder = () => {
    if (role === 'teacher') return 'Search student name, roll number, or circulars (⌘K)...';
    if (role === 'parent') return 'Search academic records, notices, or faculty (⌘K)...';
    return 'Search curriculum, modules, notes, or circulars (⌘K)...';
  };

  const getRoleTag = () => {
    if (role === 'teacher') return { label: 'Faculty Advisor', color: 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800' };
    if (role === 'parent') return { label: 'Parent / Guardian', color: 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800' };
    return { label: 'Student Cohort', color: 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800' };
  };

  const roleTag = getRoleTag();
  
  return (
    <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-4 sm:px-6 sticky top-0 z-50 transition-colors">
      <div className="flex items-center gap-3">
        <button 
          onClick={onMenuClick}
          className="p-1.5 text-slate-500 hover:text-slate-900 dark:hover:text-white rounded border border-slate-200 dark:border-slate-700 lg:hidden"
          title="Open Menu"
        >
          <Menu size={18} />
        </button>
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <h1 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white tracking-tight leading-none truncate">
              {title}
            </h1>
            <span className={cn(
              "hidden sm:inline-flex px-2 py-0.5 text-[10px] font-mono font-bold uppercase rounded border",
              roleTag.color
            )}>
              {roleTag.label}
            </span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium mt-1">
            Academic Session 2025–26 • INFT Division 1
          </p>
        </div>
      </div>
      
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Privileged Team Member Role Quick-Switcher */}
        {isPrivileged && onRoleSwitch && (
          <div className="hidden md:flex items-center bg-slate-100 dark:bg-slate-800/80 p-1 rounded-lg border border-slate-200 dark:border-slate-700">
            <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider px-2 flex items-center gap-1">
              <ShieldCheck size={12} /> Role:
            </span>
            {(['student', 'teacher', 'parent'] as UserRole[]).map((r) => (
              <button
                key={r}
                onClick={() => onRoleSwitch(r)}
                className={cn(
                  "px-2.5 py-1 text-[11px] font-bold rounded-md capitalize transition-all cursor-pointer",
                  role === r
                    ? "bg-indigo-600 text-white shadow-2xs"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-700/60"
                )}
              >
                {r === 'teacher' ? 'Faculty' : r}
              </button>
            ))}
          </div>
        )}

        {/* Formal Institutional Search */}
        <div className="relative hidden lg:block">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            <Search size={15} />
          </div>
          <input 
            ref={searchInputRef}
            type="text" 
            placeholder={getSearchPlaceholder()} 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 pr-14 py-1.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 focus:border-indigo-600 focus:bg-white dark:focus:bg-slate-900 rounded text-xs w-56 xl:w-72 outline-none text-slate-800 dark:text-slate-200 placeholder:text-slate-400 transition-colors"
          />
          <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-0.5 opacity-60">
            <kbd className="px-1.5 py-0.5 bg-slate-200 dark:bg-slate-700 rounded text-[9px] font-mono font-semibold text-slate-600 dark:text-slate-300">⌘K</kbd>
          </div>
        </div>

        
        <div className="flex items-center gap-3">
          {/* Notifications Desk */}
          <div className="relative">
            <button 
              onClick={handleToggleNotifications}
              className={cn(
                "p-2 rounded border transition-colors relative",
                showNotifications 
                  ? "bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white" 
                  : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700"
              )}
              title="Official Circulars & Notifications"
            >
              <Bell size={17} />
              {unreadNotices > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full"></span>
              )}
            </button>

            <AnimatePresence>
              {showNotifications && (
                <>
                  <div 
                    onClick={() => setShowNotifications(false)}
                    className="fixed inset-0 z-40 bg-transparent"
                  />
                  <motion.div
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    className="absolute right-0 mt-2 w-80 sm:w-96 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-lg z-50 overflow-hidden"
                  >
                    <div className="p-3.5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-800/50">
                      <h3 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-xs">
                        Official Notices & Circulars
                      </h3>
                      <span className="px-2 py-0.5 bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-400 text-[10px] font-mono font-bold rounded border border-indigo-200 dark:border-indigo-800">
                        {notices.length} Total
                      </span>
                    </div>
                    <div className="max-h-[350px] overflow-y-auto p-2 space-y-1">
                      {notices.length === 0 ? (
                        <div className="p-6 text-center">
                          <p className="text-xs text-slate-500 dark:text-slate-400">No recent notifications logged</p>
                        </div>
                      ) : (
                        notices.slice(0, 5).map((notice, i) => (
                          <div 
                            key={notice.id ? `${notice.id}-${i}` : `notice-${i}`} 
                            onClick={() => {
                              setShowNotifications(false);
                              if (onNavigate) onNavigate('notices');
                            }}
                            className="p-3 hover:bg-slate-50 dark:hover:bg-slate-800/60 rounded border border-transparent hover:border-slate-200 dark:hover:border-slate-700 transition-colors cursor-pointer text-xs"
                          >
                            <div className="flex items-start gap-2.5">
                              <Bell size={15} className="text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
                              <div className="space-y-0.5 min-w-0">
                                <p className="font-semibold text-slate-900 dark:text-white truncate">{notice.title}</p>
                                <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">{notice.content}</p>
                                <p className="text-[10px] font-mono text-slate-400 pt-1">
                                  {notice.author} • {notice.date?.toDate ? notice.date.toDate().toLocaleDateString('en-GB') : 'Today'}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                    <div className="p-2.5 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-800 text-center">
                      <button 
                        className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
                        onClick={() => {
                          setShowNotifications(false);
                          if (onNavigate) onNavigate('notices');
                        }}
                      >
                        Open Complete Notice Board →
                      </button>
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
          
          <div className="h-6 w-px bg-slate-200 dark:border-slate-800"></div>
          
          {/* Profile Badge */}
          <div 
            onClick={() => {
              if (onNavigate) onNavigate('settings');
            }}
            className="flex items-center gap-2.5 cursor-pointer p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="View Profile & Settings"
          >
            <div className="text-right hidden sm:block">
              <p className="text-xs font-bold text-slate-900 dark:text-white leading-tight">{profile.name}</p>
              <p className="text-[10px] font-mono text-slate-500 uppercase">{profile.role}</p>
            </div>
            <div className="w-8 h-8 rounded bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center font-bold text-xs text-slate-700 dark:text-slate-300 overflow-hidden">
              {profile.avatar ? (
                <img src={profile.avatar} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                profile.name.split(' ').map(n => n[0]).join('').substring(0, 2)
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
