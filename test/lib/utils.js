
describe( "utils", function() {

  before( function() {
    this.lib = require("../../lib/utils");
  });

  describe( "getArguments", function() {

    it( "should return an array of strings when parts with quotes are passed in", function() {
      const inBody = { text: "command \"New fact text here\" \"Some extra crap here\"" };
      const expected = ["command", "New fact text here", "Some extra crap here"];
      assert.deepEqual(this.lib.getArguments(inBody), expected, "correct results");
    });

    it( "should return an array of numbers when they are passed in", function() {
      const inBody = { text: "command 1 2 3" };
      const expected = ["command", 1, 2 ,3];
      assert.deepEqual(this.lib.getArguments(inBody), expected, "correct results"); 
    });
 
    it( "should return an array of mixed types", function() {
      const inBody = { text: "command \"some text here\" 1" };
      const expected = ["command", "some text here", 1];
      assert.deepEqual(this.lib.getArguments(inBody), expected, "correct results"); 
    });
 
    it( "should return an array with just the command if no other arguments are passed", function() {
      const inBody = { text: "command " };
      assert.deepEqual(this.lib.getArguments(inBody), ["command"], "correct results");
    });

  });

  describe( "parseBody", function() {

    it( "should return an object with the expected structure", function() {
      const inBody = "user_name=aaron&text=add%201%20%22some%20text%22";
      const expected = {
        author: "aaron",
        command: "add",
        params: [1, "some text"],
      };
      assert.deepEqual(this.lib.parseBody(inBody), expected, "correct results");
    });
  })

  describe( "respond", function() {

    it( "should return the correct structure", function( done ) {
      this.lib.respond((err, data) => {
        assert.ifError(err);
        assert.equal( typeof data.statusCode, "number", "statusCode is a number" );
        assert.equal( typeof data.body, "string", "body is a string" );
        const body = JSON.parse(data.body);
        assert.equal( typeof body.text, "string", "body.text is a string" );
        assert.equal( typeof body.response_type, "string", "body.response_type is a string" );
        done();
      }, {
        text: "some text",
        type: "ephemeral",
      });
    });

  });

});
