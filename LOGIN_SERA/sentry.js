const Sentry = require("@sentry/node");

Sentry.init({
 dsn: "https://71a385f82c554680a5f01a5247394f64@o1425367.ingest.sentry.io/6774004",
});

module.exports = Sentry

