import { resolve } from "path";
import { defineConfig } from "vite";
import { splitVendorChunkPlugin } from "vite";

import { EXAMPLES } from "./examples";

// @ts-ignore
const input: { [key: string]: resolve } = {};

EXAMPLES.forEach((example) => {
  input["examples"] = resolve(__dirname, `examples/index.html`);
  input[example] = resolve(
    __dirname,
    `examples/examples/${example}/index.html`
  );
});

export default defineConfig({
  base: "./",
  build: {
    outDir: "./dist/examples",
    rollupOptions: {
      input,
    },
  },
  plugins: [splitVendorChunkPlugin()],
});
