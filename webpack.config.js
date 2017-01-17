// For instructions about this file refer to
// webpack and webpack-hot-middleware documentation
var webpack = require('webpack');
const { resolve } = require('path')

module.exports = {
  entry: [
    "react-hot-loader/patch",
    "webpack-hot-middleware/client",
    "./app/src/hotReload.js"
  ],

  output: {
    // options related how webpack emits results
    path: resolve(__dirname, "app/public/dist"), // string
    // the target directory for all output files
    // must be an absolute path (use the Node.js path module)

    filename: "bundle.js", // string
    // the filename template for entry chunks

    publicPath: "/dist/" // string
    // the url to the output directory resolved relative to the HTML page
  },

  module: {
    // configuration regarding modules

    rules: [
      // rules for modules (configure loaders, parser options, etc.)
      {
        test: /\.jsx?$/,
        exclude: [/bower_components/, /node_modules/],
        loader: ["babel-loader"]
      },
      // {
      //   test: /\.scss?$/,
      //   exclude: /(node_modules|bower_components)/,
      //   use: ["style-loader", "css-loader", "postcss-loader", "sass-loader"]
      // },
      {
        test: /\.css?$/,
        exclude: [/bower_components/, /node_modules/],
        use: ["style-loader", "css-loader"]
      }
    ],
  },

  resolve: {
    extensions: [".js", ".jsx"]
  },

  devtool: "cheap-module-eval-source-map", // enum
  // enhance debugging by adding meta info for the browser devtools
  // source-map most detailed at the expense of build speed.

  context: __dirname, // string (absolute path!)
  // the home directory for webpack
  // the entry and module.rules.loader option
  //   is resolved relative to this directory

  target: "web", // enum
  // the environment in which the bundle should run
  // changes chunk loading behavior and available modules

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    // enable HMR globally
    new webpack.NamedModulesPlugin(),
    // prints more readable module names in the browser console on HMR updates
  ],
  // list of additional plugins

  // bail: true, //boolean
  // // fail out on the first error instead of tolerating it.

  cache: false, // boolean
  // disable/enable caching

  // recordsPath: path.resolve(__dirname, "build/records.json"),
  // recordsInputPath: path.resolve(__dirname, "build/records.json"),
  // recordsOutputPath: path.resolve(__dirname, "build/records.json"),
  // // TODO

}