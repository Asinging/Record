module.exports = {
  "globDirectory": "public/",
  "globPatterns": [
    "**/*.{css,json,js,eot,ijmap,svg,ttf,woff,woff2,md,scss,scr,ico,jpg,png,exe,html,txt}"
  ],
  "swDest": "public/sw.js",
  runtimeCaching: [{
    urlPattern: /\.(?:png|jpg|jpeg|svg|json)$/,
    handler: 'StaleWhileRevalidate'
  }]
};