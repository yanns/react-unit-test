/** @jsx React.DOM */

var React  = require("react/addons"),
	ReactTestUtils = React.addons.TestUtils;
var Label = require("../../main/app/Label");
var assert = require("assert");
var cheerio = require('cheerio');
var jsdom = require('jsdom').jsdom;

global.initDOM = function () {
	console.log("init test dom");
	var jsdom = require('jsdom');
	global.window = jsdom.jsdom().createWindow('<html><body></body></html>');
	global.document = window.document;
    global.navigator = window.navigator;
	global.addEventListener = window.addEventListener
}

describe("Label Test", function() {

	beforeEach(function() {
		initDOM();
	});

    it("Check Text Assignment", function() {
    	var label = <Label>Some Text We Need for Test</Label>;
    	ReactTestUtils.renderIntoDocument(label);
    	assert.equal(label.refs.p.props.children, "Some Text We Need for Test");
    });

    it("Click", function () {
        var label = <Label>Some Text We Need to Test</Label>;
        ReactTestUtils.renderIntoDocument(label);

        ReactTestUtils.Simulate.click(label.refs.p);
        assert.equal(label.refs.p.props.children, "Text After Click");
    });
});