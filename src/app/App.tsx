import { RouterProvider } from 'react-router';
import { router, mobileRouter } from './routes';
import { Toaster } from 'sonner';
import { useEffect, useState } from 'react';
import { SecurityGate } from './components/security/security-gate';
import { getAppSettings } from './utils/storage';
import { LanguageProvider } from '../i18n/LanguageContext';

export default function App() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const settings = getAppSettings();

  useEffect(() => {
    // Detect if device is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    // Skip security gate if disabled in settings
    if (!settings.securityEnabled) {
      setIsUnlocked(true);
    }
  }, [settings.securityEnabled]);

  if (settings.securityEnabled && !isUnlocked) {
    return (
      <LanguageProvider>
        <SecurityGate onUnlock={() => setIsUnlocked(true)} />
        <Toaster position="top-center" theme="dark" richColors />
      </LanguageProvider>
    );
  }

  return (
    <LanguageProvider>
      <RouterProvider router={isMobile ? mobileRouter : router} />
      <Toaster position={isMobile ? "top-center" : "bottom-right"} theme="dark" richColors />
    </LanguageProvider>
  );
}