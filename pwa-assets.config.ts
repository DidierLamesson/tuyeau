import {
  defineConfig,
  minimal2023Preset,
} from '@vite-pwa/assets-generator/config';

// Override the default 30% padding so the cream background goes
// edge-to-edge in the apple-touch icon (iOS already adds rounded corners).
export default defineConfig({
  headLinkOptions: { preset: '2023' },
  preset: {
    ...minimal2023Preset,
    apple: {
      sizes: [180],
      padding: 0,
      resizeOptions: { background: '#f5ecd9' },
    },
    maskable: {
      sizes: [512],
      padding: 0.1,
      resizeOptions: { background: '#f5ecd9' },
    },
    transparent: {
      sizes: [64, 192, 512],
      favicons: [[48, 'favicon.ico']],
      resizeOptions: { background: '#f5ecd9' },
    },
  },
  images: ['public/icon.svg'],
});
