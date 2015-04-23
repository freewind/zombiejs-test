const Browser = require('zombie');
const assert = require('assert');

// We're going to make requests to http://example.com/signup
// Which will be routed to our test server localhost:3000
Browser.localhost('example.com', 3000);

describe('User visits /hi', function() {

    const browser = new Browser();

    describe('assert in visit callback', function() {
        it('should fail the test if the assertion failed"', function() {
            browser.visit('/hi', function() {
                console.log("############ location: " + browser.location.href);
                assert(browser.location.href == 'http://example.com/hi-wrong-path');
            });
        });
    });

});
