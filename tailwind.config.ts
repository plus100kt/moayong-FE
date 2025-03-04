import type { Config } from 'tailwindcss';
import animate from 'tailwindcss-animate';

export default {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        /** Tertiary - Gray 계열 */
        'gray-0': '#FFFFFF',
        'gray-5': '#F4F5F6',
        'gray-10': '#E6E8EA',
        'gray-20': '#CDD1D5',
        'gray-30': '#B1B8BE',
        'gray-40': '#8A949E',
        'gray-50': '#6D7882',
        'gray-60': '#58616A',
        'gray-70': '#464C53',
        'gray-80': '#33363D',
        'gray-90': '#1E2124',
        'gray-100': '#000000',

        /** Primary - Green 계열 */
        'green-5': '#EAFBF7',
        'green-10': '#C9FAE2',
        'green-20': '#9BF5C4',
        'green-30': '#6CE9A6',
        'green-40': '#32D583',
        'green-50': '#12B76A',
        'green-60': '#039855',
        'green-70': '#038750',
        'green-80': '#005E5B',
        'green-90': '#004745',

        /** Secondary - Purple 계열 */
        'purple-5': '#F0E7FC',
        'purple-10': '#D4B4FA',
        'purple-20': '#B388F5',
        'purple-30': '#9061F6',
        'purple-40': '#763DF2',
        'purple-50': '#590DE5',
        'purple-60': '#4E0ADF',
        'purple-70': '#3204AC',
        'purple-80': '#2B0396',
        'purple-90': '#1F0566',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      fontSize: {
        /** Heading */
        'heading-lg': [
          '48px',
          { lineHeight: '120%', letterSpacing: '-2%', fontWeight: '600' },
        ],
        'heading-lg-mobile': [
          '32px',
          { lineHeight: '120%', letterSpacing: '-2%', fontWeight: '600' },
        ],
        'heading-md': [
          '40px',
          { lineHeight: '120%', letterSpacing: '-2%', fontWeight: '600' },
        ],
        'heading-md-mobile': [
          '28px',
          { lineHeight: '120%', letterSpacing: '-2%', fontWeight: '600' },
        ],
        'heading-sm': [
          '32px',
          { lineHeight: '130%', letterSpacing: '-2%', fontWeight: '600' },
        ],
        'heading-sm-mobile': [
          '24px',
          { lineHeight: '130%', letterSpacing: '-2%', fontWeight: '600' },
        ],

        /** Title */
        'title-xl': [
          '32px',
          { lineHeight: '130%', letterSpacing: '-2%', fontWeight: '500' },
        ],
        'title-xl-mobile': [
          '24px',
          { lineHeight: '130%', letterSpacing: '-2%', fontWeight: '500' },
        ],
        'title-lg': [
          '28px',
          { lineHeight: '130%', letterSpacing: '-2%', fontWeight: '500' },
        ],
        'title-lg-mobile': [
          '22px',
          { lineHeight: '130%', letterSpacing: '-2%', fontWeight: '500' },
        ],

        /** Body */
        'body-lg': [
          '18px',
          { lineHeight: '140%', letterSpacing: '0', fontWeight: '400' },
        ],
        'body-md': [
          '16px',
          { lineHeight: '140%', letterSpacing: '0', fontWeight: '400' },
        ],
        'body-sm': [
          '14px',
          { lineHeight: '140%', letterSpacing: '0', fontWeight: '400' },
        ],

        /** Label */
        'label-lg': [
          '16px',
          { lineHeight: '130%', letterSpacing: '0', fontWeight: '600' },
        ],
        'label-md': [
          '14px',
          { lineHeight: '130%', letterSpacing: '0', fontWeight: '600' },
        ],
        'label-sm': [
          '12px',
          { lineHeight: '130%', letterSpacing: '0', fontWeight: '600' },
        ],

        /** Caption */
        'caption-lg': [
          '14px',
          { lineHeight: '130%', letterSpacing: '0', fontWeight: '500' },
        ],
        'caption-md': [
          '12px',
          { lineHeight: '130%', letterSpacing: '0', fontWeight: '500' },
        ],
        'caption-sm': [
          '10px',
          { lineHeight: '130%', letterSpacing: '0', fontWeight: '500' },
        ],
      },
      fontFamily: {
        default: ['Pretendard', 'sans-serif'],
      },
    },
  },
  plugins: [animate],
} satisfies Config;
