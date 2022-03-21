import typescript from '@rollup/plugin-typescript';
import dts from 'rollup-plugin-dts';

const pack = require('./package.json');

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        file: pack.main,
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: pack.module,
        format: 'esm',
        sourcemap: true,
      },
    ],
    plugins: [typescript({ tsconfig: './tsconfig.json' })],
  },
  {
    input: 'dist/esm/types/index.d.ts',
    output: [{ file: 'dist/index.d.ts', format: 'esm' }],
    plugins: [dts()],
    external: [/\.css$/],
  },
];
