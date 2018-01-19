const qs = require("querystring");
const r = require("ramda");


exports.parseBody = r.compose(
    qs.parse,
    r.prop("body"));

exports.getCommand = r.compose(
    r.either(
      r.compose( r.head, r.split(" ") ),
      r.always("get")),
    r.propOr("", "text"),
    exports.parseBody);

exports.runCommand = (ctx, event, cb) => command => ctx[command](event, cb);

