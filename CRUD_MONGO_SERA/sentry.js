const Sentry = require("@sentry/node");

Sentry.init({
 dsn: "https://186b810c65034fee80514bd5f0abfc92@o1425367.ingest.sentry.io/6774006"
});

module.exports = Sentry