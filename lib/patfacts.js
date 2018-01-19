"use strict";
const utils = require("./utils");
const h = require("highland");
const db = null;

exports.facts = function facts(event, ctx, cb) {

  const body = utils.parseBody(event);

  return r.pipe(
    utils.getCommand,
    utils.runCommand(this, body, cb))(event);
};

exports.add = function add(body, cb) {
  let factText = r.compose(    
    r.replace(/"*/g, ""),
    r.head,
    r.match(/"(.*?)"/)
  )(body.text);
  if (!r.isEmpty(factText)) {
    db.addFact({
      fact: factText,
      author 
    
}

