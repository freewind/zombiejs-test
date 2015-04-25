const Browser = require('zombie');
const moment = require('moment');
const expect = require('expectations');

// We're going to make requests to http://example.com/signup
// Which will be routed to our test server localhost:3000
Browser.localhost('example.com', 3000);

describe('browser.visit', function() {

    const browser = new Browser();
    this.timeout(10000); // change mocha default timeout(2s)

    // Note: We should never put assertion inside the callback of `browser.visit`
    // https://github.com/assaf/zombie/issues/903
    describe('visit a page without ajax', function() {
        var spent = 999999;
        before(function(done) {
            const start = moment();
            console.log('visit /static/plain.html at: ' + start);
            browser.visit('/static/plain.html', function(err) {
                const end = moment();
                spent = end.diff(start);
                // we should never put assertions inside `browser.visit`!!!
                console.log('got content of /static/plain.html at: ' + end + ', spent: ' + spent);
                done(err);
            });
        });

        it('should get content immediately', function() {
            expect(spent).toBeLessThan(100);
        });
    });

    describe('the default timeout is 5s', function() {
        var spent = 99999;
        before(function(done) {
            const start = moment();
            console.log('visit /delay/9 at: ' + start);
            browser.visit('/delay/9', function(err) {
                const end = moment();
                spent = end.diff(start);
                console.log('got content of /delay/9 at: ' + end + ', spent: ' + spent);
                // Notice
                // the `err` passed in is something like:
                // Timeout: did not get to load all resources on this page
                // but we choose to ignore it, without call `done(err)`
                done();
            });
        });
        it("should only wait for 5s if not got the content", function() {
            expect(spent).toBeGreaterThan(5000);
            expect(spent).toBeLessThan(6000);
        })
    });

    describe('Timeout exception will be thrown if cannot get response in time', function() {
        before(function(done) {
            browser.visit('/delay/2', {duration: '1s'}, function(err) {
                done(err);
            });
        });
        // Notice:
        // following assertion will have no chance to run, because the
        // `browser.visit` will fail with a timeout exception
        it("assert something", function() {
            expect(1).toEqual(1);
        });
    });

    describe('we can change the wait time', function() {
        var spent = 99999;
        before(function(done) {
            const start = moment();
            console.log('visit /delay/9 at: ' + start);
            browser.visit('/delay/9', {duration: '3s'}, function() {
                const end = moment();
                spent = end.diff(start);
                console.log('got content of /delay/9 at: ' + end + ', spent: ' + spent);
                done();
            });
        });
        it("should only wait for 3s if not got the content", function() {
            expect(spent).toBeGreaterThan(3000);
            expect(spent).toBeLessThan(4000);
        })
    });

    describe('we can use promise style, put assertions in "then()"', function() {
        it("should only wait for 3s if not got the content", function(done) {
            const start = moment();
            browser.visit('/delay/1', {duration: '3s'}).then(function() {
                const end = moment();
                return end.diff(start);
            }).then(function(spent) {
                console.log("####### spent: " + spent);
                expect(spent).toBeGreaterThan(1000);
                expect(spent).toBeLessThan(2000);
            }).then(done, done);
            // Notice
            // for mocha test, there is no `callback.fail`, which is for `cucumberjs`
        })
    });

    describe('we can use promise style, use catch', function() {
        it("should only wait for 3s if not got the content", function(done) {
            const start = moment();
            browser.visit('/delay/1', {duration: '3s'}).then(function() {
                const end = moment();
                return end.diff(start);
            }).then(function(spent) {
                console.log("####### spent: " + spent);
                expect(spent).toBeGreaterThan(1000);
                expect(spent).toBeLessThan(2000);
                done();
            }).catch(done);
        })
    });

    describe('try another usage of done', function() {
        // notice this usage of `done`
        before(function(done) {
            browser.visit('/delay/1', done)
        });
        it('should response 200 status', function() {
            browser.assert.status(200);
        });
    });

});
