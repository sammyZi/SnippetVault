/**
 * SnippetVault Custom Theme
 * Warm, organic color palette for a friendly and approachable UI
 */

export const theme = {
  colors: {
    // Primary - Warm terracotta/coral tones
    primary: {
      50: '#fef5f0',
      100: '#fde9dd',
      200: '#fad0ba',
      300: '#f6b08d',
      400: '#f18860',
      500: '#ea6841',
      600: '#d84e2f',
      700: '#b53d24',
      800: '#933422',
      900: '#792e20',
      950: '#42160e',
    },
    // Secondary - Warm golden amber
    secondary: {
      50: '#fefbea',
      100: '#fdf4c5',
      200: '#fbe98d',
      300: '#f9d64c',
      400: '#f6c31c',
      500: '#e6a80f',
      600: '#c8810a',
      700: '#a05c0d',
      800: '#854912',
      900: '#713c13',
      950: '#421e07',
    },
    // Accent - Warm sage green
    accent: {
      50: '#f4f7f0',
      100: '#e6ecdd',
      200: '#cfdabd',
      300: '#afc194',
      400: '#8fa86e',
      500: '#748e54',
      600: '#5a7041',
      700: '#475735',
      800: '#3b472e',
      900: '#333d29',
      950: '#1a2113',
    },
    // Neutral - Warm beiges and browns
    neutral: {
      50: '#faf8f5',
      100: '#f2ede5',
      200: '#e4d9ca',
      300: '#d2bfa7',
      400: '#c1a484',
      500: '#b08c67',
      600: '#a3795b',
      700: '#88634c',
      800: '#6f5241',
      900: '#5a4436',
      950: '#30231b',
    },
    // Success - Earthy olive green
    success: {
      50: '#f5f8f3',
      100: '#e8efe2',
      200: '#d2dec7',
      300: '#afc49f',
      400: '#87a472',
      500: '#688852',
      600: '#516d3f',
      700: '#405634',
      800: '#35452c',
      900: '#2d3a26',
      950: '#162012',
    },
    // Warning - Warm honey yellow
    warning: {
      50: '#fffbeb',
      100: '#fef3c7',
      200: '#fee68a',
      300: '#fdd24d',
      400: '#fbbf24',
      500: '#f59e0b',
      600: '#d97706',
      700: '#b45309',
      800: '#92400e',
      900: '#78350f',
      950: '#451a03',
    },
    // Error - Warm rustic red
    error: {
      50: '#fef2f2',
      100: '#fee2e2',
      200: '#fecaca',
      300: '#fca5a5',
      400: '#f87171',
      500: '#ef4444',
      600: '#dc2626',
      700: '#b91c1c',
      800: '#991b1b',
      900: '#7f1d1d',
      950: '#450a0a',
    },
  },
  
  // Typography
  typography: {
    fontSizes: {
      xs: 'text-xs',      // 0.75rem (12px)
      sm: 'text-sm',      // 0.875rem (14px)
      base: 'text-base',  // 1rem (16px)
      lg: 'text-lg',      // 1.125rem (18px)
      xl: 'text-xl',      // 1.25rem (20px)
      '2xl': 'text-2xl',  // 1.5rem (24px)
      '3xl': 'text-3xl',  // 1.875rem (30px)
    },
    fontWeights: {
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
    },
    lineHeights: {
      tight: 'leading-tight',
      normal: 'leading-normal',
      relaxed: 'leading-relaxed',
    },
  },
  
  // Spacing
  spacing: {
    xs: 'space-y-2',
    sm: 'space-y-3',
    md: 'space-y-4',
    lg: 'space-y-5',
    xl: 'space-y-6',
  },
  
  // Component styles
  components: {
    card: {
      base: 'rounded-2xl shadow-xl border-neutral-100 bg-white',
      padding: 'px-8 pb-8',
      header: 'text-center pb-4 pt-8 px-8',
    },
    button: {
      primary: 'bg-primary-600 hover:bg-primary-700 text-white shadow-md shadow-primary-200 transition-all rounded-xl font-bold',
      secondary: 'bg-secondary-600 hover:bg-secondary-700 text-white shadow-md shadow-secondary-200 transition-all rounded-xl font-bold',
      outline: 'border-2 border-neutral-300 hover:border-neutral-400 bg-white text-neutral-700 hover:bg-neutral-50 transition-all rounded-xl font-bold',
      sizes: {
        sm: 'h-9 text-sm px-4',
        md: 'h-10 text-base px-5',
        lg: 'h-11 text-base px-6',
      },
    },
    input: {
      base: 'rounded-xl border-neutral-200 focus:border-primary-500 focus:ring-primary-500',
      sizes: {
        sm: 'h-9 text-sm',
        md: 'h-10 text-base',
        lg: 'h-11 text-base',
      },
      withIcon: {
        left: 'pl-10',
        right: 'pr-10',
      },
    },
    icon: {
      sizes: {
        xs: 'w-4 h-4',
        sm: 'w-5 h-5',
        md: 'w-6 h-6',
        lg: 'w-7 h-7',
        xl: 'w-8 h-8',
      },
    },
    badge: {
      success: 'bg-success-100 text-success-700 border-success-200',
      warning: 'bg-warning-100 text-warning-700 border-warning-200',
      error: 'bg-error-100 text-error-700 border-error-200',
      info: 'bg-primary-100 text-primary-700 border-primary-200',
    },
    alert: {
      success: 'bg-success-50 border-success-200 text-success-900',
      warning: 'bg-warning-50 border-warning-200 text-warning-900',
      error: 'bg-error-50 border-error-200 text-error-900',
      info: 'bg-primary-50 border-primary-200 text-primary-900',
    },
  },
  
  // Page-specific themes
  pages: {
    auth: {
      background: 'min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-50 p-4',
      card: {
        container: 'w-full max-w-md rounded-2xl shadow-xl border-neutral-100 bg-white',
        header: 'text-center pb-4 pt-8 px-8',
        content: 'space-y-5 px-8 pb-8',
        iconContainer: 'inline-flex items-center justify-center w-16 h-16 rounded-2xl mx-auto mb-5 shadow-sm',
        title: 'text-2xl font-bold text-neutral-900 mb-2',
        description: 'text-base text-neutral-600 leading-relaxed',
      },
      form: {
        field: 'space-y-2',
        label: 'text-sm font-bold text-neutral-900',
        input: 'pl-10 pr-10 h-10 text-base rounded-xl border-neutral-200 focus:border-primary-500 focus:ring-primary-500',
        helper: 'text-sm text-neutral-500',
        error: 'flex items-center gap-2 p-3 text-sm text-error-700 bg-error-50 border border-error-200 rounded-xl',
      },
      button: {
        primary: 'w-full h-11 text-base font-bold rounded-xl bg-primary-600 hover:bg-primary-700 text-white shadow-md shadow-primary-200 transition-all',
        loading: 'w-full h-11 text-base font-bold rounded-xl bg-primary-400 text-white cursor-not-allowed',
      },
      link: 'text-primary-600 hover:text-primary-700 font-bold transition-colors',
    },
    dashboard: {
      background: 'min-h-screen bg-neutral-50',
      header: 'bg-white border-b border-neutral-200 shadow-sm',
      content: 'container mx-auto px-4 py-8',
      card: 'rounded-xl bg-white border border-neutral-200 shadow-sm hover:shadow-md transition-shadow',
    },
  },
} as const;

export type Theme = typeof theme;

