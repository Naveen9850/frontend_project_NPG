import { createBrowserRouter } from "react-router";
import { RootLayout } from "./components/layout/root-layout";
import { MobileLayout } from "./components/layout/mobile-layout";
import { IntroductionPage } from "./pages/introduction-page";
import { MobileIntroductionPage } from "./pages/mobile-introduction-page";
import { DetectionPage } from "./pages/detection-page";
import { MobileDetectionPage } from "./pages/mobile-detection-page";
import { AnalyticsPage } from "./pages/analytics-page";
import { MobileAnalyticsPage } from "./pages/mobile-analytics-page";
import { CropIntelligencePage } from "./pages/crop-intelligence-page";
import { SettingsPage } from "./pages/settings-page";
import { MobileSettingsPage } from "./pages/mobile-settings-page";
import { NotFoundPage } from "./pages/not-found-page";

// Desktop Router
export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: IntroductionPage },
      { path: "detection", Component: DetectionPage },
      { path: "analytics", Component: AnalyticsPage },
      { path: "crops", Component: CropIntelligencePage },
      { path: "settings", Component: SettingsPage },
      { path: "*", Component: NotFoundPage },
    ],
  },
]);

// Mobile Router
export const mobileRouter = createBrowserRouter([
  {
    path: "/",
    Component: MobileLayout,
    children: [
      { index: true, Component: MobileIntroductionPage },
      { path: "detection", Component: MobileDetectionPage },
      { path: "analytics", Component: MobileAnalyticsPage },
      { path: "crops", Component: CropIntelligencePage },
      { path: "settings", Component: MobileSettingsPage },
      { path: "*", Component: NotFoundPage },
    ],
  },
]);