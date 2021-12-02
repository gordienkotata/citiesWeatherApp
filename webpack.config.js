const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');

function inlineOptions(loaders) {
    return loaders.map(({ loader, options = {} }) => {
        return loader + '?' + JSON.stringify(options);
    });
}


module.exports = {
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js',
    },
    resolve: {
        extensions: ['.wasm', '.mjs', '.js', '.jsx', '.ts', '.tsx', '.json'],
        modules: [path.join(__dirname, 'src'), 'node_modules'],
        alias: {
            react: path.join(__dirname, 'node_modules', 'react'),
            appComponents: path.resolve(__dirname, 'src/components/'),
            appDucks: path.resolve(__dirname, 'src/ducks/'),
            appLogics: path.resolve(__dirname, 'src/logics/'),
            appTypes: path.resolve(__dirname, 'src/types/'),
        },
    },
    module: {
        rules: [
      
            {
                test: /\.ts(x?)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: true,
                        },
                    },
                ],
            },
            {
                test: /\.css$/,
                use: (info) => inlineOptions([
                    { loader: 'style-loader' },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                localIdentName: !info.resource.includes('antd')
                                    ? '[path]-[name]__[local]'
                                    : '[local]',
                            },
                        },
                    },
                ])
            },
            {
                test: /\.js$/,
                enforce: 'pre',
                use: ['source-map-loader'],
              },
        ],
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: './public/index.html',
        }),
    ],
};