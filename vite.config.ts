import { UserConfig } from 'vite';
import wasm from 'vite-plugin-wasm';

export default {
  plugins: [wasm()],
} as UserConfig;
