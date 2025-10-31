# Dark Mode Feature Documentation

## Overview

A comprehensive dark mode feature has been added to the MediQueue application, allowing users to toggle between light and dark themes with persistence across sessions.

## Features Implemented

### 1. Theme Context (`src/contexts/ThemeContext.jsx`)

- Centralized theme state management using React Context
- Automatic theme persistence in localStorage
- Seamless theme switching with `toggleTheme()` function
- `useTheme()` hook for easy access to theme state in any component

### 2. Theme Toggle Component (`src/components/ThemeToggle.jsx`)

- Reusable toggle button component
- Visual indicators (sun/moon icons)
- Smooth transitions between themes
- Added to navigation bars for easy access

### 3. Updated Components with Dark Mode Support

- **HomePage**: Full dark mode styling for hero, features, and modals
- **PatientNavbar**: Dark mode support with theme toggle
- **DoctorNavbar**: Dark mode support with theme toggle
- **Footer**: Complete dark mode styling
- All navigation elements, buttons, and form inputs

### 4. CSS Enhancements (`src/index.css`)

- CSS custom properties for theme colors
- Smooth color transitions
- Dark mode base styles using Tailwind's `dark:` variant

## How to Use

### For Users

1. Click the theme toggle button (sun/moon icon) in the navigation bar
2. The theme will switch between light and dark mode
3. Your preference is automatically saved and will persist across sessions

### For Developers

#### Using the Theme Context

```jsx
import { useTheme } from "../contexts/ThemeContext";

function MyComponent() {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <div>
      <p>Current theme: {isDarkMode ? "Dark" : "Light"}</p>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
}
```

#### Adding Dark Mode Styles

Use Tailwind's `dark:` variant for dark mode specific styles:

```jsx
<div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
  Content here
</div>
```

## Theme Colors

### Light Mode

- Primary Background: `bg-gray-50`
- Secondary Background: `bg-white`
- Primary Text: `text-gray-900`
- Secondary Text: `text-gray-600`
- Accent: `text-blue-600`

### Dark Mode

- Primary Background: `dark:bg-gray-900`
- Secondary Background: `dark:bg-gray-800`
- Primary Text: `dark:text-gray-100`
- Secondary Text: `dark:text-gray-400`
- Accent: `dark:text-blue-400`

## Files Modified

1. **Created:**

   - `src/contexts/ThemeContext.jsx`
   - `src/components/ThemeToggle.jsx`

2. **Updated:**
   - `src/main.jsx` (Added ThemeProvider wrapper)
   - `src/index.css` (Added dark mode styles)
   - `src/pages/HomePage.jsx` (Dark mode support)
   - `src/components/PatientNavbar.jsx` (Dark mode support + toggle)
   - `src/components/DoctorNavbar.jsx` (Dark mode support + toggle)
   - `src/components/Footer.jsx` (Dark mode support)

## Technical Details

- **Framework**: React 18+ with Context API
- **Styling**: Tailwind CSS v4 with dark mode variant
- **Persistence**: localStorage for theme preference
- **Transitions**: Smooth 200ms color transitions
- **Accessibility**: ARIA labels on toggle button

## Future Enhancements

Consider adding:

- System theme preference detection
- More granular color customization
- Dark mode for all remaining pages
- Keyboard shortcuts for theme switching
- Animation effects during theme transitions
