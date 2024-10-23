// eslint-disable-next-line @typescript-eslint/no-require-imports
const esbuild = require("esbuild");

esbuild
  .build({
    entryPoints: ["src/index.ts"],
    outfile: "./dist/index.js",
    target: "node14",
    platform: "node",
    bundle: true,
    minify: true,
    sourcemap: false,
    external: ["@mapbox/node-pre-gyp"],
  })
  .then(() => {
    console.log("Build complete");
  });
