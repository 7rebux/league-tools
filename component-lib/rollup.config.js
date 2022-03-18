import typescript from '@rollup/plugin-typescript';
import dts from 'rollup-plugin-dts';

const package = require('package.json');

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        file: package.main,
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: package.module,
        format: 'esm',
        sourcemap: true,
      },
    ],
    plugins: [
      typescript({ tsconfig: "./tsconfig.json" }),
    ],
  },
  {
    input: 'dist/esm/types/index.d.ts',
    output: [{ file: 'dist/index.d.ts', format: 'esm' }],
    plugins: [ dts() ],
    external: [ /\.css$/ ],
  },
];
