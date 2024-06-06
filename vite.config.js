import { readdirSync } from "fs";
import { resolve } from "path";

export default {
  root: 'src',
  build: {
    outDir: resolve(__dirname, 'dist'),
    emptyOutDir: true,
    rollupOptions: {
      input: readdirSync(resolve(__dirname, 'src')).reduce((acc, file) => {
        if (file.endsWith('.html')) {
          acc[file] = resolve(__dirname, 'src', file);
        }
        return acc;
      }, {})
    }
  }
};