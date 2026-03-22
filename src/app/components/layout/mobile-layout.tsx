import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { Home, Activity, BarChart3, Grid3x3, Settings, Menu, X } from "lucide-react";
import { Link } from "react-router";
import { useLanguage } from "../../../i18n/LanguageContext";
import { LanguageSelector } from "./language-selector";

export function MobileLayout() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const location = useLocation();
  const { t } = useLanguage();

  const navItems = [
    { path: "/", icon: Home, label: t("nav.home") },
    { path: "/detection", icon: Activity, label: t("nav.scan") },
    { path: "/analytics", icon: BarChart3, label: t("nav.analytics") },
    { path: "/crops", icon: Grid3x3, label: t("nav.crops") },
    { path: "/settings", icon: Settings, label: t("nav.settings") },
  ];

  // Close mobile menu when route changes
  useEffect(() => {
    setShowMobileMenu(false);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-50 pb-20">
      {/* Mobile Top Bar */}
      <div className="fixed top-0 left-0 right-0 z-40 bg-[#0F172A]/95 backdrop-blur-lg border-b border-emerald-500/10">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-gradient-to-br from-emerald-500 to-lime-500">
              <Activity className="w-5 h-5 text-slate-900" />
            </div>
            <div>
              <h1 className="text-sm font-semibold">{t("app.mobileTitle")}</h1>
              <p className="text-xs text-emerald-400">{t("app.mobileSubtitle")}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <LanguageSelector compact />
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="p-2 rounded-lg hover:bg-slate-800/50 transition-colors"
            >
              {showMobileMenu ? (
                <X className="w-6 h-6 text-emerald-400" />
              ) : (
                <Menu className="w-6 h-6 text-slate-400" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {showMobileMenu && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-[57px] left-0 right-0 z-30 bg-[#0F172A]/98 backdrop-blur-lg border-b border-emerald-500/10 shadow-xl"
          >
            <div className="p-4 space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;

                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive
                        ? "bg-emerald-500/10 text-emerald-400"
                        : "text-slate-400 hover:bg-slate-800/50"
                      }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="pt-[57px]">
        <Outlet />
      </main>

      {/* Bottom Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#0F172A]/95 backdrop-blur-lg border-t border-emerald-500/10 pb-safe">
        <div className="grid grid-cols-5 gap-1 px-2 py-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                className="flex flex-col items-center justify-center py-2 px-1"
              >
                <motion.div
                  whileTap={{ scale: 0.9 }}
                  className={`flex flex-col items-center gap-1 ${isActive ? "text-emerald-400" : "text-slate-400"
                    }`}
                >
                  <div className="relative">
                    <Icon className="w-6 h-6" />
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-emerald-400"
                      />
                    )}
                  </div>
                  <span className="text-xs font-medium">{item.label}</span>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Background effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-1/4 w-64 h-64 bg-emerald-500/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-20 right-1/4 w-64 h-64 bg-lime-500/5 rounded-full blur-[100px]" />
      </div>
    </div>
  );
}
