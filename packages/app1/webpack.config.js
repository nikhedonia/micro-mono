const { merge } = require("webpack-merge");
const { ModuleFederationPlugin } = require('webpack').container;
const { reactPreset } = require('../utils/webpack');

module.exports = (env, args) => {
  const base = reactPreset({
    mode: args.mode || 'development',
    dir: __dirname, 
    port: 3001
  });
  
  const module = new ModuleFederationPlugin({
    name: "app1",
    remotes: {
      "host": "host"
    },
    exposes: {
      "./spa": "./src/spa" 
    },
    remoteType: 'var',
    filename: "remoteEntry.js",
    shared: ["react", "react-dom", "single-spa", "single-spa-react"]
  });
  
  const config = merge(base, {
    entry: "./src/bootstrap",
    plugins: [
      module
    ]
  });

  return config;
};