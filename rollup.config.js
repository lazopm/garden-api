import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';

export default {
    entry: 'src/main.js',
    format: 'cjs',
    dest: 'build/bundle.js',
    plugins: [
        resolve(),
        babel({
            exclude: 'node_modules/**'
        })
    ],
};
