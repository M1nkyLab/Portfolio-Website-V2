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
        syedhaziq: {
          bg: 'var(--syedhaziq-bg)',
          surface: 'var(--syedhaziq-surface)',
          gold: 'var(--syedhaziq-gold)',
          'gold-dim': 'var(--syedhaziq-gold-dim)',
          text: 'var(--syedhaziq-text)',
          muted: 'var(--syedhaziq-muted)',
          success: 'var(--syedhaziq-success)',
          danger: 'var(--syedhaziq-danger)',
        }
      },
      fontFamily: {
        display: ['var(--font-display)'],
        body: ['var(--font-body)'],
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
