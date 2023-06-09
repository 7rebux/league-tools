import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import postcss from 'rollup-plugin-postcss';
import copy from 'rollup-plugin-copy';

const pack = require('./package.json');

export default {
  input: 'src/index.ts',
  output: [
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
    typescript(),
    postcss(),
    copy({
      targets: [
        {
          src: 'src/_theme.scss',
          dest: 'build',
          rename: '_theme.scss',
        },
      ],
    }),
  ],
};
