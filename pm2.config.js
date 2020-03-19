module.exports = {
  apps : [
    {
      name: "voicer",
      script: "./server/server.js",
      watch: true,

      env: {
        "PORT": 80,
        "SSLPORT": 443,
        "DOMAIN": "localhost",
        "PROTOCOL": "https"
      }
    }
  ]
}