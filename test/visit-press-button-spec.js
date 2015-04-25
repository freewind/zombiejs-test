const Browser = require('zombie');
const moment = require('moment');
const expect = require('expectations');

// We're going to make requests to http://example.com/???
// Which will be routed to our test server localhost:3000
Browser.localhost('example.com', 3000);

describe('browser.pressButton inside the callback of browser.visit', function() {

    const browser = new Browser();
    browser.waitDuration = "10s";
    this.timeout(10000);

    it('find updated #response content', function(done) {
        browser.visit('/static/ajax-button.html')
            .then(function() {
                // Dont' forget the `return`!!!
                return browser.pressButton('#mybutton');
            }).then(function() {
                browser.assert.text('#response', "Delayed Hello World in 8s!");
            }).then(done, done);
    });

});
