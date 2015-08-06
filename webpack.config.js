module.exports = {
  entry: "./components/main.jsx",
  output: {
    filename: "bundle.js"
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel",
        query: {
          optional: ["runtime"],
          stage: 0
        }
      },
      { test: /\.less$/, loader: "style-loader!css-loader!less-loader" }, // use ! to chain loaders
      { test: /\.css$/, loader: "style-loader!css-loader" },
      { test: /\.(png|jpg)$/, loader: "url-loader?limit=8192" } // inline base64 URLs for <=8k images, direct URLs for the rest
    ]
  },
  devServer: {
    proxy: {
      "*": "http://localhost:3000"
    },

    // It suppress error shown in console, so it has to be set to false.
    quiet: false,

    // It suppress everything except error, so it has to be set to false as
    // well to see success build.
    noInfo: false,
    stats: {

      // Config for minimal console.log mess.
      assets: false,
      colors: true,
      version: false,
      hash: false,
      timings: false,
      chunks: false,
      chunkModules: false
    }
  },
};
