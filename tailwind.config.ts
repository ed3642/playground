import type { Config } from 'tailwindcss'

const generateBounceAnimations = (times: number) => {
  const keyframes: { [key: string]: { [key: string]: { transform: string } } } = {}
  const animations: { [key: string]: string } = {}

  for (let i = 1; i <= times; i++) {
    keyframes[`bounce-${i}`] = {
      '0%, 100%': { transform: 'translateY(0)' },
      '50%': { transform: 'translateY(-25%)' },
    }
    animations[`bounce-${i}`] = `bounce-${i} 1s ease-in-out ${i}`
  }

  return { keyframes, animations }
}

const { keyframes: bounceKeyframes, animations: bounceAnimations } = generateBounceAnimations(5) // gen from 1-5

const config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        ...bounceKeyframes,
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        enter: {
          from: {
            opacity: 'var(--tw-enter-opacity, 0)',
            transform:
              'scale(var(--tw-enter-scale, 0.95)) rotate(var(--tw-enter-rotate, 0deg)) translateX(var(--tw-enter-translate-x, 0)) translateY(var(--tw-enter-translate-y, 0))',
          },
          to: {
            opacity: '1',
            transform: 'scale(1) rotate(0deg) translateX(0) translateY(0)',
          },
        },
      },
      animation: {
        ...bounceAnimations,
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        in: 'enter 500ms ease-out',
        'in-long': 'enter 5000ms ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config

export default config
