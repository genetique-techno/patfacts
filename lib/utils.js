const r = require("ramda");
const qs = require("querystring");

function getArguments(body) {
  return r.compose(
    r.map( r.replace(/"/g, "") ),
    r.match(/(\w+|"(.*?)"|\d)/g),
    r.propOr("", "text"))(body);
}

function parseBody(body) {
  const parsed = qs.parse(body);
  const args = getArguments(parsed);
  return {
    author: parsed["user_name"] || "",
    command: args[0],
    params: args.slice(1),
  };
}

function respond(cb, {text, type}) {
  cb(null, {
    statusCode: 200,
    body: JSON.stringify({
      text: `${text}`,
      response_type: `${type}`,
    }),
  });  
}

module.exports = {
  getArguments,
  parseBody,
  respond,
};