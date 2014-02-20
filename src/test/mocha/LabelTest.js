/** @jsx React.DOM */

var React  = require("react");
var Label = require("../../main/app/Label");
var assert = require("assert");
var cheerio = require('cheerio');

describe("Label Test", function() {
    it("Check Text Assignment", function() {
    	var label = <Label>Some Text We Need for Test</Label>;
    	assert.equals(label.refs.p.props.children, "Some Text We Need for Test");
    })
});