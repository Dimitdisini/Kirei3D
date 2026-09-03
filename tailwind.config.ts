import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        fredoka: ['var(--font-fredoka)', 'Fredoka', 'sans-serif'],
        poppins: ['var(--font-poppins)', 'Poppins', 'sans-serif'],
        mono: ['var(--font-mono)', 'JetBrains Mono', 'monospace'],
      },
      colors: {
        pastelPink: '#FFB7C5',
        pastelPinkLight: '#FFF0F5',
        pastelPinkDark: '#FF5C8A',
        pastelPurple: '#CDB4DB',
        pastelPurpleLight: '#F5EEFD',
        pastelYellow: '#FEF3C7',
        skyBlue: '#38BDF8',
        skyBlueLight: '#F0F9FF',
        skyBlueDark: '#0284C7',
        warmCream: '#FAF7F2',
        softDark: '#1E293B',
      },
    },
  },
  plugins: [],
};

export default config;
