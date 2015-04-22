"use strict";
var Browser = require("zombie");
// We're going to make requests to http://example.com/signup
// Which will be routed to our test server localhost:3000
Browser.localhost('example.com', 3000);

module.exports = function() {

    var browser = new Browser();

    this.Given(/^do nothing$/, function(callback) {
        callback();
    });

    this.Then(/^throw exception in zombiejs$/, function(callback) {
        browser.visit("/", function() {
            browser.wait(2000, function() {
                try {
                    throw new Error("### some error from browser.visit for cucumberjs, we expect it to fail");
                    callback();
                } catch (err) {
                    callback.fail(err);
                }
            });
        });
    });

    this.Then(/^Close browser$/, function(callback) {
        console.log("Close browser");
        browser.close();
        callback();
    });
};
