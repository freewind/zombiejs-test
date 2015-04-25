const Browser = require('zombie');
const expect = require('expectations');

// We're going to make requests to http://example.com/???
// Which will be routed to our test server localhost:3000
Browser.localhost('example.com', 3000);

describe('how to do assertion', function() {

    this.timeout(10000);
    const browser = new Browser();

    describe('failed assertion inside visit', function() {
        it('should fail the test if assertion failed in browser.visit', function(done) {
            browser.visit('/', function() {
                // Notice !!!
                // we should never do anything which can throw exceptions in callback block
                // because the `done()` has no way to complete
                expect(1).toEqual(2);
                done();
            });
        });
    });

    describe('failed assertion inside wait', function() {
        before(function(done) {
            browser.visit('/', function() {
                done();
            });
        });
        it('should fail the test if assertion failed in browser.wait', function(done) {
            browser.wait(2000, function() {
                // Notice !!!
                // the tricky way to do assertions in the callback of `browser.wait`, we should not do this
                // because there are better ways
                // and also, we should not use `wait`
                try {
                    expect(1).toEqual(2);
                    done();
                } catch (e) {
                    done(e);
                }
            })
        })
    });


});

