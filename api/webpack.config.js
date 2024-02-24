const webpack = require("webpack");

module.exports = {
  devServer: {
    onBeforeSetupMiddleware: (devServer) => {},
    proxy: {
      "/api": "https://adminspace.nevtis.com",
    },
    https: {
      key: fs.readFileSync(
        path.resolve(
          __dirname,
          "/etc/letsencrypt/live/adminspace.nevtis.com/privkey.pem'"
        )
      ),
      cert: fs.readFileSync(
        path.resolve(
          __dirname,
          "/etc/letsencrypt/live/adminspace.nevtis.com/cert.pem"
        )
      ),
    },
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      options: {},
    }),
  ],
};
