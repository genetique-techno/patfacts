'use strict';
const AWS = require("aws-sdk");
AWS.config.update({ region: process.env.AWS_DEFAULT_REGION });
const dynamoDb = new AWS.DynamoDB.DocumentClient({apiVersion: '2012-08-10'});

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

module.exports.facts = (event, context, callback) => {

  const options = {
    TableName: "FactsTable",
  };

  exports.fetchFact(options)(callback)

  // exports.addFact(options)({
  //   fact: "Sucka MC Bust cap in dey ass",
  //   author: "Aaron",
  // })(callback);







  // // Add the entire defaultFactArray
  // let count = 0;
  // function cb(err, data) {
  //   count++;
  //   if (count > defaultFactArray.length) callback(null, "DONE");
  // }

  // defaultFactArray.forEach( fact => exports.addFact(options)({
  //   fact: fact,
  //   author: "Aaron",
  // })(cb));
};


// Main API functions
module.exports.fetchFact = options => cb => {
  fetch(options)((err, data) => {
    const item = data.Items[Math.floor( Math.random()*data.Items.length )];
    const key = { Key: { fact: item.fact } };
    updateHits(Object.assign({}, options, key))((err, data) => {
      cb(err, `PatFact #${item.number}: ${item.fact} _#justpatfactthings_`);
    });
  });
};

module.exports.addFact = options => ({ fact, author }) => cb => {
  fetch(options)((err, data) => {
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
    put(Object.assign({}, options, item))(cb);
  });
};


// Convenience functions
function fetch(options) {
  return cb => dynamoDb.scan(options, (err, data) => cb(err, data));
}

function put(options) {
  return cb => dynamoDb.put(options, (err, data) => cb(err, !err && data ? "SUCCESS" : "ERROR"));
}

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

module.exports.getFact = (event, context, callback) => {
  const index = Math.floor( Math.random()*defaultFactArray.length);
  const fact = defaultFactArray[index];
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      text: `PatFact ${index+1}: ${fact} _#justpatfactthings_`,
      response_type: "in_channel",
    }),
  };
  callback(null, response);
};
