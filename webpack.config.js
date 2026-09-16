const path = require('path');
const webpack = require('webpack');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const WebpackCdnPlugin = require('webpack-cdn-plugin');
const AliasPlugin = require('enhanced-resolve/lib/AliasPlugin');
const Dotenv = require('dotenv-webpack');

// for build configs
require('dotenv').config();

module.exports = (env, argv) => ({
  entry: {
    'pttchrome': './src/entry.js',
  },
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: `assets/[name]${ env.production ? '.[contenthash]' : '' }.js`
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader',
        ],
      },
      {
        test: /\.(bin|svg|bmp|png|woff)$/,
        oneOf: [
          {
            resourceQuery: /inline/,
            type: 'asset/inline',
          },
          {
            type: 'asset/resource',
            generator: {
              filename: 'assets/[name].[contenthash][ext]',
            },
          }
        ]
      }
    ]
  },
  resolve: {
    plugins: [new AliasPlugin('described-resolve', [{
      name: 'Icon',
      alias: [
        path.resolve(__dirname, `src/icon/${process.env.PTTCHROME_THEME || 'pttchrome'}/`),
        path.resolve(__dirname, 'src/icon/')
      ]
    }], 'resolve')]
  },
  devtool: 'source-map',
  optimization: {
    // '...' keeps webpack's built-in terser for JS alongside the CSS minimizer.
    minimizer: ['...', new CssMinimizerPlugin()],
  },
  plugins: [
    new Dotenv(),
    new webpack.DefinePlugin({
      'process.env.PTTCHROME_PAGE_TITLE': JSON.stringify(process.env.PTTCHROME_PAGE_TITLE || 'PttChrome'),
      'process.env.PTTCHROME_PAGE_DESCRIPTION': JSON.stringify(process.env.PTTCHROME_PAGE_DESCRIPTION || 'A web client for connecting to the ANSI based terminals.'),
      'process.env.PTTCHROME_DYNAMIC_TITLE': JSON.stringify(process.env.PTTCHROME_DYNAMIC_TITLE !== 'false'),
      'process.env.DEFAULT_SITE': JSON.stringify(env.production ? process.env.DEFAULT_SITE || 'wsstelnet://ws.ptt.cc/bbs' : 'wstelnet://localhost:8080/bbs'),
      'process.env.ALLOW_SITE_IN_QUERY': JSON.stringify(process.env.ALLOW_SITE_IN_QUERY === 'yes'),
      'process.env.DEVELOPER_MODE': JSON.stringify(!env.production),
      'PTTCHROME.NAME': JSON.stringify(process.env.npm_package_name),
      'PTTCHROME.VERSION': JSON.stringify(process.env.npm_package_version),
      'PTTCHROME.GITHUB_REPOSITORY_OWNER': JSON.stringify(process.env.GITHUB_REPOSITORY_OWNER || 'ptt'),
      'PTTCHROME.GITHUB_REPOSITORY': JSON.stringify(process.env.GITHUB_REPOSITORY || 'ptt/ptt-term'),
    }),
    new MiniCssExtractPlugin({
      filename: 'assets/[name].[contenthash].css',
      chunkFilename: 'asseets/[id].css',
    }),
    new HtmlWebpackPlugin({
      alwaysWriteToDisk: !env.production,
      minify: {
        collapseWhitespace: env.production,
        removeComments: env.production
      },
      inject: 'head',
      template: './src/dev.html',
      filename: './index.html'
    }),
    new WebpackCdnPlugin({
      crossOrigin: 'anonymous',
      modules: [
        {
          // jQuery must be loaded before bootstrap.
          name: 'jquery',
          var: 'jQuery',
          path: 'dist/jquery.min.js',
        },
        {
          name: 'bootstrap',
          var: 'bootstrap',
          path: 'dist/js/bootstrap.min.js',
          style: 'dist/css/bootstrap.min.css',
        },
        {
          name: 'hammerjs',
          var: 'Hammer',
          path: 'hammer.min.js',
        },
        {
          name: 'react',
          var: 'React',
          version: '16.14.0',
          path: `umd/react.${env.production ? 'production' : 'development'}${env.production ? '.min' : ''}.js`,
        },
        {
          name: 'react-dom',
          var: 'ReactDOM',
          version: '16.14.0',
          path: `umd/react-dom.${env.production ? 'production' : 'development'}${env.production ? '.min' : ''}.js`,
        },
      ],
    })
  ].concat(env.production ? [] : [
    new HtmlWebpackHarddiskPlugin()
  ]),
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'dist'),
    },
    port: 8080,
    proxy: [
      {
        context: ['/bbs'],
        target: process.env.DEV_PROXY_TARGET || 'https://ws.ptt.cc',
        secure: true,
        ws: true,
        changeOrigin: true,
        on: {
            proxyReqWs: ((origin) => (proxyReq, req, socket, options, head) => {
              // Whitelist does not accept ws.ptt.cc
              proxyReq.setHeader('origin', origin);
            })(process.env.DEV_PROXY_HEADER || 'https://term.ptt.cc')
        }
      }
    ]
  }
});
