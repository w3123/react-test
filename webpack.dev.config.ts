// const path = require('path')
import * as webpack from 'webpack'
// var HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin")


// const ts_import_plugin = require('ts-import-plugin')
const extractLESS = new ExtractTextPlugin('./style/style.css')

// const inProject = (...args: Array<string>) => path.resolve(__dirname, ...args)
// const inProjectSrc = (file: string) => inProject('src', file)


const devConfig: webpack.Configuration = {
    devtool: 'source-map',

    entry: {
        // normalize: [
        //     inProjectSrc('normalize'),
        // ],
        main: [__dirname + '/src/index.tsx'],
    },

    output: {
        filename: '[name].js',
        path: __dirname + '/build',
        chunkFilename: '[id].[chunkhash].js'
    },
    resolve: {
        alias: {
            'lib': __dirname + '/src/lib'
        },
        extensions: ['.ts', '.tsx', '.js']
    },
    module: {
        loaders: [
            {
                test: /\.less|\.css$/,
                use: extractLESS.extract({
                    use: [
                        {
                            loader: "css-loader"
                        },
                        {
                            loader: "less-loader"
                        }
                    ],
                    fallback: "style-loader"
                })
            },
            {
                test: /\.tsx*$/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: true,
                            compilerOptions: {
                                module: 'es2015'
                            }
                        },
                    },
                    { loader: 'tslint-loader' }
                ]

            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        extractLESS,
    ],
    devServer: {
        // inline: true,
        contentBase: './src/',
        hot: true,
        port: 3003,
        historyApiFallback: true,

        // proxy: {
        //     '/': {
        // target: 'http://localhost:3003',
        // secure: false,
        //                 bypass: (req: any, res: any, proxyOptions: any) => {
        //                     if(req.headers.accept.indexOf('html') !== -1) {
        //                         console.log('Skipping proxy for browser request.');
        // return '/index.html';
        //                 }
        //                 return undefined
        //               }
        //     }
        //   }

    },

}

module.exports = devConfig


















