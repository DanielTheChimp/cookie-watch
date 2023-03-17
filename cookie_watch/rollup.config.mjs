import terser from '@rollup/plugin-terser';

export default [
    {
        input: './src/js/tester.js',
        output: [
            {
                file: "./src/static/index.min.js",
                format: "es",
                plugins: [terser()]
            },
        ],
    }, 
]