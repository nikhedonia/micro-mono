const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const reactPreset = ({mode, dir, port = 3000}) => ({
  mode,
  entry: "./src/index.js",
  output: {
    path: path.join(dir, '/out'),
    // determine path based on who served the bundle
    // Note: uses document.currentScript which is not supported in IE11 and opera mini
    publicPath: "auto" 
  },
  devServer: {
    port,
    hot: true,
    allowedHosts: "all",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
    }
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules|bootstrap\.js/,
        use: {
          loader: 'ts-loader',
          options: {
            onlyCompileBundledFiles: true,
            transpileOnly: true,
            projectReferences: false,
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({ 
      template: './public/index.html',
      chunks: ['main']
    })
  ],
});

module.exports = {
  reactPreset
};