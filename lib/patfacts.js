const express = require("express");
const serverless = require("serverless-http");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const allowedCommands = [
  "get",
  "show",
  "add",
  "stats",
  "edit",
];

app.post("/", (req, res) => {
  console.log(req.body);
  res.json({fart: true})
;});

module.exports.facts = serverless(app);

// module.exports.facts = (event, ctx, cb) => {
//   console.log(event);
//   cb(null, {
//     statusCode: 200,
//     data: "YES",
//   });
// }

/* Example slack slash command 

token=gIkuvaNzQIHg97ATvDxqgjtO
team_id=T0001
team_domain=example
enterprise_id=E0001
enterprise_name=Globular%20Construct%20Inc
channel_id=C2147483705
channel_name=test
user_id=U2147483697
user_name=Steve
command=/weather
text=94070
response_url=https://hooks.slack.com/commands/1234/5678
trigger_id=13345224609.738474920.8088930838d88f008e0
Typically, this data will be sent to your URL as a HTTP POST with a Content-type header set as application/x-www-form-urlencoded
The user_name field is being phased out. Always identify users by the combination of their user_id and team_id.

*/