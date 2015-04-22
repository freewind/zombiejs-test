const Browser = require('zombie');

// We're going to make requests to http://example.com/signup
// Which will be routed to our test server localhost:3000
Browser.localhost('example.com', 3000);

describe('User visits /, and throw some exception', function() {

    const browser = new Browser();

    describe('throw exception inside visit', function() {
        it('should be "Hello World"', function(done) {
            browser.visit('/', function() {
                throw new Error("some custom error from browser.visit, we expect it to fail");
                done();
            });
        });
    });


});

