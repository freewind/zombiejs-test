const Browser = require('zombie');
const moment = require('moment');
const expect = require('expectations');

// We're going to make requests to http://example.com/signup
// Which will be routed to our test server localhost:3000
Browser.localhost('example.com', 3000);

describe('browser.wait', function() {

    const browser = new Browser();
    var spentInWait = 99999;

    this.timeout(10000);

    before(function(done) {
        console.log("enter visit in before");
        const start = moment();
        console.log("visit /static/ajax.html at: " + start);
        // browser.visit default timeout is 5s
        // ajax.html page needs 8s to get ajax response
        browser.visit('/static/ajax.html', function() {
            const end = moment();
            console.log("got content of /static/ajax.html at: " + end + ", spent: " + end.diff(start));
            done();
        });
    });

    before(function(done) {
        console.log("enter wait in before");
        const start = moment();
        // although we specify 7s as timeout, but it actually waits only 3s(the value I expect)
        browser.wait(7000, function() {
            const end = moment();
            spentInWait = end.diff(start);
            console.log("########## in browser.wait, spent: " + spentInWait);
            done();
        });
    });

    it('should find "Delayed Hello World!" in page after a while', function() {
        console.log(browser.html());

        expect(spentInWait).toBeGreaterThan(3000);
        expect(spentInWait).toBeLessThan(4000);

        browser.assert.status(200);
        browser.assert.text('#response', "Delayed Hello World in 8s!");
    });

});
