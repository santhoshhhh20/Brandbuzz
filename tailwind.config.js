/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: '375px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },
      colors: {
        border: "hsl(var(--border, 0 0% 90%))",
        input: "hsl(var(--input, 0 0% 90%))",
        ring: "hsl(var(--ring, 0 0% 10%))",
        background: "hsl(var(--background, 0 0% 100%))",
        foreground: "hsl(var(--foreground, 0 0% 7%))",
        primary: {
          DEFAULT: "hsl(var(--primary, 0 0% 9%))",
          foreground: "hsl(var(--primary-foreground, 0 0% 98%))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary, 0 0% 96%))",
          foreground: "hsl(var(--secondary-foreground, 0 0% 9%))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive, 0 84.2% 60.2%))",
          foreground: "hsl(var(--destructive-foreground, 0 0% 98%))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted, 0 0% 96%))",
          foreground: "hsl(var(--muted-foreground, 0 0% 45%))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent, 0 0% 96%))",
          foreground: "hsl(var(--accent-foreground, 0 0% 9%))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover, 0 0% 100%))",
          foreground: "hsl(var(--popover-foreground, 0 0% 7%))",
        },
        card: {
          DEFAULT: "hsl(var(--card, 0 0% 100%))",
          foreground: "hsl(var(--card-foreground, 0 0% 7%))",
        },
        surface: '#fafafa',
        'surface-hover': '#f4f4f5',
        'border-subtle': '#e5e7eb',
        'border-light': '#f3f4f6',
        text: {
          primary: '#111111',
          secondary: '#52525b',
          muted: '#a1a1aa',
        }
      },
      backgroundImage: {
        'gradient-conic': 'conic-gradient(var(--conic-position, from 180deg at 50% 50%), var(--tw-gradient-stops))',
      },
      borderRadius: {
        lg: "var(--radius, 0.75rem)",
        md: "calc(var(--radius, 0.75rem) - 2px)",
        sm: "calc(var(--radius, 0.75rem) - 4px)",
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        cormorant: ['"Cormorant Garamond"', 'serif'],
        body: ['"Inter"', 'sans-serif'],
      },
      letterSpacing: {
        tighter: '-0.05em',
        tight: '-0.03em',
        widest: '0.25em',
      },
      animation: {
        'marquee': 'marquee 25s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      }
    },
  },
  plugins: [],
}
