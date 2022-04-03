import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import postcss from 'rollup-plugin-postcss';
import copy from 'rollup-plugin-copy';

const pack = require('./package.json');

export default {
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
  plugins: [
    peerDepsExternal(),
    resolve(),
    commonjs(),
    typescript({ useTsconfigDeclarationDir: true }),
    postcss(),
    copy({
      targets: [
        {
          src: 'src/theme.scss',
          dest: 'build',
          rename: 'theme.scss',
        },
      ],
    }),
  ],
};
