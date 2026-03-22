import { Link, useLocation } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import {
  Home, Activity, BarChart3, Grid3x3, Settings,
  ChevronLeft, ChevronRight, Sprout
} from "lucide-react";
import { useLanguage } from "../../../i18n/LanguageContext";
import { LanguageSelector } from "./language-selector";

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
}

export function Sidebar({ isCollapsed, setIsCollapsed }: SidebarProps) {
  const location = useLocation();
  const { t } = useLanguage();

  const navItems = [
    { path: "/", icon: Home, label: t("nav.introduction") },
    { path: "/detection", icon: Activity, label: t("nav.detection") },
    { path: "/analytics", icon: BarChart3, label: t("nav.analytics") },
    { path: "/crops", icon: Grid3x3, label: t("nav.crops") },
    { path: "/settings", icon: Settings, label: t("nav.settings") },
  ];

  return (
    <motion.div
      animate={{ width: isCollapsed ? 72 : 240 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed left-0 top-0 h-screen bg-[#0F172A] border-r border-emerald-500/10 z-50 flex flex-col"
    >
      {/* Logo Section */}
      <div className="p-6 border-b border-emerald-500/10">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-gradient-to-br from-emerald-500 to-lime-500 shrink-0">
            <Sprout className="w-6 h-6 text-slate-900" />
          </div>

          <AnimatePresence mode="wait">
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <h1 className="text-sm tracking-tight leading-tight whitespace-nowrap">
                  {t("app.title")}
                </h1>
                <p className="text-xs text-emerald-400 whitespace-nowrap">{t("app.subtitle")}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 py-6 overflow-y-auto">
        <div className="space-y-1 px-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                className="block relative"
              >
                <motion.div
                  whileHover={{ x: 4 }}
                  className={`
                    relative flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200
                    ${isActive
                      ? 'bg-emerald-500/10 text-emerald-400'
                      : 'text-slate-400 hover:text-emerald-400 hover:bg-slate-800/50'
                    }
                  `}
                >
                  {/* Active indicator line */}
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-emerald-500 to-lime-500 rounded-r-full"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}

                  <Icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-emerald-400' : ''}`} />

                  <AnimatePresence mode="wait">
                    {!isCollapsed && (
                      <motion.span
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: "auto" }}
                        exit={{ opacity: 0, width: 0 }}
                        transition={{ duration: 0.2 }}
                        className="text-sm whitespace-nowrap overflow-hidden"
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>

                  {/* Hover glow effect */}
                  {!isActive && (
                    <div className="absolute inset-0 rounded-lg bg-emerald-500/0 group-hover:bg-emerald-500/5 transition-colors duration-200" />
                  )}
                </motion.div>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Language Selector */}
      <AnimatePresence mode="wait">
        {!isCollapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="px-3 pb-2"
          >
            <LanguageSelector />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Collapse Toggle */}
      <div className="p-3 border-t border-emerald-500/10">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-slate-800/50 hover:bg-emerald-500/10 text-slate-400 hover:text-emerald-400 transition-colors"
        >
          {isCollapsed ? (
            <ChevronRight className="w-5 h-5" />
          ) : (
            <>
              <ChevronLeft className="w-5 h-5" />
              <span className="text-sm">{t("nav.collapse")}</span>
            </>
          )}
        </motion.button>
      </div>
    </motion.div>
  );
}