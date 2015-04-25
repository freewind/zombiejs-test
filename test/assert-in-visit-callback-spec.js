const Browser = require('zombie');
const assert = require('assert');

// We're going to make requests to http://example.com/signup
// Which will be routed to our test server localhost:3000
Browser.localhost('example.com', 3000);

// In the homepage of http://zombie.js.org/, there is an example which does the assertions in the callback of `browser.visit`,
// which confused me because I think we should never do it in `browser.visit`
// In this issues, we made it clear: https://github.com/assaf/zombie/issues/903
// the author told me that's pseudocode -_-###
// pull request created: https://github.com/assaf/zombie/pull/905
describe('User visits /hi', function() {

    // The wrong code:
    // it should fail the test but actually does not

    // describe('assert in visit callback', function() {
    // 	const browser = new Browser();
    // 	it('should fail the test if the assertion failed', function(done) {
    // 		browser.visit('/hi', function() {
    // 			assert(browser.location.href == 'http://example.com/hi-wrong-path');
    //          done();
    // 		});
    // 	});
    // });

    // The correct code:
    // it will fail the test because the assertion is failed

    describe('assert in visit callback', function() {
        const browser = new Browser();
        before(function(done) {
            browser.visit('/hi', done);
        });

        it('should fail the test with "done" if the assertion failed', function() {
            assert(browser.location.href == 'http://example.com/hi-wrong-path');
        });
    });
});
