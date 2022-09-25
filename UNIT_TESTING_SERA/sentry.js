const Sentry = require("@sentry/node");

Sentry.init({
 dsn: "https://6976793f0b364fed8b73f2c4f2797609@o1425367.ingest.sentry.io/6774015",
});

module.exports = Sentry

