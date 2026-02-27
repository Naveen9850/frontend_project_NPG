# Black Soil Crop Stress Intelligence - Mobile App Documentation

## 📱 Overview

This application has been converted into a complete mobile-first Progressive Web App (PWA) with desktop support. The app automatically detects the device type and serves the appropriate experience.

---

## ✨ Mobile Features Implemented

### 🔐 Security Features

1. **PIN Authentication**
   - 4-digit PIN lock on app launch
   - Demo PIN: `1234`
   - Can be toggled in Settings
   - Persistent across sessions

2. **Biometric Authentication**
   - Fingerprint/Face ID simulation
   - Quick unlock alternative to PIN
   - Enable/disable in Settings

3. **Data Privacy**
   - All data stored locally (localStorage)
   - No external API calls
   - Complete privacy - nothing leaves the device

---

### 💾 Data Persistence

#### Save Configurations
- Save crop type, growth stage, and pollution parameters
- Load saved configurations for quick re-testing
- Name and manage multiple configurations
- Delete individual configs

#### Scan History
- Automatically saves every analysis result
- Stores up to 50 most recent scans
- Includes:
  - Crop image thumbnail
  - Detection result (Healthy/Biotic/Abiotic)
  - Disease name or stress cause
  - Confidence score
  - Timestamp
  - Pollution parameters used

#### Export & Clear
- View detailed scan history
- Delete individual scans
- Clear all data option in Settings
- View storage statistics

---

### 📊 Analytics & Statistics

Real-time statistics tracking:
- Total scans performed
- Healthy crop count
- Biotic stress detections
- Abiotic stress detections
- Detection distribution charts
- Last scan date

---

### 🎨 Mobile-Optimized UI

#### Bottom Navigation Bar
- Home (Introduction)
- Scan (Detection)
- Analytics (History & Stats)
- Crops (Intelligence Grid)
- Settings

#### Touch-Optimized Design
- Large tap targets (44px minimum)
- Swipe gestures support
- Pull-to-refresh ready
- Touch feedback animations
- Smooth scrolling

#### Responsive Layouts
- Mobile-first design (< 1024px)
- Desktop layout for larger screens
- Automatic layout switching
- Safe area support for iOS notches

---

## 🚀 How to Use

### First Time Setup

1. **Security Gate**
   - App opens with PIN entry screen
   - Enter demo PIN: `1234`
   - Or tap "Simulate Biometric Auth"
   - Option to disable security in Settings

2. **Navigate the App**
   - Use bottom navigation bar
   - Home: View stats and features
   - Scan: Perform detection
   - Analytics: View history
   - Settings: Configure app

### Running a Scan

1. **Go to Scan Tab**
   - Tap the Activity icon (second tab)

2. **Upload Crop Image**
   - Tap the upload area
   - Select image from device
   - Image preview appears

3. **Configure Parameters**
   - Select crop category (Black Soil / Other)
   - Choose specific crop
   - Select growth stage
   - Adjust pollution parameters with sliders

4. **Save Configuration (Optional)**
   - Tap "Save Config" button
   - Enter configuration name
   - Access later via "Load Config"

5. **Run Analysis**
   - Tap "Run AI Analysis" button
   - Wait for 3-second simulation
   - View detailed results:
     - Stress type
     - Disease name (if Biotic)
     - Stress cause (if Abiotic)
     - Confidence score
     - Severity level
     - AI recommendation

6. **Auto-Save**
   - Result automatically saved to history
   - Toast notification confirms save

7. **New Scan**
   - Tap "New Scan" to reset
   - Or continue with new image

### Viewing Analytics

1. **Statistics Tab**
   - Overview cards showing totals
   - Distribution charts
   - Percentage breakdowns

2. **History Tab**
   - Scrollable list of all scans
   - Thumbnail previews
   - Quick info (crop, result, time)
   - Tap trash icon to delete individual scan
   - "Clear All" to remove all scans

### Managing Settings

1. **Security**
   - Toggle App Lock on/off
   - Enable/disable Biometric Auth

2. **Preferences**
   - Notifications toggle
   - Auto-save scans toggle

3. **Storage**
   - View total scans count
   - View configurations count
   - Clear all data button

4. **About**
   - App version info
   - Model version
   - Privacy policy

---

## 🔧 Technical Implementation

### Architecture

```
/src/app/
├── components/
│   ├── layout/
│   │   ├── mobile-layout.tsx      # Mobile navigation wrapper
│   │   ├── sidebar.tsx             # Desktop sidebar
│   │   └── root-layout.tsx         # Desktop wrapper
│   ├── security/
│   │   └── security-gate.tsx       # PIN/Biometric auth
│   └── detection/
│       └── disease-stress-display.tsx
├── pages/
│   ├── mobile-introduction-page.tsx
│   ├── mobile-detection-page.tsx
│   ├── mobile-analytics-page.tsx
│   └── mobile-settings-page.tsx
├── types/
│   └── detection.ts                # TypeScript interfaces
├── utils/
│   └── storage.ts                  # LocalStorage management
└── routes.ts                       # Dual router setup
```

### Device Detection

```typescript
// In App.tsx
const [isMobile, setIsMobile] = useState(false);

useEffect(() => {
  const checkMobile = () => {
    setIsMobile(window.innerWidth < 1024);
  };
  checkMobile();
  window.addEventListener('resize', checkMobile);
}, []);

// Serve appropriate router
<RouterProvider router={isMobile ? mobileRouter : router} />
```

### LocalStorage Schema

#### Scans
```javascript
{
  "crop_scans": [
    {
      "id": "1708456789123",
      "timestamp": "2026-02-20T10:30:00.000Z",
      "cropName": "Cotton",
      "cropCategory": "blackSoil",
      "growthStage": "Flowering",
      "imageData": "data:image/jpeg;base64,...",
      "result": {
        "stress_type": "Biotic",
        "disease_name": "Cotton Leaf Spot",
        "confidence": 0.92,
        "severity": "Moderate",
        "recommendation": "..."
      },
      "pollution": { "pm25": 45, ... }
    }
  ]
}
```

#### Configurations
```javascript
{
  "crop_configurations": [
    {
      "id": "1708456789456",
      "name": "Cotton Standard",
      "cropCategory": "blackSoil",
      "selectedCrop": "Cotton",
      "growthStage": "Flowering",
      "pollution": { "pm25": 45, ... },
      "createdAt": "2026-02-20T10:30:00.000Z"
    }
  ]
}
```

#### App Settings
```javascript
{
  "app_settings": {
    "securityEnabled": true,
    "biometricEnabled": false,
    "notifications": true,
    "autoSave": true,
    "theme": "dark"
  }
}
```

---

## 🎯 Key Features Working Properly

### ✅ Save Configurations Button
**Location:** Detection page, above pollution parameters

**How it works:**
1. Fill in crop selection and parameters
2. Tap "Save Config" button
3. Enter configuration name in modal
4. Tap "Save"
5. Configuration stored in localStorage
6. Access via "Load Config" button

### ✅ New Scan Button
**Location:** Detection page, top action buttons

**How it works:**
1. Tap "New Scan" button
2. Clears current image
3. Resets all form fields
4. Clears previous result
5. Ready for new analysis
6. Toast notification confirms reset

### ✅ Load Configuration Button
**Location:** Detection page, top action buttons

**How it works:**
1. Tap "Load Config" button
2. Modal shows all saved configs
3. Tap any configuration to load
4. All fields auto-populated
5. Modal closes automatically
6. Toast confirms successful load

---

## 📱 Mobile Optimizations

### Performance
- Lazy loading for images
- Optimized animations (GPU-accelerated)
- Debounced slider inputs
- Efficient re-renders with React memoization

### UX Patterns
- Touch-friendly 44px minimum targets
- Visual feedback on all interactions
- Loading states for async operations
- Error handling with toast notifications
- Confirmation dialogs for destructive actions

### iOS Support
- Safe area insets for notch/island
- `pb-safe` class for bottom padding
- Smooth scrolling momentum
- No rubber-banding on fixed elements

### Android Support
- Material Design touch ripples
- Back button navigation
- Status bar color theming
- Full-screen mode ready

---

## 🔒 Security Best Practices

1. **No External Dependencies**
   - All ML simulation runs locally
   - No API keys required
   - No network requests

2. **Data Isolation**
   - localStorage scoped to domain
   - No cookies used
   - No tracking

3. **User Control**
   - Can disable security features
   - Can clear all data anytime
   - Export data option (future)

---

## 🐛 Known Limitations

1. **ML Model**
   - Currently uses simulation (random results)
   - Real backend integration needed for production

2. **Image Storage**
   - Base64 encoding in localStorage
   - Limited to ~50 scans (5MB limit)
   - Consider IndexedDB for larger datasets

3. **Offline Mode**
   - Not yet a full PWA (no service worker)
   - Add manifest.json for install prompt
   - Implement service worker for offline caching

---

## 🚀 Future Enhancements

### Short Term
- [ ] Add service worker for offline support
- [ ] Implement PWA install prompt
- [ ] Add splash screen
- [ ] Camera integration (direct photo capture)
- [ ] Share results feature

### Long Term
- [ ] Real ML model integration
- [ ] Cloud backup option
- [ ] Export reports as PDF
- [ ] Multi-language support
- [ ] Dark/Light theme toggle
- [ ] Advanced analytics (trends over time)

---

## 📞 Testing Instructions

### Test Security
1. Enable App Lock in Settings
2. Refresh page or reopen app
3. Enter PIN: `1234`
4. Or use "Simulate Biometric Auth"

### Test Save Configuration
1. Go to Scan tab
2. Select Cotton, Flowering stage
3. Adjust PM2.5 to 60
4. Tap "Save Config"
5. Name it "Cotton Test"
6. Tap Save
7. Verify toast appears

### Test Load Configuration
1. Tap "Load Config" button
2. Select "Cotton Test"
3. Verify all fields populated
4. Check PM2.5 is 60

### Test New Scan
1. Upload an image
2. Run analysis
3. View results
4. Tap "New Scan"
5. Verify image cleared
6. Verify form reset

### Test Scan History
1. Run 3-5 scans
2. Go to Analytics tab
3. Switch to "History" tab
4. Verify all scans appear
5. Tap delete on one scan
6. Verify it's removed

---

## 🎨 Design System

### Colors
- **Primary:** Emerald (#10B981)
- **Secondary:** Lime (#84CC16)
- **Accent:** Soft Yellow (#FACC15)
- **Background:** Deep Matte Black (#0F172A)

### Typography
- **Font:** System font stack (San Francisco on iOS, Roboto on Android)
- **Sizes:** 12px (xs), 14px (sm), 16px (base), 18px (lg), 24px (xl)

### Spacing
- **Base unit:** 4px
- **Common:** 12px, 16px, 24px, 32px

### Border Radius
- **Cards:** 12px (rounded-xl)
- **Buttons:** 8px (rounded-lg)
- **Inputs:** 8px (rounded-lg)

---

## 📝 License & Credits

**Built for:** Black Soil Crop Intelligence Research  
**Framework:** React 18 + Vite  
**UI Library:** Tailwind CSS v4 + Radix UI  
**Icons:** Lucide React  
**Animation:** Motion (Framer Motion)  
**Toast:** Sonner  

**Note:** This is a demonstration/prototype application. Real ML model integration required for production use.

---

## 🤝 Support

For issues or questions:
1. Check localStorage in DevTools
2. Clear data via Settings > Clear All Data
3. Disable security if locked out
4. Check console for error messages

Demo PIN for testing: **1234**
