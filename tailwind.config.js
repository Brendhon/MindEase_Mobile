/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './App.{js,ts,tsx}',
    './app/**/*.{js,ts,tsx}',
    './components/**/*.{js,ts,tsx}',
  ],

  presets: [require('nativewind/preset')],

  /**
   * Safelist for dynamic accessibility classes
   * These classes are generated at runtime via tailwind-classes.ts
   * and need to be explicitly included in the build.
   */
  safelist: [
    // Font size classes (all modes: small, normal, large)
    'text-[10px]',
    'text-xs',
    'text-sm',
    'text-md',
    'text-lg',
    'text-xl',
    'text-2xl',
    'text-3xl',
    'text-4xl',
    // Spacing classes (compact, normal, relaxed)
    'p-2',
    'p-4',
    'p-6',
    'gap-2',
    'gap-4',
    'gap-6',
    'm-2',
    'm-4',
    'm-6',
    // Focus mode classes
    'border-2',
    'border-action-primary',
    'shadow-md',
    // Text contrast classes
    'text-text-primary',
    'text-text-secondary',
    'text-text-muted',
    'opacity-75',
    'opacity-60',
    // Border contrast classes
    'border-border-strong',
    'border-border-subtle',
    // Feedback color classes (for toast notifications)
    'bg-feedback-success',
    'bg-feedback-error',
    'bg-feedback-warning',
    'bg-feedback-info',
    'text-white',
    // Feedback border classes (for high contrast mode)
    'border-feedback-success',
    'border-feedback-error',
    'border-feedback-warning',
    'border-feedback-info',
    'border-4',
    'shadow-lg',
  ],
  theme: {
    extend: {
      // ========================================
      // 🎨 COLOR TOKENS - Base Neutral (Low Stimulation)
      // ========================================
      colors: {
        // Backgrounds
        'bg-primary': '#f9fafb',
        'bg-secondary': '#f3f4f6',
        'bg-tertiary': '#e5e7eb',

        // Surfaces
        'surface-primary': '#ffffff',
        'surface-secondary': '#f9fafb',

        // Borders
        'border-subtle': '#e5e7eb',
        'border-strong': '#d1d5db',

        // Text
        'text-primary': '#111827',
        'text-secondary': '#374151',
        'text-muted': '#6b7280',
        'text-inverse': '#f9fafb',

        // Actions
        'action-primary': '#2563eb',
        'action-primary-hover': '#1d4ed8',
        'action-primary-high': '#1e40af',
        'action-secondary': '#475569',
        'action-secondary-hover': '#334155',
        'action-danger': '#dc2626',
        'action-danger-hover': '#b91c1c',
        'action-danger-high': '#b91c1c',
        'action-warning': '#d97706',
        'action-warning-hover': '#b45309',
        'action-warning-high': '#b45309',

        // Feedback
        'feedback-success': '#16a34a',
        'feedback-warning': '#d97706',
        'feedback-error': '#dc2626',
        'feedback-info': '#0284c7',
      },

      // ========================================
      // 📏 SPACING TOKENS - Density Control
      // ========================================
      spacing: {
        1: '0.25rem', // 4px
        2: '0.5rem', // 8px
        3: '0.75rem', // 12px
        4: '1rem', // 16px
        6: '1.5rem', // 24px
        8: '2rem', // 32px
        12: '3rem', // 48px
        16: '4rem', // 64px
      },

      // ========================================
      // 🧱 RADIUS TOKENS - Soft Interfaces
      // ========================================
      borderRadius: {
        sm: '0.375rem', // 6px
        md: '0.5rem', // 8px
        lg: '0.75rem', // 12px
        full: '9999px',
      },

      // ========================================
      // 🔤 TYPOGRAPHY TOKENS
      // ========================================
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      fontSize: {
        xs: ['0.75rem', { lineHeight: '1.5' }], // 12px
        sm: ['0.875rem', { lineHeight: '1.5' }], // 14px
        md: ['1rem', { lineHeight: '1.5' }], // 16px
        lg: ['1.125rem', { lineHeight: '1.5' }], // 18px
        xl: ['1.25rem', { lineHeight: '1.25' }], // 20px
        '2xl': ['1.5rem', { lineHeight: '1.25' }], // 24px
        '3xl': ['1.875rem', { lineHeight: '1.25' }], // 30px
      },
      fontWeight: {
        regular: '400',
        medium: '500',
        semibold: '600',
      },
      lineHeight: {
        tight: '1.25',
        normal: '1.5',
        relaxed: '1.75',
      },

      // ========================================
      // 🌫 ELEVATION TOKENS - Soft Shadows
      // ========================================
      boxShadow: {
        soft: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        medium:
          '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
      },

      // ========================================
      // 🎞 MOTION TOKENS - Controlled Animation
      // ========================================
      transitionDuration: {
        fast: '150ms',
        normal: '250ms',
        slow: '350ms',
      },
      transitionTimingFunction: {
        base: 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
};
