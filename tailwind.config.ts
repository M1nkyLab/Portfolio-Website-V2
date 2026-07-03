import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        rora: {
          bg: 'var(--rora-bg)',
          surface: 'var(--rora-surface)',
          gold: 'var(--rora-gold)',
          'gold-dim': 'var(--rora-gold-dim)',
          text: 'var(--rora-text)',
          muted: 'var(--rora-muted)',
          success: 'var(--rora-success)',
          danger: 'var(--rora-danger)',
        }
      },
      fontFamily: {
        display: ['var(--font-clash)'],
        body: ['var(--font-cabinet)'],
        mono: ['var(--font-dm-mono)'],
      },
      borderRadius: {
        card: '2px',
        btn: '6px',
        bleed: '0px'
      }
    },
  },
  plugins: [],
};
export default config;
