const Browser = require('zombie');
const moment = require('moment');

// We're going to make requests to http://example.com/signup
// Which will be routed to our test server localhost:3000
Browser.localhost('example.com', 3000);

describe('browser.visit', function() {

    const browser = new Browser();

    it('should get content immediately if there is no ajax in page', function(done) {
        const start = moment();
        console.log('visit /static/plain.html at: ' + start);
        browser.visit('/static/plain.html', function() {
            const end = moment();
            const spent = end.diff(start);
            console.log('got content of /static/plain.html at: ' + end + ', spent: ' + spent);
            expect(spent).toBeLessThan(100);
            done();
        });
    });

    it('should get content immediately after ajax calls finished in a page with ajax', function(done) {
        const start = moment();
        console.log('visit /static/ajax.html at: ' + start);
        browser.visit('/static/ajax.html', function() {
            const end = moment();
            const spent = end.diff(start);
            console.log('got content of /static/ajax.html at: ' + end + ', spent: ' + spent);
            // the ajax in page will get response from server in 5s
            expect(spent).toBeGreaterThan(5000);
            expect(spent).toBeLessThan(6000);
            done();
        });
    });
});
