const Sentry = require("@sentry/node");

Sentry.init({
 dsn: "https://8f99789146e74c0abbbf359ae3c2c786@o1425367.ingest.sentry.io/6774011",
});

module.exports = Sentry

