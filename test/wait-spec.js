const Browser = require('zombie');
const moment = require('moment');
const expect = require('expectations');

// We're going to make requests to http://example.com/???
// Which will be routed to our test server localhost:3000
Browser.localhost('example.com', 3000);

// Notice !!!!!!!!
// For most of normal situations, we don't need to call `browser.wait`,
// since `browser.visit` and other helper methods like `browser.pressButton` already take care of the waiting,
// if timeout exception happens from there, it should be just thrown by `done(err)`
// We should only use `browser.wait` when we do something but don't care its result, just let it timeout,
// then check something in a reasonable time
describe('browser.wait', function() {

    const browser = new Browser();

    this.timeout(10000);

    before(function(done) {
        console.log("######## browser.visit");
        browser.visit('/static/ajax-button.html', done);
    });

    it('should find "Delayed Hello World!" in page after a while', function(done) {
        browser.pressButton('#mybutton');
        browser.wait(10000).then(function() {
            console.log("######## testing");
            console.log(browser.html());
            browser.assert.status(200);
            browser.assert.text('#response', "Delayed Hello World in 8s!");
        }).then(done, done)
    });

});
