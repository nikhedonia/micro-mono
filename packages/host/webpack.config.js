const { merge } = require("webpack-merge");
const { ModuleFederationPlugin } = require('webpack').container;
const { reactPreset } = require('../utils/webpack');

module.exports = (env, args) => {
  const base = reactPreset({
    mode: args.mode || 'development',
    dir: __dirname, 
    port: 3000
  });  
  
  const module = new ModuleFederationPlugin({
    name: "host",
    remotes: { app1: "app1" },
    exposes: { 
      "./test": "./src/test.js" 
    },
    remoteType: "var",
    filename: "remoteEntry.js",
    shared: ["react", "react-dom", "single-spa"]
  });
  
  const config = merge(base, {
    entry: "./src/bootstrap.js",
    plugins: [
      module
    ]
  });

  return config;
};