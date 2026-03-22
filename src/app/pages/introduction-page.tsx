import { motion } from "motion/react";
import { Link } from "react-router";
import { Sparkles, ArrowRight, Cpu, Wind, Activity, Grid3x3 } from "lucide-react";
import { Button } from "../components/ui/button";
import { useLanguage } from "../../i18n/LanguageContext";

export function IntroductionPage() {
  const { t } = useLanguage();

  const features = [
    {
      icon: Cpu,
      title: t("intro.feature1Title"),
      description: t("intro.feature1Desc"),
      gradient: "from-emerald-500/20 to-lime-500/20",
    },
    {
      icon: Wind,
      title: t("intro.feature2Title"),
      description: t("intro.feature2Desc"),
      gradient: "from-blue-500/20 to-cyan-500/20",
    },
    {
      icon: Activity,
      title: t("intro.feature3Title"),
      description: t("intro.feature3Desc"),
      gradient: "from-yellow-500/20 to-orange-500/20",
    },
    {
      icon: Grid3x3,
      title: t("intro.feature4Title"),
      description: t("intro.feature4Desc"),
      gradient: "from-purple-500/20 to-pink-500/20",
    },
  ];

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Hero Section */}
      <div className="relative flex-1 flex items-center justify-center py-20 px-6">
        {/* Radial glow behind hero */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-emerald-500/20 rounded-full blur-[150px] pointer-events-none" />

        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 backdrop-blur-sm mb-8"
          >
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span className="text-sm text-emerald-300">{t("intro.badge")}</span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-5xl md:text-7xl mb-6 tracking-tight leading-tight"
          >
            <span className="block">{t("intro.heroTitle1")}</span>
            <span className="block mt-2 bg-gradient-to-r from-emerald-400 via-lime-400 to-emerald-400 bg-clip-text text-transparent">
              {t("intro.heroTitle2")}
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="text-xl text-slate-400 max-w-3xl mx-auto mb-12 leading-relaxed"
          >
            {t("intro.heroSubtitle")}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link to="/detection">
              <Button
                size="lg"
                className="group relative overflow-hidden bg-gradient-to-r from-emerald-500 to-lime-500 text-slate-900 hover:shadow-2xl hover:shadow-emerald-500/50 transition-all duration-300 px-8 py-6 text-lg"
              >
                <span className="relative z-10 flex items-center gap-2">
                  {t("intro.startDetection")}
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight className="w-5 h-5" />
                  </motion.div>
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-lime-500 to-emerald-500"
                  initial={{ x: '100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </Button>
            </Link>

            <Link to="/analytics">
              <Button
                size="lg"
                variant="outline"
                className="border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10 hover:border-emerald-500/50 backdrop-blur-sm px-8 py-6 text-lg"
              >
                {t("intro.viewAnalytics")}
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div className="relative pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8 }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {features.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.9 + i * 0.1 }}
                  whileHover={{
                    scale: 1.03,
                    y: -8,
                    transition: { duration: 0.2 }
                  }}
                  className="group relative"
                >
                  {/* Glow effect on hover */}
                  <div className={`absolute inset-0 rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300 bg-gradient-to-br ${feature.gradient}`} />

                  {/* Card */}
                  <div className="relative p-6 rounded-2xl bg-slate-800/50 border border-emerald-500/20 backdrop-blur-sm h-full transition-all duration-300 group-hover:border-emerald-500/40">
                    <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${feature.gradient} mb-4`}>
                      <Icon className="w-6 h-6 text-emerald-400" />
                    </div>

                    <h3 className="text-lg mb-2">{feature.title}</h3>
                    <p className="text-sm text-slate-400 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
