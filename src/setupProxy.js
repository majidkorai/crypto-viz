const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function(app) {
  app.use(
    "/v1",
    createProxyMiddleware({
      target: "https://pro-api.coinmarketcap.com",
      changeOrigin: true,
      headers: {
        'X-CMC_PRO_API_KEY': '5490e6c9-c578-4925-9bf7-60cfea64036d'
      },
    })
  );
};
