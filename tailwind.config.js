/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary colors
        primary: 'var(--color-primary, #3b82f6)',
        
        // Blue shades
        blue: 'var(--color-blue, #3b82f6)',
        'blue-light': 'var(--color-blue-light, #60a5fa)',
        
        // Text colors
        text: 'var(--color-text, #6b7280)',
        'text-default': 'var(--color-text-default, #1f2937)',
        'text-soft': 'var(--color-text-soft, #9ca3af)',
        
        // Background colors
        'bg-soft': 'var(--color-bg-soft, #f9fafb)',
        'bg-mute': 'var(--color-bg-mute, #e5e7eb)',
        
        // Border colors
        border: 'var(--color-border, #d1d5db)',
        'border-default': 'var(--color-border-default, #d1d5db)',
        
        // Status colors
        green: 'var(--color-green, #10b981)',
        red: 'var(--color-red, #ef4444)',
        'red-light': 'var(--color-red-light, #f87171)',
        orange: 'var(--color-orange, #f97316)',
        yellow: 'var(--color-yellow, #eab308)',
      },
    },
  },
  plugins: [],
}
