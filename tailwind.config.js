/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xl': '1300px',
      },
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
        
        // Additional status colors
        success: 'var(--color-success, #08F733)',
        'success-light': 'var(--color-success-light, #0ff55c66)',
        approved: 'var(--color-approved, #53F7F6)',
        'approved-light': 'var(--color-approved-light, #64ccc966)',
        critic: 'var(--color-critic, #FF005E)',
        'critic-light': 'var(--color-critic-light, #660025)',
        
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
        'pulse-border': 'pulse-border 1s ease-in-out infinite',
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
        'pulse-border': {
          '0%, 100%': {
            borderColor: '#FF005E',
            boxShadow: '0 0 40px 10px rgba(255, 0, 94, 1), 0 0 80px 20px rgba(255, 0, 94, 0.8)',
          },
          '50%': {
            borderColor: '#00FF88',
            boxShadow: '0 0 80px 30px rgba(0, 255, 136, 1), 0 0 120px 40px rgba(0, 255, 136, 0.9)',
          },
        },
      },
    },
  },
  plugins: [],
}
