import { createBrowserRouter } from "react-router";
import { RootLayout } from "./components/layout/root-layout";
import { IntroductionPage } from "./pages/introduction-page";
import { DetectionPage } from "./pages/detection-page";
import { AnalyticsPage } from "./pages/analytics-page";
import { CropIntelligencePage } from "./pages/crop-intelligence-page";
import { SettingsPage } from "./pages/settings-page";
import { NotFoundPage } from "./pages/not-found-page";

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