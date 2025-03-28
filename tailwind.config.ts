import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      borderRadius: {
        'base': '40px',
        'base-mini': '32px',
      },
      screens: {
        'tablet': '768px',
        'laptop': '1024px',
        'desktop': '1280px',
        'ultrawide': '1440px',
      },
      boxShadow: {
        'round': '0px 3px 16px 0px rgba(130, 145, 173, 0.25)'
      },
      keyframes: {
        "fade-in": {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        "fade-out": {
          from: { opacity: '1' },
          to: { opacity: '0' },
        },
        pulseScale: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.2)' },
        },
      },
      animation: {
        "fade-in": "fade-in 0.2s ease-out forwards",
        "fade-out": "fade-out 0.2s ease-out forwards",
        pulseScale: 'pulseScale 1s infinite ease-in-out',
      },
      height: {
        'mobile': 'calc(100dvh - 64px)', // Для мобільних
        'tablet': 'calc(100dvh - 72px)', // Для планшетів
        'desktop': '100dvh', // Для десктопів
      },
      minHeight: {
        'mobile': 'calc(100dvh - 64px)', // Для мобільних
        'tablet': 'calc(100dvh - 72px)', // Для планшетів
        'desktop': '100dvh', // Для десктопів
      },
    },
  },
};

export default config;