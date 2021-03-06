const Browser = require('zombie');

// We're going to make requests to http://example.com/signup
// Which will be routed to our test server localhost:3000
Browser.localhost('example.com', 3000);

describe('User visits /delay', function() {

    this.timeout(5000); // mocha timeout

    const browser = new Browser();

    beforeEach(function(done) {
        console.log("in beforeEach");
        browser.visit('/delay/2', done);
    });

    describe('page body', function() {
        it('should be "Delayed Hello World!"', function() {
            console.log(browser.html());
            browser.assert.status(200);
            browser.assert.text('body', "Delayed Hello World in 2s!");
        });
    });

});
