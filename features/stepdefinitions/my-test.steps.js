"use strict";
var Browser = require("zombie");
// We're going to make requests to http://example.com/???
// Which will be routed to our test server localhost:3000
Browser.localhost('example.com', 3000);

module.exports = function() {

    var browser = new Browser();

    this.Given(/^visit the \/static\/ajax-button\.html$/, function(callback) {
        browser.visit("/static/ajax-button.html", callback);
    });

    this.When(/^click on 'mybutton' button$/, function(callback) {
        browser.waitDuration = '10s';
        browser.pressButton("#mybutton", callback);
    });

    this.When(/^do nothing$/, function(callback) {
        callback();
    });

    this.Then(/^see the updated content of '#response'$/, function(callback) {
        browser.assert.text('#response', 'Delayed Hello World in 8s!');
        callback();
    });

    this.Then(/^see the updated content of '#test'$/, function(callback) {
        browser.assert.text('#test', '456');
        callback();
    });

};
