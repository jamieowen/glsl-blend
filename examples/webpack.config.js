const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const isProduction = process.env.NODE_ENV == "production";

const entries = {
  "glslify-three": "./src/glslify-three.ts",
  "shader-ast-thing": "./src/shader-ast-thi.ng.ts",
};

const config = {
  entry: {
    ...entries,
  },
  output: {
    clean: true,
    path: path.resolve(__dirname, "dist"),
  },
  devServer: {
    open: true,
    host: "localhost",
  },
  plugins: [
    /** examples.html - generates html for each example. */
    ...Object.entries(entries).map(
      ([chunk, _file]) =>
        new HtmlWebpackPlugin({
          chunks: [chunk],
          filename: `./${chunk}.html`,
          template: "./src/html/example.ejs",
        })
    ),
    /** index.html - generates iframe and embeds all examples. */
    new HtmlWebpackPlugin({
      template: "./src/html/index.ejs",
      chunks: [],
      templateParameters: {
        examples: Object.keys(entries).map((chunk) => `${chunk}.html`),
      },
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/i,
        loader: "ts-loader",
        exclude: ["/node_modules/"],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
};

module.exports = () => {
  if (isProduction) {
    config.mode = "production";
  } else {
    config.mode = "development";
  }
  return config;
};
