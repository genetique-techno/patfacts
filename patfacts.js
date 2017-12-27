'use strict';

const factArray = [
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
].map( (v, i) => `PatFact #${i+1}: ${v} _#justpatfactthings_`);

module.exports.getFact = (event, context, callback) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      text: factArray[Math.floor( Math.random()*factArray.length )],
      response_type: "in_channel",
    }),
  };

  callback(null, response);

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });
};
