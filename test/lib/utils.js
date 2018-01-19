
describe( "utils", function() {

  before( function() {
    this.lib = require("../../lib/utils");
  });

  describe( "parseBody", function() {
    
    it( "should respond correctly with valid body", function() {
      const inEvent = {
        body: "author=aaron&text=some+text",
      };

      const expected = {
        author: "aaron",
        text: "some text",
      };

      assert.deepEqual(this.lib.parseBody(inEvent), expected, "correct results");
    });

  });

});
