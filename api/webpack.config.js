module.exports = {
  entry: "./src/api-nnft.js",
  output: {
    library: "sls",
    umdNamedDefine: true,
    filename: "API-NNFT.js",
    path: __dirname + "/dist",
    libraryTarget: 'umd',
    globalObject: 'this'

  },
  mode: "production",
  devtool: "source-map",
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json", ".css"]
  },

  module: {
    rules: [
    ]
  },
 resolve: {
    fallback: {
      "url": require.resolve("url/"),
      "crypto": require.resolve("crypto-browserify"),
      "stream": require.resolve("stream-browserify"),
      "https": require.resolve("https-browserify"),
      "http": require.resolve("stream-http"),
      "events": require.resolve("events/"),
      "util": require.resolve("util/"),
    },
  },
 plugins: [
 ],
  node: {
  }
};

