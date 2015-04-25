const Browser = require('zombie');
const moment = require('moment');
const expect = require('expectations');

// We're going to make requests to http://example.com/???
// Which will be routed to our test server localhost:3000
Browser.localhost('example.com', 3000);

describe('browser.pressButton', function() {

    const browser = new Browser();

    this.timeout(10000);

    before(function(done) {
        console.log("######## browser.visit");
        browser.visit('/static/ajax-button.html', done);
    });

    before(function(done) {
        // browser.waitDuration = '10s';
        console.log("######## browser.pressButton");
        browser.pressButton('#mybutton', done);
    });

    it('should find "Delayed Hello World!" in page after a while', function() {
        console.log("######## testing");
        console.log(browser.html());
        browser.assert.status(200);
        browser.assert.text('#response', "Delayed Hello World in 8s!");
    });

});
