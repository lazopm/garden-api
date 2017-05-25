import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';

export default {
    entry: 'src/main.js',
    format: 'cjs',
    dest: 'build/bundle.js',
    external: [
        'crypto',
        'aws-sdk'
    ],
    plugins: [
        resolve(),
        commonjs(),
        babel({
            exclude: 'node_modules/**'
        }),
    ],
};
