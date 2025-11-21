/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary colors - NEON
        primary: 'var(--color-primary, #00ffff)',
        
        // Blue shades - NEON CYAN
        blue: 'var(--color-blue, #00ffff)',
        'blue-light': 'var(--color-blue-light, #66ffff)',
        
        // Text colors - HIGH CONTRAST
        text: 'var(--color-text, #ffffff)',
        'text-default': 'var(--color-text-default, #ffffff)',
        'text-soft': 'var(--color-text-soft, #aaaaaa)',
        
        // Background colors - PURE BLACK
        'bg-soft': 'var(--color-bg-soft, #000000)',
        'bg-mute': 'var(--color-bg-mute, #0a0a0a)',
        
        // Border colors - NEON
        border: 'var(--color-border, #00ffff)',
        'border-default': 'var(--color-border-default, #00ffff)',
        
        // Status colors - NEON
        green: 'var(--color-green, #00ff88)',
        red: 'var(--color-red, #ff0055)',
        'red-light': 'var(--color-red-light, #ff3377)',
        orange: 'var(--color-orange, #ff9900)',
        yellow: 'var(--color-yellow, #ffff00)',
        
        // Additional neon colors
        'neon-cyan': '#00ffff',
        'neon-magenta': '#ff00ff',
        'neon-green': '#00ff88',
        'neon-pink': '#ff0055',
        'neon-yellow': '#ffff00',
        'neon-orange': '#ff9900',
      },
      animation: {
        'neon-pulse': 'neon-pulse 1.5s ease-in-out infinite',
        'neon-glow': 'neon-glow 2s ease-in-out infinite',
      },
      keyframes: {
        'neon-pulse': {
          '0%, 100%': {
            filter: 'drop-shadow(0 0 5px currentColor) drop-shadow(0 0 15px currentColor)',
          },
          '50%': {
            filter: 'drop-shadow(0 0 10px currentColor) drop-shadow(0 0 30px currentColor)',
          },
        },
        'neon-glow': {
          '0%, 100%': {
            boxShadow: '0 0 5px currentColor, 0 0 10px currentColor, 0 0 20px currentColor',
          },
          '50%': {
            boxShadow: '0 0 10px currentColor, 0 0 20px currentColor, 0 0 40px currentColor',
          },
        },
      },
    },
  },
  plugins: [],
}
