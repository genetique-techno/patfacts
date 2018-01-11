'use strict';
const AWS = require("aws-sdk");
AWS.config.update({ region: process.env.AWS_DEFAULT_REGION });
const dynamoDb = new AWS.DynamoDB.DocumentClient({apiVersion: '2012-08-10'});
const qs = require("querystring");

module.exports.facts = (event, context, callback) => {

  const options = {
    TableName: "FactsTable",
  };

  const body = qs.parse(event.body) || {};
  let text = body["text"] || "";
  const command = text.split(" ")[0] || "get";
  let parsed;

  switch (command) {

    case "add":
      parsed = text.match(/"(.*?)"/);
      if (parsed && parsed[0]) {
        text = parsed[0].replace(/"*/g, "");
        exports.addFact(options)({
          fact: text,
          author: body["user_name"] || "",
        })(callback);
      } else {
        response(callback, { text: "the fuck you SAYIN!", type: "ephemeral" });
      }
      break;

    case "show":
      parsed = text.split(" ");
      if (parsed.length > 1 && Number(parsed[1])) {
        const number = parseInt(parsed[1]);
        const params = {
          ExpressionAttributeValues: {
            ":factNumber": {
              N: ""+number
            }
          },
          FilterExpression: "number = :factNumber",
        };
        console.log(params);
        exports.fetchFact(options)(params)(callback);
      } else {
        response(callback, { text: "the fuck you SAYIN!", type: "ephemeral" });
      }
      break;

    default:
      exports.fetchFact(options)()(callback);
  }
};


// Main API functions
module.exports.fetchFact = options => params => cb => {
  dynamoDb.scan(Object.assign({}, options, params), (err, data) => {
    console.log(err);
    if (!data.Items.length) return response(cb, { text: "No PatFacts to fetch :(", type: "ephemeral" });

    const item = data.Items[Math.floor( Math.random()*data.Items.length )];

    const key = { Key: { fact: item.fact } };
    updateHits(Object.assign({}, options, key))((err, data) => response(cb, {text: `PatFact #${item.number}: ${item.fact}  _#justpatfactthings_`, type: "in_channel"}));
  });
};

module.exports.addFact = options => ({ fact, author }) => cb => {
  dynamoDb.scan(options, (err, data) => {
    const count = data.Count;
    const item = Object.assign({}, options, {
      Item: {
        fact,
        author,
        number: count+1,
        hits: 0,
        added: Date.now(),
      },
    });
    dynamoDb.put(Object.assign({}, options, item), (err, data) => response(cb, {text: `PatFact #${count+1} added by \`${author}\`: ${fact}`, type: "ephemeral" }) );
  });
};


// Convenience functions
function updateHits(options) {
  // increments the hits property atomically
  const increment = Object.assign({}, options, {
    // options should include Key: { fact: <<fact text>> }
    UpdateExpression: "set hits = hits + :val",
    ExpressionAttributeValues:{
        ":val":1
    },
    ReturnValues:"UPDATED_NEW",
  });
  return cb => dynamoDb.update(increment, (err, data) => cb(err, data));
}

function response(cb, { text, type }) {
  cb(null, {
    statusCode: 200,
    body: JSON.stringify({
      text: text,
      response_type: type,
    }),
  });
}

function addAllDefaultFacts(callback) {
  let count = 0;
  function cb(err, data) {
    count++;
    if (count > defaultFactArray.length) callback(null, "DONE");
  }
  defaultFactArray.forEach( (fact, index) => exports.addFact(options)({
    fact: fact,
    number: index+1,
    author: "Aaron",
  })(cb));
}

const defaultFactArray = [
  "[belching sound followed by silent fart that melts your skin]...That was you.",
  "Shoving an 8 inch dildo directly up your asshole will result in said dildo replacing your actual penis.",
  "You cannot go outside now, for it is currently gang-time.",
  "Your farts smell way worse when you're on a bus full of Frenchmen going up a mountain.",
  "If you fart in the woods an no one is around to smell it, it does not make a smell.",
  "Quit being stupid ya moron.",
  "Consider rebalancing your retirement portfolio's asset allocation every year. This will help minimize your exposure to negative market fluctuations.",
  "Chinese folklore has taught us the anus is the way to a man's colon.",
  "When in doubt, use more lube. It'll fit.",
  "ONE TIME I ATE MY NEIGHBOR'S SHIT!",
  "Dippy dippy!",
  "I BET YOU GOT REALLY HARRY BALLS!",
  "Pour a beer on it!",
  "Farts get their noxious smell from just 1% of the gas you expel.",
  "Farts have been clocked at speeds of up to 10 feet per second.",
  "I know a guy that held in a fart once. The pressure buildup destroyed his colon.",
  "There are more than 2000 varieties of cheese available worldwide, mozzarella is the favorite around the globe, and the most consumed.",
  "Most toilets flush in E flat.",
  "Cap’n Crunch’s full name is Horatio Magellan Crunch.",
  "Approximately 40,000 Americans are injured by toilets each year.",
  "If a female ferret does not have sex for a year, she will die.",
  "Nicholas Cage once did magic mushrooms with his cat.",
  "Homosexuality was still classified as an illness in Sweden in 1979. Swedes responded by calling into work “sick,” saying they “felt gay.”",
  "There is enough sperm in one single man to impregnate every woman on earth.",
  "I'd rather you were dead than Bob Saget.",
  "HEW HEW",
  "Flipflops are to be worn year round.",
  "Could God manufacture a deck so high, that even he could not upper deck it?",
  "If you've got a big thirst, and you're gay, reach for a cold, tall bottle of Schmitt's Gay.",
  "Rub icy hot on your butt cheeks, for a heated toilet seat feel on a budget.",
];
