# patfacts

Serverless project for reading out and adding pat facts.  The handler is an AWS Lambda function and the storage is handled by AWS DynamoDB. AWS API Gateway is the interface to the outside world.

## Setup

Set up your `secrets` file with all the environmental variables that AWS requires for permissions.  Then,

`npm install`	

Make sure you have serverless installed globally, then do

`serverless deploy`

to deploy the app and all dependencies.

## Usage

Create a slack app for your team.  Set up a slash command and point it to your AWS API Gateway URL.  The format for patfacts is generally:

`/slashcommand {subcommand} {value}`

where an example is 

`/patfact add "Anytime is a good time for a beer."`

If now subcommand is passed, only `/patfact`, patfacts will pick a random fact and return it to slack with an "in-channel" response.

## Testing

With permissions set up, you can run the function locally by doing:

`severless invoke local --function facts -d '{ "body": { "text": "add \"New Fact Text Here!\"" }}'`

