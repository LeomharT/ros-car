import tailwindcss from '@tailwindcss/vite';
import { UserConfig } from 'vite';
import wasm from 'vite-plugin-wasm';

export default {
  plugins: [wasm(), tailwindcss()],
  resolve: { tsconfigPaths: true },
} as UserConfig;
