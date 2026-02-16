/**
 * Black Soil Crop Stress Intelligence System
 * Design System Documentation
 * 
 * @colors
 * Primary: #10B981 (Emerald) - Healthy crops, primary actions
 * Secondary: #84CC16 (Lime) - Growth, vitality
 * Accent: #FACC15 (Yellow) - Warnings, highlights
 * Background: #0F172A (Deep Slate) - Main background
 * Card: #1E293B (Slate 800) - Elevated surfaces
 * 
 * @typography
 * Font Family: Inter
 * Headings: 500-600 weight
 * Body: 400 weight
 * 
 * @effects
 * Glassmorphism: backdrop-blur-sm with opacity
 * Glow: shadow with color/20-50 opacity
 * Gradients: Linear from emerald → lime for primary actions
 * 
 * @animations
 * Hover: scale(1.02-1.05), y: -5 to -8
 * Tap: scale(0.95)
 * Loading: rotation, pulse, wave patterns
 * 
 * @components
 * - GlassCard: Elevated card with glassmorphism
 * - GradientButton: Primary/secondary action buttons
 * - ProgressRing: Circular progress with animations
 * - StatCard: Metric display with hover effects
 * - MetricBadge: Inline status indicators
 * - LoadingWave: AI processing indicator
 * 
 * @usage
 * Import components from design-system folder
 * Use Tailwind classes with theme tokens
 * Follow color semantics (emerald=healthy, yellow=warning, red=critical)
 */

export const designTokens = {
  colors: {
    emerald: {
      500: '#10B981',
      400: '#34D399',
      600: '#059669',
    },
    lime: {
      500: '#84CC16',
      400: '#A3E635',
      600: '#65A30D',
    },
    yellow: {
      500: '#FACC15',
      400: '#FDE047',
      600: '#CA8A04',
    },
    slate: {
      900: '#0F172A',
      800: '#1E293B',
      700: '#334155',
      600: '#475569',
      400: '#94A3B8',
      50: '#F8FAFC',
    },
  },
  
  gradients: {
    primary: 'linear-gradient(135deg, #10B981 0%, #84CC16 100%)',
    secondary: 'linear-gradient(135deg, #84CC16 0%, #FACC15 100%)',
    danger: 'linear-gradient(135deg, #EF4444 0%, #F97316 100%)',
  },
  
  borderRadius: {
    card: '1rem',
    button: '0.5rem',
    badge: '9999px',
  },
  
  spacing: {
    card: '1.5rem',
    section: '2rem',
  },
  
  shadows: {
    glow: {
      emerald: '0 0 20px rgba(16, 185, 129, 0.3)',
      lime: '0 0 20px rgba(132, 204, 22, 0.3)',
      yellow: '0 0 20px rgba(250, 204, 21, 0.3)',
    },
    card: '0 10px 30px rgba(0, 0, 0, 0.3)',
  },
};

export default designTokens;
